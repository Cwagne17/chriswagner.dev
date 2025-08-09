import type { Project } from "../types/iPortfolio";

export const projects: Project[] = [
  {
    title: "Multi-Region AWS Infrastructure",
    description:
      "Designed and implemented a highly available, multi-region AWS infrastructure using Terraform, supporting 99.99% uptime for critical applications.",
    technologies: [
      "AWS",
      "Terraform",
      "CloudFormation",
      "Docker",
      "Kubernetes",
    ],
    link: "https://github.com",
    metrics: "99.99% uptime, 50% cost reduction",
    gradient: "from-blue-500 to-cyan-500",
    slug: "multi-region-aws-infrastructure",
    caseStudy: {
      challenge: "A rapidly growing e-commerce platform was experiencing frequent outages and high infrastructure costs. They needed a resilient, multi-region architecture that could handle traffic spikes while maintaining cost efficiency.",
      solution: "I designed and implemented a comprehensive multi-region AWS infrastructure using Infrastructure as Code principles. The solution included automated failover, load balancing across regions, and cost optimization strategies.",
      process: [
        "Conducted infrastructure audit and performance analysis",
        "Designed multi-region architecture with automated failover",
        "Implemented Infrastructure as Code using Terraform",
        "Set up monitoring and alerting with CloudWatch",
        "Executed phased migration with zero downtime",
        "Optimized costs through right-sizing and reserved instances"
      ],
      results: [
        "Achieved 99.99% uptime (up from 98.5%)",
        "Reduced infrastructure costs by 50%",
        "Decreased deployment time from 4 hours to 30 minutes",
        "Improved disaster recovery time from 4 hours to 15 minutes"
      ],
      architecture: {
        image: "/architecture/multi-region-aws.png",
        alt: "Multi-region AWS infrastructure architecture diagram"
      },
      resources: {
        github: "https://github.com/chriswagner/multi-region-infrastructure",
        demo: "https://demo.chriswagner.dev/multi-region"
      }
    }
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Built comprehensive CI/CD pipelines using GitHub Actions and AWS CodePipeline, reducing deployment time by 80% and eliminating manual errors.",
    technologies: [
      "GitHub Actions",
      "AWS CodePipeline",
      "Docker",
      "ECS",
      "Lambda",
    ],
    link: "https://github.com",
    metrics: "80% faster deployments, 100% automation",
    gradient: "from-purple-500 to-pink-500",
    slug: "cicd-pipeline-automation",
    caseStudy: {
      challenge: "A development team was struggling with manual deployments that took hours and frequently failed. They needed an automated CI/CD solution that could support multiple environments and ensure consistent deployments.",
      solution: "I implemented a comprehensive CI/CD pipeline using GitHub Actions and AWS services, with automated testing, security scanning, and deployment across multiple environments.",
      process: [
        "Analyzed existing deployment processes and pain points",
        "Designed automated pipeline architecture",
        "Implemented GitHub Actions workflows with parallel processing",
        "Integrated automated testing and security scanning",
        "Set up environment-specific deployment strategies",
        "Created monitoring and rollback mechanisms"
      ],
      results: [
        "Reduced deployment time from 4 hours to 45 minutes",
        "Achieved 100% deployment automation",
        "Eliminated manual deployment errors",
        "Increased deployment frequency by 300%"
      ],
      architecture: {
        image: "/architecture/cicd-pipeline.png",
        alt: "CI/CD pipeline architecture with GitHub Actions and AWS"
      },
      resources: {
        github: "https://github.com/chriswagner/cicd-automation",
        demo: "https://demo.chriswagner.dev/cicd"
      }
    }
  },
  {
    title: "Serverless Monitoring Platform",
    description:
      "Developed a serverless monitoring and alerting system using AWS Lambda, CloudWatch, and SNS for real-time infrastructure monitoring.",
    technologies: ["AWS Lambda", "CloudWatch", "SNS", "Python", "DynamoDB"],
    link: "https://github.com",
    metrics: "Real-time alerting, 60% cost savings",
    gradient: "from-blue-500 to-purple-500",
    slug: "serverless-monitoring-platform",
    caseStudy: {
      challenge: "An organization needed a cost-effective monitoring solution that could scale automatically and provide real-time alerts for their growing cloud infrastructure without the overhead of traditional monitoring tools.",
      solution: "I developed a serverless monitoring platform using AWS Lambda functions that collect metrics, analyze trends, and send intelligent alerts through multiple channels, all while maintaining minimal operational overhead.",
      process: [
        "Identified key metrics and alerting requirements",
        "Designed serverless architecture for scalability",
        "Developed Lambda functions for data collection and analysis",
        "Implemented intelligent alerting with SNS and custom logic",
        "Created dashboards for visualization",
        "Set up automated deployment and maintenance"
      ],
      results: [
        "Achieved real-time monitoring with sub-minute alerting",
        "Reduced monitoring costs by 60%",
        "Improved incident response time by 75%",
        "Eliminated false positive alerts by 90%"
      ],
      architecture: {
        image: "/architecture/serverless-monitoring.png",
        alt: "Serverless monitoring platform architecture diagram"
      },
      resources: {
        github: "https://github.com/chriswagner/serverless-monitoring",
        download: {
          title: "Implementation Guide & Thesis",
          url: "/downloads/serverless-monitoring-thesis.pdf",
          description: "Comprehensive thesis paper on serverless monitoring architectures and implementation strategies"
        }
      }
    }
  }
];

