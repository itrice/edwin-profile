/* ==========================================================================
   个人信息数据（关于 / 首屏 / 页脚共用）
   --------------------------------------------------------------------------
   修改姓名、定位、联系方式、学历、理念等，只需改这个文件。

   字段说明：
     name          中文姓名
     enName        英文名（导航与首屏点缀）
     heroTitle     首屏大标题下的英文标注，如 "Edwin · System Architect"
     roles         定位，数组，页面用「/」分隔展示
     lede          首屏价值主张，支持 <strong> 强调
     stats         首屏数据条，[{ label, value }]
     bio           关于区自我介绍，字符串数组，每项一段，支持 <strong>
     facts         关于区信息表，[{ label, value, href? }]
                   value 里如需链接，填 href；不填则按纯文本渲染
     motto         职业理念，[{ key, value }]
     contact       页脚联系方式，{ intro, links: [{ label, href }] }
     meta          SEO 与结构化数据字段

   隐私约定：
     电话只保存脱敏后的展示值，不在站点文件中保存完整号码。
   ========================================================================== */

const PROFILE = {

  name: "安仕平",
  enName: "EDWIN",
  heroTitle: "Edwin · System Architect",

  roles: ["系统架构设计师", "高级工程师", "研发经理"],

  lede: "16 年软件研发经验。主导十余年老旧单体系统拆分为微服务架构，搭建端到端自动化 CI/CD 体系，把<strong>架构设计、性能优化、工程效能</strong>做成可度量、可复用的能力。",

  stats: [
    { label: "Experience", value: "16 年" },
    { label: "Credential", value: "系统架构设计师" },
    { label: "Team",       value: "曾管理多人研发团队" },
    { label: "Award",      value: "四川省科学技术进步二等奖" }
  ],

  bio: [
    "长期负责产品架构设计与研发团队管理，近年回到<strong>架构一线</strong>，主导十年老旧 .NET Framework 系统的重构：单体拆微服务、灰度切换、数据库版本化、全自动流水线。",
    "技术面横跨后端架构、桌面客户端与工程效能。做过 WPF 客户端框架的内存瓶颈突破，也做过 K8s + ArgoCD 的云原生交付。",
    "自我驱动，逻辑严谨，责任心强；具备分布式团队协作与全英文沟通经验。"
  ],

  facts: [
    { label: "Profession", value: "系统架构设计师（软考）" },
    { label: "Education",  value: "计算机软件 · 大专" },
    { label: "Language",   value: "中文 / 英语（可全英文沟通）" },
    { label: "Phone",      value: "181****1287" },
    { label: "Email",      value: "itrice@live.cn",           href: "mailto:itrice@live.cn" },
    { label: "GitHub",     value: "github.com/itrice",        href: "https://github.com/itrice" },
    { label: "CSDN",       value: "me.csdn.net/iTrice",       href: "https://me.csdn.net/iTrice" }
  ],

  motto: [
    { key: "做人", value: "乐观，分享，激情。" },
    { key: "做事", value: "目标、方案、执行、完善、坚持。" },
    { key: "相信", value: "认真只能把事情做对，用心才能把事情做好。" }
  ],

  contact: {
    intro: "技术交流、架构咨询或合作，欢迎邮件联系。",
    links: [
      { label: "EMAIL · itrice@live.cn", href: "mailto:itrice@live.cn" },
      { label: "GITHUB", href: "https://github.com/itrice" },
      { label: "CSDN",   href: "https://me.csdn.net/iTrice" }
    ]
  },

  meta: {
    description: "安仕平（Edwin），系统架构设计师、高级工程师、研发经理。16 年软件研发经验，主导十年老旧单体系统的微服务架构重构与端到端 CI/CD 体系建设。",
    shareDescription: "16 年软件研发经验，专注系统架构设计、微服务重构与工程效能。",
    knowsAbout: [
      "系统架构设计", "微服务", ".NET Core", "DevOps", "CI/CD", "研发团队管理"
    ]
  }

};
