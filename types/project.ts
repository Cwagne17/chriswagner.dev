// Technology constants for standardization
export const TECHNOLOGIES = {
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

export type Technology = typeof TECHNOLOGIES[keyof typeof TECHNOLOGIES];

export const PROJECT_STATUS = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

// Gradient options for projects
export const PROJECT_GRADIENTS = [
    "from-blue-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-600",
    "from-sky-500 to-indigo-500",
    "from-purple-500 to-pink-500",
    "from-slate-500 to-zinc-600",
    "from-blue-600 to-violet-600",
    "from-red-500 to-pink-500",
    "from-green-500 to-blue-500",
    "from-yellow-500 to-red-500"
] as const;

export type ProjectGradient = typeof PROJECT_GRADIENTS[number];

export interface ProjectAssets {
    architecture?: {
        key: string;
        alt: string;
    };
}

export interface Project {
    title: string;
    slug: string;
    description: string;
    technologies: Technology[];
    metrics?: string;
    // STAR Model fields
    situation?: string;
    task?: string;
    actions?: string[];
    results?: string[];
    // Assets
    assets?: ProjectAssets;
    // Optional links
    githubUrl?: string;
    // Status and timestamp
    status: ProjectStatus;
    updatedAt?: string;
}

// Helper function to get gradient for a project
export const getProjectGradient = (slug: string): ProjectGradient => {
    // Use slug to deterministically assign a gradient
    const hash = slug.split('').reduce((a, b) => {
        a = ((a << 5) - a) + (b.codePointAt(0) || 0);
        return a & a;
    }, 0);
    const index = Math.abs(hash) % PROJECT_GRADIENTS.length;
    return PROJECT_GRADIENTS[index];
};