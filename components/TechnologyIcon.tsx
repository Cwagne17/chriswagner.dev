interface TechnologyIconProps {
  technology: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Mapping of technology names to their CDN icon URLs
const TECH_ICON_URLS: Record<string, string> = {
  // Cloud Platforms
  AWS: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "AWS CDK": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "AWS S3": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "AWS Managed AD": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "AWS Service Catalog": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "Amazon WorkSpaces": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "Amazon S3": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",

  // Container & Orchestration
  Docker: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/docker.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/kubernetes.svg",
  Containers: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/docker.svg",

  // Infrastructure & DevOps
  Terraform: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/terraform.svg",
  Ansible: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ansible.svg",
  "Infrastructure as Code": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/terraform.svg",
  "Compliance as Code": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/terraform.svg",

  // Programming Languages
  TypeScript: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/typescript.svg",
  Go: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/golang.svg",
  Golang: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/golang.svg",
  Python: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/python.svg",

  // CI/CD & VCS
  GitHub: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github.svg",
  CircleCI: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/circleci.svg",
  "CircleCI Orbs": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/circleci.svg",
  "CI/CD": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/circleci.svg",

  // Databases
  "Managed Databases": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mongodb.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mongodb.svg",

  // Security & Identity
  "SAML 2.0": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/auth0.svg",
  "Single Sign-On": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/auth0.svg",
  SSO: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/auth0.svg",
  "Identity Provider": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/auth0.svg",
  IDP: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/auth0.svg",
  "Access Control": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/auth0.svg",
  "Security Scanning": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/snyk.svg",

  // Architecture Patterns
  Serverless: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  "Event-Driven Architecture": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/aws.svg",
  Microservices: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/docker.svg",

  // Operations & Monitoring
  Automation: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ansible.svg",
  "Automated Testing": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github.svg",
  Monitoring: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prometheus.svg",
  Observability: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/prometheus.svg",
};

export function TechnologyIcon({ technology, size = "md", className = "" }: TechnologyIconProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const iconUrl = TECH_ICON_URLS[technology] || TECH_ICON_URLS.AWS;

  return (
    <img
      src={iconUrl}
      alt={technology}
      className={`${sizeMap[size]} ${className}`}
      title={technology}
      loading="lazy"
    />
  );
}
