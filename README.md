# Edwin's Profile

安仕平（Edwin）的个人网站项目。

## 文档

| 文件 | 说明 |
|---|---|
| [docs/PRD.md](docs/PRD.md) | 需求文档：目标、信息架构、页面模块、技术方案、验收标准 |
| [docs/STYLE-REFERENCES.md](docs/STYLE-REFERENCES.md) | 风格参考：真实站外案例 + 三套候选设计 token |
| [profile.md](profile.md) | 简历源数据（结构化 Markdown，网站内容的事实来源） |

## 网站

| 文件 | 说明 |
|---|---|
| [index.html](index.html) | 单页主页（首屏 / 关于 / 工作经历 / 技术能力 / 研究成果 / 联系） |
| [assets/styles.css](assets/styles.css) | 全部样式与设计 token（含深色模式） |
| [assets/main.js](assets/main.js) | 导航、滚动进度、动画、个人信息 / 工作经历 / 研究成果渲染，无依赖 |
| [data/profile.js](data/profile.js) | **个人信息数据** —— 姓名、定位、首屏文案、信息表、理念、联系方式 |
| [data/experience.js](data/experience.js) | **工作经历数据** —— 增删改经历只需改这个文件 |
| [data/research.js](data/research.js) | **研究成果数据** —— 加条目只需改这个文件 |

### 本地预览

```bash
cd "Edwin's profile"
python3 -m http.server 8000
# 打开 http://127.0.0.1:8000
```

或直接双击 `index.html`（`file://` 亦可打开，数据脚本用相对路径）。

## 已确认决策

| 项 | 决策 |
|---|---|
| 风格 | 组合方案：Paper White 骨架 + Obsidian 青绿强调 `#3DDC97` / `#0A7F4F` + Mono 元信息 |
| 手机号 | **不公开**，仅展示邮箱 `itrice@live.cn`、GitHub、CSDN |
| 年龄 / 性别 | 不展示 |
| 最近一段工作 | 以「企业系统架构重构」作为标题（简历未写公司名） |
| 技术方案 | 单页静态 HTML + CSS + 原生 JS，零构建零依赖 |

## 修改个人信息

编辑 `data/profile.js` 的 `PROFILE` 对象，首屏、关于、页脚会同时更新：

```js
const PROFILE = {
  name: "安仕平",
  enName: "EDWIN",                        // 导航右上角小字
  heroTitle: "Edwin · System Architect",  // 首屏大标题下的英文标注
  roles: ["系统架构设计师", "高级工程师", "研发经理"],  // 用 / 自动分隔
  lede: "首屏一句话，支持 <strong>强调</strong>。",
  stats: [{ label: "Experience", value: "16 年" }],   // 首屏数据条
  bio: ["关于区第 1 段", "第 2 段"],                   // 支持 <strong>
  facts: [
    { label: "Email", value: "itrice@live.cn", href: "mailto:itrice@live.cn" }
  ],
  motto: [{ key: "做人", value: "乐观，分享，激情。" }],
  contact: {
    intro: "页脚引导语",
    links: [{ label: "GITHUB", href: "https://github.com/itrice" }]
  }
};
```

约定：

- `facts` 不填 `href` 则渲染为纯文本；填了会自动加外链（`mailto:` 不加 `target`）
- 首屏 GitHub 按钮 / 页脚昵称 / 版权行 / `<title>` 都从这份数据派生，改一处全站生效
- `bio`、`lede`、`points` 只允许 `<strong>` 内联标签（白名单解析）

## 添加 / 修改工作经历

编辑 `data/experience.js` 的 `EXPERIENCE` 数组，数组顺序即页面顺序（倒序：最近在前）：

```js
{
  id: "company-slug",            // 可选，用于锚点 #exp-company-slug
  title: "公司名或业务方向",
  role: "研发经理 · 安防事业部",  // 职位 / 部门
  start: "2022.03",
  end: "至今",                   // 填 "至今" 或 null 表示在职
  current: true,                 // 可选，在职节点高亮；省略则按 end 判断
  desc: "职责摘要，1–2 句。",
  points: [
    "关键成果，支持 <strong>加粗强调</strong>。",
    "数字、奖项建议加粗。"
  ],
  stack: [".NET Core", "K8s"]    // 可选，技术栈标签
}
```

约定：

- `points` 只允许 `<strong>` 内联标签，其余内容按纯文本渲染（白名单解析，防注入）
- 新增一段经历 = 在数组里插入一个对象，刷新即生效，无需改 HTML
- 首屏前 2 条无需滚动动画，直接可见

## 添加研究成果

编辑 `data/research.js`，在 `RESEARCH` 数组里追加一条：

```js
{
  id: "microservice-migration",
  title: "十年单体系统的微服务迁移实践",
  type: "技术文章",              // 论文 | 专利 | 开源项目 | 技术文章 | 标准 | 演讲
  date: "2026-10",
  venue: "CSDN",
  authors: ["安仕平"],
  summary: "50–120 字摘要。",
  tags: ["架构", "微服务"],
  links: [{ label: "阅读", url: "https://..." }]
}
```

保存刷新即可，页面自动按日期倒序排列；条目 ≥5 且类型 >1 时自动出现类型筛选器；数组为空时显示「整理中」空状态。

## 状态

- ✅ 简历整理
- ✅ 需求文档
- ✅ 风格选定（组合方案）
- ✅ 网站开发完成（响应式 + 深色模式 + 研究成果容器）
- ✅ 工作经历改为结构化数据动态加载（`data/experience.js`）
- ✅ 个人信息改为结构化数据（`data/profile.js`），首屏 / 关于 / 页脚共用
- ⬜ 研究成果内容（后续补充）
- ⬜ 头像照片（可选）
- ⬜ 部署与域名

---

*创建于 2026-10-21*
