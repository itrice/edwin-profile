/* ==========================================================================
   页面结构与文案数据
   --------------------------------------------------------------------------
   导航、区块标题、CTA、空状态和页脚文案统一维护在这里。
   修改页面顺序或文案时，不需要在 HTML 与 JavaScript 中重复维护。
   ========================================================================== */

const SITE = {
  navLinks: [
    { label: "关于", href: "#about" },
    { label: "经历", href: "#experience" },
    { label: "能力", href: "#skills", className: "opt" },
    { label: "学习", href: "#learning" },
    { label: "联系", href: "#contact" }
  ],

  hero: {
    status: "AVAILABLE FOR ARCHITECTURE & COLLABORATION",
    primaryCta: { label: "查看学习研究", href: "#learning" },
    primaryFallbackCta: { label: "查看工作经历", href: "#experience" },
    secondaryCta: { label: "工作经历", href: "#experience" },
    secondaryFallbackCta: { label: "技术能力", href: "#skills" },
    githubLabel: "GitHub"
  },

  sections: {
    about: {
      number: "01",
      title: "关于",
      description: "基本信息与职业理念。"
    },
    experience: {
      number: "02",
      title: "工作经历",
      description: "16 年，从研发工程师到研发经理，再回到架构一线。"
    },
    skills: {
      number: "03",
      title: "技术能力",
      description: "按领域划分的主要技术栈。"
    },
    learning: {
      number: "04",
      title: "学习研究",
      description: "学习笔记、架构复盘、技术分享与阅读记录。"
    }
  },

  learningEmpty: {
    status: "STATUS — IN PREPARATION",
    title: "学习研究整理中",
    description: "学习笔记与技术复盘将在后续陆续补充到这里。"
  },

  learningSampleNotice: "以下为界面测试示例，不代表正式学习成果；上线前可替换为真实内容或清空数据。",

  footer: {
    contactTitle: "联系方式",
    builtWith: "BUILT WITH VANILLA HTML · CSS · JS"
  }
};
