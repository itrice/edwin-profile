# Edwin's Profile

安仕平（Edwin）的个人网站项目。

## 文档

| 文件 | 说明 |
|---|---|
| [docs/PRD.md](docs/PRD.md) | 需求文档：目标、信息架构、页面模块、技术方案、验收标准 |
| [docs/STYLE-REFERENCES.md](docs/STYLE-REFERENCES.md) | 风格参考与设计 token |

## 网站

| 文件 | 说明 |
|---|---|
| [index.html](index.html) | 单页主页语义结构与渲染容器 |
| [assets/styles.css](assets/styles.css) | 全部样式与设计 token |
| [assets/main.js](assets/main.js) | 数据渲染、导航、滚动进度、筛选与动画 |
| [data/profile.js](data/profile.js) | 个人信息、职业理念、联系方式与 SEO 字段 |
| [data/experience.js](data/experience.js) | 工作经历 |
| [data/skills.js](data/skills.js) | 技术能力分组 |
| [data/learning.js](data/learning.js) | 学习研究，当前包含带标记的测试示例 |
| [data/site.js](data/site.js) | 导航、区块文案、CTA、空状态与页脚文案 |

网站保留零构建、零运行时依赖的静态架构。所有可维护内容均位于 `data/`，HTML 只保留语义结构，脚本负责把数据渲染到页面。

## 本地预览

```bash
python -m http.server 8000
```

打开 `http://127.0.0.1:8000`。也可以直接打开 `index.html`；页面使用普通脚本而不是 ES Module，因此支持 `file://` 预览。

## 已确认决策

| 项 | 决策 |
|---|---|
| 风格 | Paper White 骨架 + Obsidian 青绿强调 + Mono 元信息 |
| 个人信息 | 展示职业、学历、语言、邮箱、社交主页及脱敏号码 |
| 电话号码 | **仅展示脱敏值**，站点文件和 Git 工作树不保存完整号码 |
| 年龄 / 性别 | 不在网站展示，也不在站点数据文件中保存 |
| 最近一段工作 | 使用 `Solera` 作为经历标题 |
| 技术方案 | 单页静态 HTML + CSS + 原生 JavaScript，零构建零依赖 |

## 数据维护

### 个人信息

编辑 [data/profile.js](data/profile.js) 的 `PROFILE` 对象。姓名、首屏、关于、页脚、页面标题和 Person JSON-LD 会同步更新。

```js
const PROFILE = {
  name: "安仕平",
  enName: "EDWIN",
  heroTitle: "Edwin · System Architect",
  roles: ["系统架构设计师", "高级工程师", "研发经理"],
  lede: "首屏文案，支持 <strong>强调</strong>。",
  stats: [{ label: "Experience", value: "16 年" }],
  bio: ["关于区段落"],
  facts: [
    { label: "Phone", value: "181****1287" },
    { label: "Email", value: "itrice@live.cn", href: "mailto:itrice@live.cn" }
  ],
  motto: [{ key: "做人", value: "乐观，分享，激情。" }],
  contact: {
    intro: "页脚引导语",
    links: [{ label: "GITHUB", href: "https://github.com/itrice" }]
  },
  meta: {
    description: "页面描述",
    shareDescription: "分享摘要",
    knowsAbout: ["系统架构设计"]
  }
};
```

约定：

- `facts` 不填 `href` 时渲染为纯文本。
- 外部链接只接受 `http://`、`https://` 和 `mailto:`，避免 `javascript:` 等危险协议。
- `bio`、`lede` 只允许 `<strong>` 内联标签，其余内容按纯文本渲染。
- 电话不得添加入口链接，也不得在数据中保存完整号码。

### 工作经历

编辑 [data/experience.js](data/experience.js) 的 `EXPERIENCE` 数组，数组顺序即页面顺序（建议最近在前）。

```js
{
  id: "company-slug",
  title: "公司名或业务方向",
  role: "研发经理 · 安防事业部",
  start: "2022.03",
  end: "至今",
  current: true,
  desc: "职责摘要。",
  points: ["关键成果，支持 <strong>加粗强调</strong>。"],
  stack: [".NET Core", "K8s"]
}
```

### 技术能力

编辑 [data/skills.js](data/skills.js) 的 `SKILL_GROUPS`。每个分组包含 `title` 和 `items` 字符串数组，页面会按数组顺序渲染为标签云。

### 学习研究

编辑 [data/learning.js](data/learning.js)，在 `LEARNING` 数组中追加条目：

```js
{
  id: "microservice-migration",
  title: "十年单体系统的微服务迁移实践",
  type: "学习笔记",
  date: "2026-10",
  venue: "架构学习",
  authors: ["安仕平"],
  summary: "50–120 字摘要。",
  tags: ["架构", "微服务"],
  links: [{ label: "阅读", url: "https://example.com" }],
  isExample: false
}
```

页面按日期倒序排列。条目不少于 5 条且类型多于 1 个时显示类型筛选器；数组为空时自动显示整理中状态，首屏主 CTA 也会改为“查看工作经历”。

当前文件中的 6 条内容均为界面测试示例，并通过 `isExample: true` 在页面显示说明和“示例”徽章。替换为正式内容时将 `isExample` 设为 `false` 或删除该字段。

### 导航与页面文案

编辑 [data/site.js](data/site.js) 的 `SITE` 对象，可调整：

- 导航链接及移动端隐藏项。
- 首屏状态与 CTA。
- 各区块编号、标题和说明。
- 学习研究示例提示与空状态。
- 页脚标题与构建说明。

## 内容检查

使用 Node.js 运行轻量校验：

```bash
node scripts/validate-content.mjs
```

检查包括数据文件可执行性、必填字段、ID 唯一性、URL 协议、电话号码脱敏和学习研究日期格式。

## 状态

- ✅ 网站开发完成（响应式 + 深色模式 + 学习研究容器）
- ✅ 个人信息、经历、技能、学习研究与页面文案结构化
- ✅ 电话号码脱敏
- ✅ 导航兼容性、当前区块语义和经历动画修复
- ✅ 学习研究列表、类型筛选与 6 条测试示例
- ⬜ 正式学习研究内容
- ⬜ 头像照片（可选）
- ⬜ 部署与域名

---

*创建于 2026-10-21，结构化数据整理于 2026-10-23。*