export const featuredProjects = projects.slice(0, 3);
export const allProjects = [
  ...projects,
  {
    title: "Container Orchestration Platform",
    description:
      "Built a scalable container orchestration platform using Kubernetes and Docker, supporting microservices architecture for enterprise applications.",
    technologies: ["Kubernetes", "Docker", "Helm", "Istio", "Prometheus"],
    link: "https://github.com",
    metrics: "500+ microservices, 99.9% uptime",
    gradient: "from-green-500 to-blue-500",
    slug: "container-orchestration-platform",
    caseStudy: {
      challenge: "A large enterprise needed to modernize their monolithic applications into microservices while ensuring scalability, reliability, and ease of management.",
      solution: "I designed and implemented a comprehensive Kubernetes-based container orchestration platform with service mesh, monitoring, and automated scaling capabilities.",
      process: [
        "Assessed existing application architecture",
        "Designed microservices migration strategy",
        "Set up Kubernetes cluster with high availability",
        "Implemented Istio service mesh for communication",
        "Configured monitoring and observability",
        "Created automated CI/CD integration"
      ],
      results: [
        "Successfully migrated 500+ microservices",
        "Achieved 99.9% platform uptime",
        "Reduced deployment complexity by 70%",
        "Improved application scalability by 400%"
      ],
      architecture: {
        image: "/architecture/kubernetes-platform.png",
        alt: "Kubernetes container orchestration platform architecture"
      },
      resources: {
        github: "https://github.com/chriswagner/k8s-platform"
      }
    }
  },
  {
    title: "Infrastructure as Code Framework",
    description:
      "Created a comprehensive IaC framework using Terraform modules, enabling rapid deployment of standardized infrastructure across multiple environments.",
    technologies: ["Terraform", "Terragrunt", "AWS", "Azure", "GitOps"],
    link: "https://github.com",
    metrics: "90% faster provisioning, 100% consistency",
    gradient: "from-orange-500 to-red-500",
    slug: "infrastructure-as-code-framework",
    caseStudy: {
      challenge: "Multiple teams were creating infrastructure manually with inconsistent configurations, leading to security vulnerabilities and operational overhead.",
      solution: "I developed a comprehensive Infrastructure as Code framework with reusable modules, automated compliance checks, and standardized deployment processes.",
      process: [
        "Analyzed existing infrastructure patterns",
        "Designed modular Terraform architecture",
        "Created reusable modules for common resources",
        "Implemented compliance and security validation",
        "Set up GitOps workflow for deployments",
        "Provided training and documentation"
      ],
      results: [
        "Reduced infrastructure provisioning time by 90%",
        "Achieved 100% configuration consistency",
        "Eliminated manual configuration errors",
        "Improved security compliance by 95%"
      ],
      architecture: {
        image: "/architecture/iac-framework.png",
        alt: "Infrastructure as Code framework architecture diagram"
      },
      resources: {
        github: "https://github.com/chriswagner/iac-framework"
      }
    }
  },
  {
    title: "Security Compliance Automation",
    description:
      "Implemented automated security compliance checks and remediation using AWS Config, Lambda, and custom security policies for SOC 2 compliance.",
    technologies: ["AWS Config", "Lambda", "CloudTrail", "IAM", "Python"],
    link: "https://github.com",
    metrics: "100% compliance, 95% automation",
    gradient: "from-red-500 to-pink-500",
    slug: "security-compliance-automation",
    caseStudy: {
      challenge: "An organization needed to achieve SOC 2 compliance while maintaining operational efficiency. Manual compliance checks were time-consuming and error-prone.",
      solution: "I implemented an automated security compliance system that continuously monitors infrastructure, automatically remediates issues, and provides detailed audit trails.",
      process: [
        "Conducted security audit and gap analysis",
        "Designed automated compliance architecture",
        "Implemented AWS Config rules and remediation",
        "Created custom Lambda functions for complex checks",
        "Set up automated reporting and alerting",
        "Established continuous monitoring processes"
      ],
      results: [
        "Achieved 100% SOC 2 compliance",
        "Automated 95% of compliance checks",
        "Reduced compliance overhead by 80%",
        "Improved security posture significantly"
      ],
      architecture: {
        image: "/architecture/security-compliance.png",
        alt: "Security compliance automation architecture"
      },
      resources: {
        github: "https://github.com/chriswagner/security-compliance"
      }
    }
  }
];
