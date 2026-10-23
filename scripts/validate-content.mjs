import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), "utf8");
}

function loadData(relativePath) {
  assert(existsSync(resolve(root, relativePath)), `缺少数据文件：${relativePath}`);
  const context = vm.createContext({ console });
  vm.runInContext(read(relativePath), context, { filename: relativePath });
  return context;
}

function unique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  assert(duplicates.length === 0, `${label} 存在重复项：${[...new Set(duplicates)].join(", ")}`);
}

function safeUrl(url) {
  return /^(#|https?:\/\/|mailto:)/i.test(url);
}

const sourceFiles = [
  "index.html",
  "README.md",
  "docs/PRD.md",
  "assets/main.js",
  "assets/styles.css",
  "data/profile.js",
  "data/experience.js",
  "data/research.js",
  "data/site.js",
  "data/skills.js"
];

const source = Object.fromEntries(sourceFiles.map((file) => [file, read(file)]));

assert(
  !existsSync(resolve(root, "profile.md")),
  "发现未结构化的 profile.md；个人信息应统一放在 data/ 中"
);

const fullPhonePattern = /(?<!\d)1[3-9]\d{9}(?!\d)/g;
const sensitiveFieldPattern =
  /(?:电话|手机|微信(?:\s*\/\s*QQ)?|QQ)\s*[|:：]?\s*\d{6,}/g;

for (const [file, content] of Object.entries(source)) {
  assert(
    !fullPhonePattern.test(content),
    `${file} 包含未脱敏的 11 位手机号码`
  );
  fullPhonePattern.lastIndex = 0;
  assert(
    !sensitiveFieldPattern.test(content),
    `${file} 的通讯字段包含未脱敏号码`
  );
  sensitiveFieldPattern.lastIndex = 0;
}

const profileContext = loadData("data/profile.js");
const experienceContext = loadData("data/experience.js");
const researchContext = loadData("data/research.js");
const siteContext = loadData("data/site.js");
const skillsContext = loadData("data/skills.js");

const profile = vm.runInContext("PROFILE", profileContext);
const experience = vm.runInContext("EXPERIENCE", experienceContext);
const research = vm.runInContext("RESEARCH", researchContext);
const site = vm.runInContext("SITE", siteContext);
const skills = vm.runInContext("SKILL_GROUPS", skillsContext);

assert(profile && typeof profile.name === "string", "PROFILE.name 必须是非空字符串");
assert(Array.isArray(profile.facts) && profile.facts.length > 0, "PROFILE.facts 不能为空");
assert(Array.isArray(profile.roles) && profile.roles.length > 0, "PROFILE.roles 不能为空");
assert(profile.meta && profile.meta.description, "PROFILE.meta.description 不能为空");

const phoneFact = profile.facts.find((fact) => /^phone$/i.test(fact.label));
assert(Boolean(phoneFact), "PROFILE.facts 缺少 Phone 条目");
if (phoneFact) {
  assert(phoneFact.value.includes("*"), "Phone 必须使用脱敏值");
  assert(!phoneFact.href, "脱敏 Phone 不应生成拨号链接");
}

const dataUrls = [];
for (const fact of profile.facts) {
  if (fact.href) dataUrls.push(fact.href);
}
for (const link of profile.contact?.links ?? []) {
  dataUrls.push(link.href);
}
for (const job of experience) {
  assert(job.id && job.title && job.start, "工作经历缺少 id/title/start");
}
for (const item of research) {
  assert(item.id && item.title && item.type && item.date, "研究成果缺少 id/title/type/date");
  assert(
    /^\d{4}-\d{2}(?:-\d{2})?$/.test(item.date),
    `研究成果 ${item.id} 的日期格式无效`
  );
  for (const link of item.links ?? []) {
    if (link.url) dataUrls.push(link.url);
  }
}
for (const link of site.navLinks) dataUrls.push(link.href);

assert(
  dataUrls.every((url) => typeof url === "string" && safeUrl(url)),
  "数据中存在不安全的 URL 协议"
);
unique(experience.map((job) => job.id), "工作经历 ID");
unique(research.map((item) => item.id), "研究成果 ID");
unique(skills.map((group) => group.title), "技术能力分组标题");

const html = source["index.html"];
const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
unique(htmlIds, "HTML ID");

for (const requiredId of [
  "navLinks",
  "heroStatus",
  "heroPrimaryCta",
  "profileFacts",
  "skillGroups",
  "researchList",
  "personSchema"
]) {
  assert(htmlIds.includes(requiredId), `index.html 缺少渲染容器 #${requiredId}`);
}

assert(!html.includes("profile.md"), "index.html 不应再引用未结构化的 profile.md");

if (failures.length) {
  console.error("内容校验失败：");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(
  `内容校验通过：${experience.length} 段经历、${research.length} 条成果、` +
  `${skills.length} 个技能分组`
);
