import { Project } from "@/types/project";

// Technology constants for standardization
const TECHNOLOGIES = {
  // Cloud Platforms & Services
  AWS: "AWS",
  AWS_CDK: "AWS CDK",
  AWS_MANAGED_AD: "AWS Managed AD",
  AWS_SERVICE_CATALOG: "AWS Service Catalog",
  AMAZON_WORKSPACES: "Amazon WorkSpaces",
  AWS_S3: "Amazon S3",

  // Infrastructure & DevOps
  TERRAFORM: "Terraform",
  ANSIBLE: "Ansible",
  KUBERNETES: "Kubernetes",
  DOCKER: "Docker",
  CONTAINERS: "Containers",
  IAC: "Infrastructure as Code",
  CAC: "Compliance as Code",

  // CI/CD & Development
  CIRCLECI: "CircleCI",
  CIRCLECI_ORBS: "CircleCI Orbs",
  CICD: "CI/CD",
  GITHUB: "GitHub",
  TYPESCRIPT: "TypeScript",
  GOLANG: "Go",
  PYTHON: "Python",

  // Security & Identity
  SAML2: "SAML 2.0",
  SSO: "Single Sign-On",
  IDP: "Identity Provider",
  ACCESS_CONTROL: "Access Control",
  SECURITY_SCANNING: "Security Scanning",

  // Architecture Patterns
  SERVERLESS: "Serverless",
  EVENT_DRIVEN: "Event-Driven Architecture",
  MICROSERVICES: "Microservices",
  MANAGED_DATABASES: "Managed Databases",

  // Operations & Monitoring
  AUTOMATION: "Automation",
  TESTING: "Automated Testing",
  MONITORING: "Monitoring",
  OBSERVABILITY: "Observability",
} as const;

