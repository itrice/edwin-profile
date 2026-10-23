/* ==========================================================================
   学习研究数据
   --------------------------------------------------------------------------
   学习笔记、架构复盘、技术分享、阅读记录等统一放在 LEARNING 数组。
   页面会按 date 倒序展示；标题、摘要和标签应使用真实内容。

   字段说明：
     id         唯一标识，使用 Number 或 UUID；对应图片放在
                assets/learning/<id>/ 目录，便于随笔记同步清理
     title      标题
     type       类型：学习笔记 | 架构复盘 | 技术分享 | 开源实践 | 读书笔记
     date       日期，格式 "YYYY-MM" 或 "YYYY-MM-DD"
     venue      来源、栏目或学习场景
     authors    作者数组（可选）
     summary    摘要
     tags       标签数组（可选）
     links      链接数组 [{ label, url }]（可选）
     highlights 关键收获字符串数组（可选）
     sections   分段笔记 [{ title, body }]（可选）
     screenshots 截图数组 [{ src, alt, caption, width, height }]（可选）
                src 必须位于 assets/learning/<id>/ 目录
     isExample  是否为界面测试数据（正式内容应省略）
   ========================================================================== */

const LEARNING = [
  {
    id: 202610220001,
    title: "深度使用 Codex 并完善个人网站",
    type: "学习笔记",
    date: "2026-10-22",
    venue: "Codex 实践",
    summary: "把 Codex 从代码问答工具进一步用于完整的前端维护流程：先理解现有静态站结构，再迁移内容数据、完成隐私脱敏和兼容性修复，最后通过桌面端与移动端实际渲染回归，形成可重复的实践闭环。",
    highlights: [
      "Annotate",
      "Fork",
      "Archive",
      "Plan",
      "Plugin",
      "Skill"
    ],
    sections: [
      {
        title: "学习目标",
        body: "达到熟练掌握codex的特性，并且通过AI模型完成项目落地。"
      },
      {
        title: "实践路径",
        body: "通过接替OpenClaw已经实现的网站，让Codex自动读取代码，并且找出问题。提出解决方案，修复和完善。每次修复后自动提交git changes。"
      },
      {
        title: "验证结果",
        body: "按照优先级提出问题以及解决方案。修复并自动审查和测试。通过多轮迭代，完善网站。"
      }
    ],
    screenshots: [
      {
        src: "assets/learning/202610220001/site-desktop.png",
        alt: "桌面端个人主页首屏截图",
        caption: "桌面端首屏：保留白纸风格，同时验证信息层级与 CTA 布局。",
        width: 1425,
        height: 891
      },
      {
        src: "assets/learning/202610220001/site-mobile.png",
        alt: "移动端个人主页首屏截图",
        caption: "移动端 375×667：检查导航收缩、正文换行和按钮可见性。",
        width: 360,
        height: 640
      }
    ],
    tags: ["Codex", "AI 辅助开发", "个人网站", "工程实践"],
    links: [
      { label: "查看结构化数据", url: "#learning" }
    ]
  }
];
