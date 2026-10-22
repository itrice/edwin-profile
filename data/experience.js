/* ==========================================================================
   工作经历数据
   --------------------------------------------------------------------------
   新增 / 修改一段经历 = 直接改这个数组，页面会自动渲染。
   数组顺序即为页面展示顺序（建议倒序：最近的在前）。

   字段说明：
     id         唯一标识（英文 kebab-case，可选，用于锚点）
     title      标题。有公司名时填公司名；无公司名时填业务方向
     role       职位 / 部门，如「研发经理 · 安防事业部」
     start      开始时间，格式 "YYYY.MM"
     end        结束时间，格式 "YYYY.MM"；填 "至今" 或 null 表示在职
     current    可选，true 表示当前在职（影响时间轴节点高亮），默认若 end 为「至今」则为 true
     desc       职责摘要，1–2 句
     points     关键成果，数组，每条一个要点
                支持内联 HTML（如 <strong>数字</strong> 加粗强调）
     stack      技术栈，字符串数组（可选）
   ========================================================================== */

const EXPERIENCE = [

  {
    id: "architecture-refactor",
    title: "Solera",
    role: "架构设计 / 高级工程师",
    start: "2022.03",
    end: "至今",
    current: true,
    desc: "对公司内部产品进行架构改造升级，并参与公司其他项目的研发。",
    points: [
      "主导十年老旧 .NET Framework 系统 <strong>GlobalInpart</strong> 的架构重构，完成方案设计与落地实施；将单体应用拆分为微服务架构，实现旧系统平稳替换。",
      "参与 <strong>Sachcontrol</strong> V2.0 升级：基于运行十余年的 Microsoft CRM 旧系统，独立搭建后端 API 服务与全新前端应用，完成 UI 现代化升级。",
      "完成业务解耦，支持服务独立迭代、弹性扩缩容，实现新旧系统灰度切换、业务无缝迁移。",
      "性能优化：API 平均响应时间 <strong>≤200ms</strong>，单条 SQL 查询耗时 <strong>≤1s</strong>。",
      "单元测试覆盖率 <strong>≥90%</strong>，流水线内置自动化集成测试与代码提交自动校验，提前拦截缺陷。",
      "搭建端到端全自动 CI/CD 流水线，配套 Liquibase 实现数据库版本化管理，支持发布与一键回滚。",
      "接入 Vault、Keycloak、Kong，统一密钥管理、身份认证与流量管控。"
    ],
    stack: [
      ".NET Core", "Angular", "TypeScript", "WCF", "K8s", "ArgoCD", "Tanzu",
      "SQL Server", "Liquibase", "Kong", "Redis", "Keycloak", "Vault",
      "Config-Server", "Helm", "NiFi", "RabbitMQ", "Dapr", "Graylog"
    ]
  },

  {
    id: "yuchuang",
    title: "成都愚创科技有限公司",
    role: "高级工程师",
    start: "2020.07",
    end: "2022.03",
    desc: "基于公司 PaaS 平台做 1-N 开发：与客户沟通需求，整理一页纸方案，完成项目开发。",
    points: [
      "获得 <strong>齐心集团 HR 项目最佳技术奖</strong>。",
      "扩展技术面：Python、Redis、Elasticsearch、Cassandra。",
      "使用 Grafana、Jenkins、SonarQube 进行开发与质量分析。"
    ],
    stack: [
      "PaaS", "Python", "Redis", "Elasticsearch", "Cassandra",
      "Jenkins", "SonarQube", "Grafana"
    ]
  },

  {
    id: "shinetech",
    title: "Shinetech",
    role: "高级工程师 · 成都分公司",
    start: "2019.07",
    end: "2020.06",
    desc: "参与国内外项目开发，并承担部分重要的架构与设计工作。",
    points: [
      "学习国外软件团队的开发模型、项目管理与质量控制方法。",
      "通过全英文会议和文本沟通，具备良好的英语听说读写能力。",
      "参与并理解「分布式」团队开发方式。"
    ],
    stack: []
  },

  {
    id: "jiazexingye",
    title: "成都嘉泽兴业科技有限责任公司",
    role: "研发经理 · 研发部门",
    start: "2016.07",
    end: "2019.05",
    desc: "作为研发负责人，负责部门产品设计与日常管理、技术提升，以及相关制度制定和考核。",
    points: [
      "<strong>部门管理</strong>：制定研发任务与考核计划，关注成员技术提升与工作状态，组织团建。",
      "<strong>技术管理</strong>：组织内部学习培训，制定研发目标，帮助成员提升技术能力与业务理解。",
      "<strong>项目管理</strong>：参与市场调研、需求分析、招投标、软件开发、实施及验收上线。",
      "2017 年所负责产品获「<strong>四川省科学技术进步二等奖</strong>」；申请软件外观与实用新型专利。",
      "最多同时负责 5 个环境监测站项目的开发与交付。",
      "公司被中国国信信息总公司全资收购（央企）。"
    ],
    stack: [
      "ASP.NET MVC", ".NET Core", "EF", "Vue", "TypeScript", "jQuery",
      "Docker", "Nginx"
    ]
  },

  {
    id: "sobe",
    title: "神州数码索贝科技股份有限公司",
    role: "研发经理 · 安防事业部",
    start: "2012.09",
    end: "2016.06",
    desc: "管理 12 人 C# 开发团队，负责公司所有客户端产品的架构设计，并解决系统开发与运行中的各类问题。",
    points: [
      "独立完成 <strong>PVS</strong> 产品升级改造；完成 <strong>SOC 客户端</strong>扁平化、模块化重构。",
      "搭建基于 <strong>MEF</strong> 的 IVS 客户端框架：突破 32 位系统下单进程 1.8G 内存瓶颈，实现模块动态加载/释放、多进程管理与插件热插拔；解决模块异常导致整个客户端退出的问题。",
      "完成统一 <strong>GIS</strong> 接口定义（基于 Google 与 SuperMap）；基于 <strong>WPF</strong> 实现虚拟化显示，优化内存占用与加载速度。",
      "解决 Windows 下跨平台调用内存无法释放、图像处理内存碎片问题。",
      "荣誉：2013 年最佳新员工奖、2014 年度最佳研发奖、2015 最佳团队奖。"
    ],
    stack: [
      "WPF", "Silverlight", "MEF", "OCX", "ADO.NET", "Socket", "IoC",
      "MySQL", "WinForm"
    ]
  },

  {
    id: "huanhai",
    title: "贵阳环海科技有限责任公司",
    role: "研发工程师 · 研发部",
    start: "2009.06",
    end: "2012.08",
    desc: "作为主要研发人员，覆盖需求调研、方案设计、开发、测试与运维，并参与用户培训与市场调研。",
    points: [
      "3 个月完成贵阳市高新区信息化建设门户网站开发。",
      "参与贵州省手机投注平台维护与开发：对接贵州福利彩票中心系统及四大银行接口。",
      "参与甘肃省手机投注平台开发，负责平台网站开发。",
      "负责贵州省福利彩票中心门户网站重构。",
      "设计开发贵州省保健网（贵州省卫生厅保健处体检系统），至今稳定运行。"
    ],
    stack: []
  }

];
