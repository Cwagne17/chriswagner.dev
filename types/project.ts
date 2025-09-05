export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    metrics: string;
    gradient: string;
    slug: string;
    caseStudy: {
        challenge: string;
        solution: string;
        process: string[];
        results: string[];
        architecture: {
            image: string;
            alt: string;
        };
        resources: {
            github?: string;
            download?: {
                title: string;
                url: string;
                description: string;
            };
            demo?: string;
        };
    };
}