export const featuredProjects: Project[] = [
  {
    title: "Enterprise Kubernetes STIG Compliance Automation",
    description:
      "Architected and delivered a Compliance-as-Code solution that automates 91 Kubernetes STIG controls across enterprise infrastructure, reducing manual security assessments from weeks to hours while ensuring consistent compliance posture.",
    technologies: [TECHNOLOGIES.ANSIBLE, TECHNOLOGIES.KUBERNETES, TECHNOLOGIES.CONTAINERS, TECHNOLOGIES.IAC, TECHNOLOGIES.CAC, TECHNOLOGIES.AUTOMATION],
    link: "https://github.com/Cwagne17",
    metrics: "90+ min saved per host • 91 STIG controls automated • 100% audit-ready reporting",
    gradient: "from-emerald-500 to-teal-500",
    slug: "stig-compliance-automation-kubernetes",
    caseStudy: {
      challenge:
        "Manual STIG compliance assessment of 91 Kubernetes controls across enterprise infrastructure required weeks per environment, created inconsistent results, and became a critical bottleneck for security certification and ATO processes.",
      solution:
        "Designed and implemented an Ansible-based Compliance-as-Code framework that automatically audits, enforces, and reports on all Kubernetes STIG controls, generating STIG Viewer-compatible evidence for security teams and auditors.",
      process: [
        "Analyzed and mapped each of the 91 STIG controls to specific Kubernetes API objects and node configurations",
        "Developed idempotent Ansible roles with dual-mode operation: audit-only for assessment and enforce for remediation",
        "Integrated compliance workflows into CI/CD pipelines for continuous monitoring and drift detection",
        "Built automated STIG checklist generation compatible with DISA STIG Viewer for streamlined audit processes",
      ],
      results: [
        "Eliminated 90+ minutes of manual effort per host per compliance run",
        "Achieved 100% consistency in compliance posture across all environments through standardized CaC",
        "Reduced ATO preparation time from weeks to days with automated evidence generation",
        "Enabled continuous compliance monitoring with zero-touch drift detection and remediation",
      ],
      architecture: {
        image: "/architecture/stig-cac.png",
        alt: "Compliance-as-Code automation applying Kubernetes STIG at scale",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
  {
    title: "Self-Service Cloud VDI Platform with Enterprise AD Integration",
    description:
      "Built a scalable, self-service Virtual Desktop Infrastructure using Amazon WorkSpaces and AWS Service Catalog, integrated with Managed Microsoft AD. Delivered secure, policy-driven desktops with Infrastructure-as-Code provisioning.",
    technologies: [TECHNOLOGIES.AMAZON_WORKSPACES, TECHNOLOGIES.AWS_MANAGED_AD, TECHNOLOGIES.AWS_CDK, TECHNOLOGIES.TYPESCRIPT, TECHNOLOGIES.AWS_SERVICE_CATALOG, TECHNOLOGIES.IAC],
    link: "https://github.com/Cwagne17",
    metrics: "< 1 hour provisioning • 100% self-service • 80% reduction in IT tickets",
    gradient: "from-blue-500 to-cyan-500",
    slug: "on-demand-vdi-workspaces-ad",
    caseStudy: {
      challenge:
        "Remote workforce expansion created a bottleneck in desktop provisioning, taking 3-5 days per user with manual ticketing processes. Security requirements demanded domain-joined machines with centralized policy enforcement, while IT teams needed to scale without proportional staffing increases.",
      solution:
        "Architected a cloud-native VDI platform combining Amazon WorkSpaces with AWS Managed Microsoft AD, wrapped in a self-service Service Catalog product. Users can provision compliant, domain-joined desktops instantly while maintaining enterprise security and governance standards.",
      process: [
        "Designed user profile templates and baseline AMIs with security hardening and standard software packages",
        "Implemented Infrastructure-as-Code using AWS CDK (TypeScript) for repeatable, version-controlled deployments",
        "Created AWS Service Catalog products and portfolios enabling self-service provisioning with built-in approval workflows",
        "Established automated lifecycle management including cost controls, scheduled shutdown, and resource cleanup",
      ],
      results: [
        "Reduced desktop provisioning time from 3-5 days to under 1 hour",
        "Achieved 80% reduction in IT support tickets through self-service capabilities",
        "Maintained 100% policy compliance through automated domain join and Group Policy enforcement",
        "Enabled elastic workforce scaling with predictable per-user costs and automated resource management",
      ],
      architecture: {
        image: "/architecture/workspaces-ad.png",
        alt: "Cloud VDI architecture with WorkSpaces and Managed Microsoft AD",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
  {
    title: "Enterprise Windows Workload Cloud Modernization",
    description:
      "Led comprehensive re-platforming of legacy Windows applications to containerized cloud-native architecture. Migrated on-premises workloads to Kubernetes with managed database services, dramatically improving scalability, reliability, and operational efficiency.",
    technologies: [TECHNOLOGIES.CONTAINERS, TECHNOLOGIES.KUBERNETES, TECHNOLOGIES.DOCKER, TECHNOLOGIES.MANAGED_DATABASES, TECHNOLOGIES.IAC, TECHNOLOGIES.CICD, TECHNOLOGIES.AWS],
    link: "https://github.com/Cwagne17",
    metrics: "60% faster deployments • 99.9% uptime achieved • 40% operational cost reduction",
    gradient: "from-sky-500 to-indigo-500",
    slug: "windows-modernization-containers-db",
    caseStudy: {
      challenge:
        "Legacy Windows applications running on aging on-premises infrastructure were creating technical debt, high operational costs, and deployment bottlenecks. Monthly patching windows required extensive downtime, and scaling was limited by physical hardware constraints.",
      solution:
        "Orchestrated a complete modernization strategy: containerized Windows services using Docker, deployed to managed Kubernetes clusters, and migrated databases to cloud-native managed services. Established GitOps workflows and Infrastructure-as-Code for consistent, repeatable deployments.",
      process: [
        "Conducted comprehensive dependency analysis and containerization feasibility assessment for legacy applications",
        "Architected containerization strategy with Windows containers and multi-stage Docker builds for optimized images",
        "Designed and provisioned Kubernetes platform infrastructure using Infrastructure-as-Code with automated scaling policies",
        "Implemented GitOps CI/CD pipelines with automated testing, security scanning, and blue-green deployment strategies",
      ],
      results: [
        "Achieved 60% faster deployment cycles through automated CI/CD and elimination of manual processes",
        "Improved application availability to 99.9% uptime through Kubernetes self-healing and horizontal scaling",
        "Reduced operational costs by 40% via cloud-native managed services and infrastructure optimization",
        "Eliminated monthly maintenance windows through rolling updates and zero-downtime deployment capabilities",
      ],
      architecture: {
        image: "/architecture/windows-containers-db.png",
        alt: "Modernized architecture using containers with a managed database backend",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    title: "Enterprise Terraform Platform with Rapid Environment Provisioning",
    description:
      "Designed and implemented a comprehensive Infrastructure-as-Code platform using modular Terraform architecture. Enables teams to provision complete staging environments in under 7 minutes, driving significant cost optimization through ephemeral infrastructure patterns.",
    technologies: [TECHNOLOGIES.TERRAFORM, TECHNOLOGIES.GITHUB, TECHNOLOGIES.AWS, TECHNOLOGIES.IAC, TECHNOLOGIES.CICD, TECHNOLOGIES.AUTOMATION],
    link: "https://github.com/Cwagne17",
    metrics: "7-minute full environment provisioning • 70% cost reduction • 15+ reusable modules",
    gradient: "from-amber-500 to-orange-600",
    slug: "terraform-iac-7min-staging",
    caseStudy: {
      challenge:
        "Development teams were spending days manually building inconsistent staging environments, leading to environment drift, high cloud costs from permanently running infrastructure, and deployment delays that bottlenecked the entire software delivery lifecycle.",
      solution:
        "Architected a modular Terraform platform with standardized, versioned modules and automated workflows that enable on-demand provisioning of complete, consistent environments. Implemented ephemeral infrastructure patterns to dramatically reduce costs while improving developer velocity.",
      process: [
        "Analyzed common infrastructure patterns and abstracted them into 15+ reusable, tested Terraform modules with semantic versioning",
        "Implemented comprehensive validation suite with automated policy checks, cost estimation, and security compliance scanning",
        "Established baseline configurations for networking, security groups, observability, and monitoring across all environments",
        "Created GitOps workflows with automated Terraform plan/apply processes and environment lifecycle management",
      ],
      results: [
        "Reduced environment provisioning time from days to 7 minutes through complete automation and standardization",
        "Achieved 70% cost reduction by enabling just-in-time, ephemeral staging environments with automatic cleanup",
        "Eliminated configuration drift through standardized, version-controlled infrastructure modules and policies",
        "Improved developer productivity with consistent, self-service infrastructure provisioning and pre-configured tooling",
      ],
      architecture: {
        image: "/architecture/terraform-ephemeral-staging.png",
        alt: "Ephemeral staging environment architecture driven by Terraform modules",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
  {
    title: "Enterprise CI/CD Standardization Platform",
    description:
      "Architected and delivered a centralized CircleCI Orb that standardizes CI/CD pipelines across 80+ repositories organization-wide. Provides versioned, reusable pipeline components with built-in security scanning, testing, and deployment automation.",
    technologies: [TECHNOLOGIES.CIRCLECI, TECHNOLOGIES.CIRCLECI_ORBS, TECHNOLOGIES.CICD, TECHNOLOGIES.TESTING, TECHNOLOGIES.SECURITY_SCANNING, TECHNOLOGIES.AUTOMATION],
    link: "https://github.com/Cwagne17",
    metrics: "80+ repositories standardized • Single source of truth • 90% maintenance reduction",
    gradient: "from-purple-500 to-pink-500",
    slug: "cicd-standardization-orb",
    caseStudy: {
      challenge:
        "Each of 80+ repositories maintained custom, inconsistent CI/CD configurations, making security updates, policy enforcement, and pipeline improvements extremely time-intensive. Teams were duplicating effort and creating maintenance overhead that scaled linearly with repository count.",
      solution:
        "Designed and implemented a comprehensive CircleCI Orb that encapsulates all standard pipeline operations—build, test, security scan, and deploy—into versioned, reusable components. This created a single source of truth for CI/CD logic that propagates updates across the entire organization instantly.",
      process: [
        "Conducted comprehensive audit of existing pipeline patterns across all repositories to identify common workflows and requirements",
        "Architected flexible, configurable orb with intelligent defaults while maintaining customization capabilities for edge cases",
        "Integrated comprehensive security scanning suite including SAST, dependency vulnerability scanning, and container image analysis",
        "Implemented phased rollout strategy with extensive documentation and team training to ensure smooth adoption",
      ],
      results: [
        "Achieved 100% pipeline standardization across 80+ repositories with consistent security and quality practices",
        "Reduced pipeline maintenance overhead by 90% through centralized updates and version management",
        "Improved security posture with mandatory scanning integrated into every build process organization-wide",
        "Accelerated developer onboarding with standardized, well-documented pipeline patterns and best practices",
      ],
      architecture: {
        image: "/architecture/circleci-orb.png",
        alt: "Centralized CI/CD architecture using a shared CircleCI orb",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
  {
    title: "Enterprise Identity Federation & Zero-Trust Access Management",
    description:
      "Modernized enterprise identity architecture by implementing SAML 2.0 SSO federation across AWS accounts and SaaS applications. Established centralized identity governance with least-privilege access controls and comprehensive audit capabilities.",
    technologies: [TECHNOLOGIES.SAML2, TECHNOLOGIES.SSO, TECHNOLOGIES.IDP, TECHNOLOGIES.AWS, TECHNOLOGIES.ACCESS_CONTROL, TECHNOLOGIES.AUTOMATION],
    link: "https://github.com/Cwagne17",
    metrics: "100% SSO coverage • 75% reduction in access tickets • Zero privilege escalation incidents",
    gradient: "from-slate-500 to-zinc-600",
    slug: "saml2-sso-federation",
    caseStudy: {
      challenge:
        "Identity and access management was fragmented across 20+ SaaS applications and multiple AWS accounts, creating security risks, audit compliance challenges, and operational overhead. User provisioning and de-provisioning required manual intervention across each system, leading to access creep and delayed offboarding.",
      solution:
        "Architected comprehensive SAML 2.0 federation connecting enterprise Identity Provider to all applications and AWS accounts. Implemented role-based access control with automated provisioning/de-provisioning, establishing a zero-trust security model with centralized governance and auditing.",
      process: [
        "Mapped organizational roles and responsibilities to fine-grained application permissions and AWS IAM policies",
        "Configured SAML 2.0 federation for all SaaS applications with automated user lifecycle management through group-based provisioning",
        "Implemented AWS IAM Identity Center integration with cross-account role assumption and session-based access controls",
        "Established comprehensive logging and monitoring for all authentication events and permission changes across the ecosystem",
      ],
      results: [
        "Achieved 100% SSO coverage across all enterprise applications and AWS accounts with unified authentication",
        "Reduced access management tickets by 75% through automated provisioning and self-service role requests",
        "Eliminated privilege escalation incidents through consistent least-privilege enforcement and regular access reviews",
        "Improved audit compliance with comprehensive access logs and automated compliance reporting capabilities",
      ],
      architecture: {
        image: "/architecture/saml-sso.png",
        alt: "SAML2 SSO federation across SaaS and AWS accounts",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
  {
    title: "Scalable Serverless File Processing Orchestration Platform",
    description:
      "Designed and implemented a cloud-native, event-driven microservice architecture for high-volume file processing operations. Features elastic auto-scaling, fault-tolerant retry mechanisms, and horizontal fan-out processing patterns inspired by distributed graph algorithms.",
    technologies: [TECHNOLOGIES.SERVERLESS, TECHNOLOGIES.EVENT_DRIVEN, TECHNOLOGIES.AWS_S3, TECHNOLOGIES.AWS, TECHNOLOGIES.GOLANG, TECHNOLOGIES.PYTHON, TECHNOLOGIES.MICROSERVICES],
    link: "https://github.com/Cwagne17",
    metrics: "1000+ files/sec processing • 99.99% reliability • Auto-scaling to zero cost",
    gradient: "from-blue-600 to-violet-600",
    slug: "serverless-file-management",
    caseStudy: {
      challenge:
        "Processing high volumes of file operations required scalable orchestration without server management overhead. The system needed to handle burst traffic, ensure processing reliability, and maintain cost efficiency by scaling to zero during idle periods.",
      solution:
        "Architected a serverless, event-driven microservice platform using AWS Lambda, SQS, and S3. Implemented distributed processing patterns with automatic fan-out, metadata persistence, and comprehensive error handling with exponential backoff and dead letter queue recovery.",
      process: [
        "Designed event-driven architecture with idempotent Lambda functions and message-based coordination for reliable processing",
        "Implemented intelligent fan-out patterns using SQS for parallel processing with automatic scaling based on queue depth",
        "Built comprehensive metadata storage and tracking system with DynamoDB for processing state management and audit trails",
        "Established Infrastructure-as-Code deployment pipelines with automated testing, monitoring, and alerting for production reliability",
      ],
      results: [
        "Achieved processing capacity of 1000+ files per second with automatic horizontal scaling under burst load conditions",
        "Delivered 99.99% processing reliability through retry mechanisms, dead letter queues, and comprehensive error handling",
        "Reduced operational costs by 85% with serverless auto-scaling and pay-per-use pricing model",
        "Improved processing latency by 70% through asynchronous workflows and parallel execution patterns",
      ],
      architecture: {
        image: "/architecture/serverless-files.png",
        alt: "Event-driven serverless architecture for file management",
      },
      resources: {
        github: "https://github.com/Cwagne17",
      },
    },
  },
];
