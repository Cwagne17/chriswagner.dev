import { Experience as ExperienceType } from "@/types/experience";

export const experiences: ExperienceType[] = [
    {
        company: "NAVSUP Business Systems Center",
        role: "Cloud Engineer",
        period: "Jun 2022 - Present",
        description: "At NAVSUP, I work with multiple application teams to help them architect and implement Infrastructure as Code (IaC) and Compliance as Code (CaC). My focus is on modernizing legacy systems, automating compliance, and enabling teams to adopt containerized, cloud-native solutions with agility.",
        achievements: [
            "Automated STIG compliance using CaC, reducing manual effort by 90 minutes per host that required hardening.",
            "Cut environment setup time from 1 month to less than 1 day, introducing a self-service model where teams can provision without needing to create a ticket.",
            "Guided application teams in re-platforming workloads to containers and cloud-native databases, reducing overhead management through standardized IaC and CaC practices.",
        ],
    },
    {
        company: "SecurEd Inc.",
        role: "Platform Engineer",
        period: "Oct 2020 - Present",
        description:
            "At SecurEd, I lead initiatives to integrate security into development pipelines and architect cloud infrastructure that is both secure and efficient. My role spans automation, monitoring, and enabling the development team with reliable environments.",
        achievements: [
            "Introduced Terraform IaC across the portfolio, creating reusable modules that allowed the team to spin up a full staging environment in ~7 minutes, resulting in significant cost savings by running environments on-demand.",
            "Developed a standardized CircleCI orb used across 80+ repositories, reducing management effort by centralizing pipeline updates and ensuring consistent CI/CD practices.",
            "Led the modernization of access management by integrating SAML2 SSO with our existing IdP across SaaS tools and AWS, centralizing permissions and improving security posture.",
        ],
    },
];