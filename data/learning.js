/* ==========================================================================
   学习研究数据
   --------------------------------------------------------------------------
   学习笔记、架构复盘、技术分享、阅读记录等统一放在 LEARNING 数组。
   当前内容均为界面测试示例，isExample 为 true 时页面会显示“示例”标记。

   字段说明：
     id         唯一标识（英文 kebab-case）
     title      标题
     type       类型：学习笔记 | 架构复盘 | 技术分享 | 开源实践 | 读书笔记
     date       日期，格式 "YYYY-MM" 或 "YYYY-MM-DD"
     venue      来源、栏目或学习场景
     authors    作者数组（可选）
     summary    摘要
     tags       标签数组（可选）
     links      链接数组 [{ label, url }]（可选）
     isExample  是否测试示例
   ========================================================================== */

const LEARNING = [
  {
    id: "microservice-boundaries",
    title: "从单体到微服务的边界划分：学习笔记",
    type: "学习笔记",
    date: "2026-10-23",
    venue: "架构学习",
    authors: ["安仕平"],
    summary: "这是一条用于验证学习研究列表的学习笔记示例，围绕领域边界、数据归属、服务契约与迁移顺序整理观察点，不代表正式发布内容。",
    tags: ["示例", "微服务", "领域边界"],
    links: [{ label: "示例详情", url: "#learning" }],
    isExample: true
  },
  {
    id: "legacy-refactor-checklist",
    title: "旧系统渐进式重构的取舍清单",
    type: "架构复盘",
    date: "2026-10-18",
    venue: "项目复盘",
    authors: ["安仕平"],
    summary: "用于测试长标题和复盘卡片的示例内容，记录兼容性、灰度切换、回滚机制和团队协作四个维度的检查思路，之后可替换为真实复盘。",
    tags: ["示例", "架构", "重构"],
    links: [{ label: "查看提纲", url: "#learning" }],
    isExample: true
  },
  {
    id: "quality-gates",
    title: "CI/CD 流水线中的关键质量门禁",
    type: "技术分享",
    date: "2026-09-30",
    venue: "团队分享",
    summary: "这是一条技术分享示例，用于检查类型徽章、作者、来源与标签的组合展示，内容聚焦编译、测试、代码扫描和发布审批。",
    tags: ["示例", "DevOps", "CI/CD"],
    isExample: true
  },
  {
    id: "cloud-native-tooling",
    title: "云原生交付工具链阅读记录",
    type: "开源实践",
    date: "2026-09-12",
    venue: "开源学习",
    summary: "用于验证不带链接的卡片布局，记录 Kubernetes、Helm 与 ArgoCD 文档的阅读顺序，并整理配置管理和发布流程中的关注点。",
    tags: ["示例", "K8s", "ArgoCD"],
    isExample: true
  },
  {
    id: "ddia-reading-notes",
    title: "《设计数据密集型应用》阅读提纲",
    type: "读书笔记",
    date: "2026-08-26",
    venue: "技术阅读",
    summary: "读书笔记测试示例，用于检查较长摘要、不同日期和读书类筛选条件，围绕可靠性、可扩展性与可维护性整理问题清单。",
    tags: ["示例", "数据系统", "阅读"],
    links: [{ label: "阅读入口", url: "#learning" }],
    isExample: true
  },
  {
    id: "api-latency-analysis",
    title: "API 响应时间定位方法：测试示例",
    type: "学习笔记",
    date: "2026-08-08",
    venue: "性能学习",
    summary: "最后一条学习笔记示例，用于验证同类型多条数据和默认倒序排列，内容将请求链路、数据库耗时与缓存命中作为排查切入口。",
    tags: ["示例", "性能", "API"],
    isExample: true
  }
];
