import { Project } from "@/types/project";

export const featuredProjects: Project[] = [
  {
    title: "EKS DevSecOps Platform",
    description:
      "Built an Amazon EKS platform with Infrastructure as Code and Helm, assembling cloud-native platform engineering and DevSecOps capabilities into a repeatable AWS deployment.",
    technologies: ["AWS", "Amazon EKS", "Kubernetes", "AWS CDK", "Helm", "DevSecOps"],
    link: "https://github.com/Cwagne17/cdk-eks-platform",
    metrics: "IaC-based platform • Helm-managed tooling • AWS EKS",
    gradient: "from-blue-600 to-cyan-500",
    slug: "eks-devsecops-platform",
    caseStudy: {
      challenge:
        "Cloud-native application teams need more than a Kubernetes cluster: they need a consistent foundation for deployment, security, observability, and day-two operations without rebuilding the same platform capabilities for every environment.",
      solution:
        "Developed an Amazon EKS-based DevSecOps platform using Infrastructure as Code for the AWS foundation and Helm for Kubernetes add-ons. The design packages mature open-source tooling from the CNCF ecosystem into a repeatable platform pattern.",
      process: [
        "Defined the AWS and EKS foundation as code so the environment can be reviewed, versioned, and recreated",
        "Organized cluster capabilities as Helm-managed components with explicit configuration and lifecycle boundaries",
        "Integrated platform engineering and DevSecOps tooling around a shared Kubernetes control plane",
        "Documented the deployment flow and repository structure to make the platform easier to extend",
      ],
      results: [
        "Produced a repeatable EKS reference platform instead of a one-off cluster build",
        "Separated cloud infrastructure and cluster add-ons for clearer ownership and upgrades",
        "Created a practical foundation for GitOps, security, and observability capabilities",
        "Published the implementation as a portfolio-ready public repository",
      ],
      architecture: {
        image: "/diagrams/eks-devsecops-platform.png",
        alt: "EKS DevSecOps platform architecture showing infrastructure as code, an EKS cluster, Helm-managed platform services, and application teams",
      },
      resources: { github: "https://github.com/Cwagne17/cdk-eks-platform" },
    },
  },
  {
    title: "OSS Image Compliance Pipeline",
    description:
      "Designed a GitHub Actions-first supply-chain pipeline that mirrors upstream container images to GHCR, scans them, and attaches standards-based compliance evidence to immutable digests.",
    technologies: ["GitHub Actions", "GHCR", "Containers", "SBOM", "VEX", "SLSA", "Attestations"],
    link: "https://github.com/Cwagne17/oss-image-compliance",
    metrics: "6 evidence types • Digest-bound attestations • Automated image intake",
    gradient: "from-violet-500 to-fuchsia-500",
    slug: "oss-image-compliance-pipeline",
    caseStudy: {
      challenge:
        "Consuming upstream open-source container images introduces provenance, vulnerability, and compliance questions. Tags can move, scan results become detached from the artifact, and reviewers lack a consistent evidence package for release decisions.",
      solution:
        "Designed a GitHub Actions-first workflow that ingests an upstream image, mirrors it into GitHub Container Registry, scans the mirrored artifact, and publishes SBOM, VEX, vulnerability, provenance, STIG, and FIPS evidence against its immutable digest.",
      process: [
        "Resolved the upstream image to an immutable digest before promotion",
        "Mirrored the selected artifact into GHCR under a controlled namespace",
        "Ran security and compliance stages to generate machine-readable evidence",
        "Attached attestations to the digest so evidence travels with the exact reviewed artifact",
      ],
      results: [
        "Created a reproducible intake path for upstream open-source images",
        "Bound compliance evidence to immutable image digests rather than mutable tags",
        "Standardized six evidence categories: SBOM, VEX, vulnerability, provenance, STIG, and FIPS",
        "Made supply-chain review artifacts discoverable alongside the mirrored image",
      ],
      architecture: {
        image: "/diagrams/oss-image-compliance-pipeline.png",
        alt: "Container compliance pipeline from upstream registry through GitHub Actions scanning to GHCR with digest-bound attestations",
      },
      resources: { github: "https://github.com/Cwagne17/oss-image-compliance" },
    },
  },
  {
    title: "Kubernetes STIG Baseline EKS Overlay",
    description:
      "Developed a Chef InSpec overlay for applying the DISA Kubernetes STIG to Amazon EKS, with EKS-specific inputs, helper resources, and documented managed-control-plane exemptions.",
    technologies: ["Amazon EKS", "Kubernetes", "Chef InSpec", "DISA STIG", "Compliance as Code", "AWS"],
    link: "https://github.com/Cwagne17/kubernetes-stig-baseline-eks-overlay",
    metrics: "EKS-aware controls • Managed-service exemptions • Automated evidence",
    gradient: "from-emerald-500 to-teal-500",
    slug: "kubernetes-stig-eks-overlay",
    caseStudy: {
      challenge:
        "The upstream Kubernetes STIG assumes access to control-plane components that AWS manages in EKS. Applying the baseline unchanged can create checks that cannot be evaluated by a customer and findings that do not reflect the shared-responsibility model.",
      solution:
        "Built a Chef InSpec overlay that preserves the DISA Kubernetes STIG baseline while adding EKS-specific inputs, reusable helper resources, and documented exemptions for AWS-managed control-plane components.",
      process: [
        "Mapped baseline checks to the parts of EKS visible to the customer",
        "Added EKS-specific inputs and helper resources for portable control logic",
        "Inherited applicable upstream controls instead of copying the full baseline",
        "Documented exemptions where AWS owns the managed control-plane implementation",
      ],
      results: [
        "Made Kubernetes STIG assessment practical for Amazon EKS environments",
        "Kept applicable controls aligned with the upstream baseline through an overlay model",
        "Separated actionable findings from documented managed-service responsibilities",
        "Published the profile and its usage guidance as an open-source repository",
      ],
      architecture: {
        image: "/diagrams/kubernetes-stig-eks-overlay.png",
        alt: "Chef InSpec overlay architecture evaluating customer-managed EKS resources while documenting AWS-managed control-plane exemptions",
      },
      resources: { github: "https://github.com/Cwagne17/kubernetes-stig-baseline-eks-overlay" },
    },
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    title: "kube-raid",
    description:
      "Built a TypeScript Kubernetes offensive-security framework for controlled simulation of adversarial behavior using modular techniques mapped to MITRE ATT&CK.",
    technologies: ["TypeScript", "Kubernetes", "MITRE ATT&CK", "Red Team", "Container Security"],
    link: "https://github.com/Cwagne17/kube-raid",
    metrics: "ATT&CK-aligned • Modular techniques • Controlled simulation",
    gradient: "from-red-500 to-orange-500",
    slug: "kube-raid",
    caseStudy: {
      challenge:
        "Kubernetes security controls are difficult to validate with static configuration review alone. Teams also need safe, repeatable ways to exercise detections and observe how defensive controls respond to realistic cluster behaviors.",
      solution:
        "Built a TypeScript-based framework that represents Kubernetes adversary behaviors as modular, ATT&CK-aligned techniques. The design separates technique selection and execution so scenarios can be composed for authorized lab and validation environments.",
      process: [
        "Modeled Kubernetes-focused behaviors as discrete techniques with consistent interfaces",
        "Mapped modules to MITRE ATT&CK tactics and techniques for a shared security vocabulary",
        "Created an execution layer for selecting and running controlled scenarios",
        "Structured output so operators can connect simulated behavior to defensive observations",
      ],
      results: [
        "Created a reusable framework for Kubernetes security validation exercises",
        "Made individual adversary behaviors modular and easier to extend",
        "Connected technical simulations to the MITRE ATT&CK knowledge model",
        "Supported repeatable testing in explicitly authorized environments",
      ],
      architecture: {
        image: "/diagrams/kube-raid.png",
        alt: "kube-raid architecture showing a TypeScript CLI selecting ATT&CK-aligned modules and executing controlled Kubernetes simulations",
      },
      resources: { github: "https://github.com/Cwagne17/kube-raid" },
    },
  },
];
