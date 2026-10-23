/* ==========================================================================
   技术能力数据
   --------------------------------------------------------------------------
   每个分组包含一个标题和一组技术标签。
   页面按数组顺序渲染，修改或新增分组只需编辑此文件。
   ========================================================================== */

const SKILL_GROUPS = [
  {
    title: "Backend & Architecture",
    items: [
      ".NET / C#", ".NET Core", ".NET Framework", "ASP.NET MVC", "WCF",
      "Dapr", "微服务", "分布式架构", "API 设计", "Python"
    ]
  },
  {
    title: "Frontend & Client",
    items: [
      "Angular", "React", "Vue", "TypeScript", "WPF", "WinForm",
      "Silverlight", "MEF", "GIS 集成"
    ]
  },
  {
    title: "Data & Middleware",
    items: [
      "SQL Server", "MySQL", "Redis", "RabbitMQ", "Elasticsearch",
      "Cassandra", "NiFi", "Liquibase"
    ]
  },
  {
    title: "DevOps & Cloud Native",
    items: [
      "K8s", "ArgoCD", "Tanzu", "Helm", "Docker", "Jenkins", "CI/CD",
      "Nginx", "Grafana", "Graylog", "SonarQube"
    ]
  },
  {
    title: "Security & Governance",
    items: [
      "Keycloak", "Vault", "Kong", "Config-Server", "身份认证",
      "密钥管理", "流量管控"
    ]
  },
  {
    title: "Management",
    items: [
      "研发团队管理", "架构评审", "技术方案设计", "需求分析", "项目管理"
    ]
  }
];
