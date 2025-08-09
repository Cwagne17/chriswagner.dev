export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badge: string;
}

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

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  [key: string]: string;
}
