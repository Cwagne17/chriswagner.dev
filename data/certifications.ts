import { Certification } from "@/types/certification";

const KCNA_BADGE_URL = "https://images.credly.com/size/110x110/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/KCNA_badge.png"
const SAFE_PRACTITIONER_BADGE_URL = "https://images.credly.com/size/110x110/images/08703175-4b43-4c72-9075-5c03a9ebe5d0/image.png"
const SOLUTIONS_ARCHITECT_BADGE_URL = "https://images.credly.com/size/110x110/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
const CLOUD_PRACTITIONER_BADGE_URL = "https://images.credly.com/size/110x110/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png";


export const certifications: Certification[] = [
    {
        title: "Kubernetes and Cloud Native Associate (KCNA)",
        issuer: "The Linux Foundation",
        date: "2025",
        link: "https://www.credly.com/earner/earned/badge/8c03cc54-f5bf-46db-890b-876266221bc7",
        badge: KCNA_BADGE_URL
    },
    {
        title: "Certified SAFe® 6 Practitioner",
        issuer: "Scaled Agile, Inc.",
        date: "2025",
        link: "https://www.credly.com/earner/earned/badge/8563e0ab-75b4-484b-9d5d-6a9e7df8b6f9",
        badge: SAFE_PRACTITIONER_BADGE_URL
    },
    {
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        link: "https://www.credly.com/earner/earned/badge/0bd30ee1-8a60-41a7-8a73-ed0b717c459e",
        date: "2024",
        badge: SOLUTIONS_ARCHITECT_BADGE_URL,
    },
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2023",
        link: "https://www.credly.com/earner/earned/badge/64905f3a-2035-4d22-80ac-b878950d0316",
        badge: CLOUD_PRACTITIONER_BADGE_URL,
    },
];