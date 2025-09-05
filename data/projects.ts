import { Project } from "@/types/project";

export const featuredProjects: Project[] = [
  {
    title: "STIG Compliance Automation for Kubernetes",
    description:
      "I automated Kubernetes STIG compliance using Ansible-based Compliance-as-Code, cutting manual effort and producing auditor-ready reports.",
    technologies: ["Ansible", "Kubernetes", "Containers", "IaC", "CaC"],
    link: "https://github.com/Cwagne17",
    metrics: "–90 min/host manual effort, repeatable check/enforce workflows",
    gradient: "from-emerald-500 to-teal-500",
    slug: "stig-compliance-automation-kubernetes",
    caseStudy: {
      challenge:
        "Manually checking ~91 Kubernetes STIG controls across a fleet is slow, inconsistent, and error-prone—scaling compliance created weeks of overhead.",
      solution:
        "I created an Ansible role and playbooks that audit and enforce Kubernetes STIG controls across an inventory over SSH, and generate STIG Viewer–compatible checklists.",
      process: [
        "Mapped each STIG control to concrete Kubernetes and node settings",
        "Built idempotent Ansible roles for audit (report-only) and enforce (remediate)",
        "Integrated runs into pipelines for continuous, event-driven compliance",
        "Generated STIG checklists for security teams and ATO evidence",
      ],
      results: [
        "Reduced manual effort by ~90 minutes per host per run",
        "Standardized compliance across environments via CaC",
        "Accelerated audit prep with STIG Viewer–compatible outputs",
        "Improved repeatability and lowered risk of drift/regression",
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
    title: "On-Demand VDI with Amazon WorkSpaces & Managed AD",
    description:
      "I built a self-service VDI solution using Amazon WorkSpaces integrated with Managed Microsoft AD and AWS Service Catalog, all provisioned via CDK.",
    technologies: ["Amazon WorkSpaces", "AWS Managed AD", "AWS CDK", "TypeScript", "Service Catalog"],
    link: "https://github.com/Cwagne17",
    metrics: "<1 hr provisioning, self-service onboarding, policy-driven desktops",
    gradient: "from-blue-500 to-cyan-500",
    slug: "on-demand-vdi-workspaces-ad",
    caseStudy: {
      challenge:
        "Remote user onboarding was slow and operationally heavy; we needed secure domain-joined desktops without manual ticket ping-pong.",
      solution:
        "I implemented Amazon WorkSpaces integrated with Managed AD and wrapped it in a Service Catalog product so teams could provision compliant desktops on-demand.",
      process: [
        "Defined user profiles, baseline images, and group policies",
        "Provisioned AD & networking via CDK (TypeScript) with repeatable stacks",
        "Built a self-service Service Catalog product and portfolio",
        "Automated lifecycle (create, stop, terminate) and cost controls",
      ],
      results: [
        "Cut desktop provisioning from days to under an hour",
        "Enabled self-service, reducing ops tickets and wait times",
        "Ensured consistent policy enforcement via domain join",
        "Improved auditability through IaC-managed configurations",
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
    title: "Windows Workload Modernization to Containers & Cloud-Native DB",
    description:
      "I led a re-platforming of Windows applications into containers backed by a managed, cloud-native database—improving performance and agility.",
    technologies: ["Containers", "Kubernetes", "Docker", "Managed SQL", "IaC", "CI/CD"],
    link: "https://github.com/Cwagne17",
    metrics: "Faster releases, higher uptime, simpler ops via standardization",
    gradient: "from-sky-500 to-indigo-500",
    slug: "windows-modernization-containers-db",
    caseStudy: {
      challenge:
        "Legacy Windows apps on-prem were costly, brittle, and slow to update; we needed cloud agility without sacrificing reliability.",
      solution:
        "I containerized Windows services, deployed them onto a Kubernetes platform, and migrated the database to a managed cloud-native service—wrapped with IaC and CI/CD.",
      process: [
        "Assessed dependencies and containerization feasibility",
        "Built container images and deployment manifests",
        "Provisioned platform and DB with repeatable IaC",
        "Established CI/CD for image builds, deploys, and rollbacks",
      ],
      results: [
        "Improved application responsiveness and service reliability",
        "Reduced operational overhead via managed services and IaC",
        "Accelerated release cadence with standardized pipelines",
        "Increased consistency across environments with versioned configs",
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
    title: "Terraform IaC Platform with 7-Minute Staging Environments",
    description:
      "I introduced Terraform at scale with reusable modules so teams can spin up a full staging environment from nothing to everything in ~7 minutes.",
    technologies: ["Terraform", "GitHub", "AWS", "Modules", "IaC"],
    link: "https://github.com/Cwagne17",
    metrics: "~7 min env spin-up, major cost savings via ephemeral stages",
    gradient: "from-amber-500 to-orange-600",
    slug: "terraform-iac-7min-staging",
    caseStudy: {
      challenge:
        "Manually built environments were slow, inconsistent, and expensive to keep running; we needed speed and repeatability.",
      solution:
        "I designed a modular Terraform framework with opinionated defaults and tests, enabling ephemeral, on-demand staging environments.",
      process: [
        "Modeled shared patterns into versioned Terraform modules",
        "Added validation and smoke tests for reliability",
        "Codified networking, security, and observability baselines",
        "Automated plan/apply via pipelines for push-button stacks",
      ],
      results: [
        "Provisioned full staging in ~7 minutes from a cold start",
        "Drove significant cost savings with just-in-time environments",
        "Reduced drift through standardized modules and policies",
        "Improved developer throughput with consistent scaffolding",
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
    title: "Organization-Wide CI/CD Standardization with a CircleCI Orb",
    description:
      "I created a centralized CircleCI orb used across 80+ repositories to standardize pipelines and cut ongoing maintenance overhead.",
    technologies: ["CircleCI", "Orbs", "CI/CD", "Testing", "Security Scans"],
    link: "https://github.com/Cwagne17",
    metrics: "80+ repos standardized, single-point versioned pipeline logic",
    gradient: "from-purple-500 to-pink-500",
    slug: "cicd-standardization-orb",
    caseStudy: {
      challenge:
        "Each repository had bespoke pipeline logic, making updates and security fixes slow and error-prone.",
      solution:
        "I packaged shared CI/CD steps (build, test, scan, release) into a reusable CircleCI orb so updates happen once and propagate everywhere.",
      process: [
        "Audited existing pipelines and extracted common patterns",
        "Built a configurable orb with sensible defaults and docs",
        "Added security scanning, caching, and parallelization",
        "Rolled out incrementally and versioned changes safely",
      ],
      results: [
        "Standardized CI/CD across 80+ repositories",
        "Centralized updates to a single orb repository",
        "Reduced maintenance toil and configuration drift",
        "Improved consistency and onboarding for new services",
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
    title: "SAML2 SSO Federation & Centralized Access",
    description:
      "I modernized identity by integrating SAML2 SSO with our IdP across SaaS tools and AWS, centralizing permissions and tightening security.",
    technologies: ["SAML2", "SSO", "IdP", "AWS", "Access Control"],
    link: "https://github.com/Cwagne17",
    metrics: "Centralized access, fewer tickets, improved auditability",
    gradient: "from-slate-500 to-zinc-600",
    slug: "saml2-sso-federation",
    caseStudy: {
      challenge:
        "Accounts and permissions were fragmented across tools; offboarding/onboarding and audits were slow and risky.",
      solution:
        "I implemented SAML2 SSO federation with our existing IdP, aligning roles and mappings across AWS and SaaS for least-privilege access.",
      process: [
        "Mapped teams/roles to fine-grained permissions",
        "Configured SAML apps and AWS federation with scoped access",
        "Automated provisioning and de-provisioning via groups",
        "Documented access pathways and audit procedures",
      ],
      results: [
        "Centralized identity and eliminated duplicate accounts",
        "Reduced access-change tickets and turnaround time",
        "Improved audit trails and compliance readiness",
        "Lowered risk by enforcing least-privilege consistently",
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
    title: "Serverless File Management Microservice",
    description:
      "I built a serverless service that orchestrates file operations with event-driven fan-out and persistence, inspired by graph recursion patterns.",
    technologies: ["Serverless", "Event-Driven", "S3", "Queueing", "Go/Python"],
    link: "https://github.com/Cwagne17",
    metrics: "Horizontal fan-out, async processing, resilient retries",
    gradient: "from-blue-600 to-violet-600",
    slug: "serverless-file-management",
    caseStudy: {
      challenge:
        "Processing large volumes of file operations required scalable orchestration without managing servers.",
      solution:
        "I designed an event-driven microservice that triggers parallel workers, persists metadata, and handles retries and partial failures gracefully.",
      process: [
        "Modeled events and idempotent handlers",
        "Implemented fan-out and durable queues",
        "Added metadata store and observability hooks",
        "Packaged deploys with IaC and automated tests",
      ],
      results: [
        "Scaled out processing elastically under burst load",
        "Reduced operational overhead with managed services",
        "Improved reliability via retries and dead-letter queues",
        "Shortened cycle times with asynchronous workflows",
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
