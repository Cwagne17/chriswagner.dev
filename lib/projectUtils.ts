import type { Project } from "@/types/project";
import { PROJECT_CATEGORY_GRADIENTS } from "@/lib/theme";

export type ProjectCategory = "Security" | "Cloud Infra" | "DevOps" | "Identity" | "VDI" | "Modernization";
export type Technology = "AWS" | "Kubernetes" | "Terraform" | "Docker" | "CircleCI" | "Ansible" | "TypeScript" | "Python" | "Go" | "GitHub";
export type SortOption = "impact" | "recent";

// Available technologies for filtering
export const AVAILABLE_TECHNOLOGIES: Technology[] = [
  "AWS",
  "Kubernetes",
  "Terraform",
  "Docker",
  "CircleCI",
  "Ansible",
  "TypeScript",
  "Python",
  "Go",
  "GitHub",
];

// Categorize projects based on keywords in title and technologies
export function categorizeProject(project: Project): ProjectCategory[] {
  const titleLower = project.title.toLowerCase();
  const techLower = project.technologies.join(" ").toLowerCase();
  const contentLower = titleLower + " " + techLower;

  const categories: ProjectCategory[] = [];

  if (contentLower.includes("stig") || contentLower.includes("compliance") || contentLower.includes("security") || contentLower.includes("scanning")) {
    categories.push("Security");
  }
  if (contentLower.includes("terraform") || contentLower.includes("iac") || contentLower.includes("infrastructure") || contentLower.includes("aws")) {
    categories.push("Cloud Infra");
  }
  if (contentLower.includes("devops") || contentLower.includes("ci/cd") || contentLower.includes("circleci") || contentLower.includes("automation")) {
    categories.push("DevOps");
  }
  if (contentLower.includes("saml") || contentLower.includes("sso") || contentLower.includes("identity") || contentLower.includes("federation")) {
    categories.push("Identity");
  }
  if (contentLower.includes("workspaces") || contentLower.includes("vdi") || contentLower.includes("desktop")) {
    categories.push("VDI");
  }
  if (contentLower.includes("moderniz") || contentLower.includes("container") || contentLower.includes("kubernetes") || contentLower.includes("windows")) {
    categories.push("Modernization");
  }

  // Return unique categories, with default if none found
  const unique = Array.from(new Set(categories));
  return unique.length > 0 ? unique : ["Cloud Infra"];
}

// Extract primary metric and stat pills from metrics string
export function extractMetrics(metricsString: string) {
  const parts = metricsString.split(" • ");
  
  if (parts.length === 0) {
    return {
      primary: "Notable Impact",
      statPills: [],
    };
  }

  // First part is the primary metric
  const primary = parts[0];
  
  // Convert remaining parts to stat pills
  const statPills = parts.slice(1, 3).map((part) => ({
    label: part,
    value: "",
  }));

  return {
    primary,
    statPills,
  };
}

// Get category color gradient
export function getCategoryColor(category: ProjectCategory): string {
  return PROJECT_CATEGORY_GRADIENTS[category] || "from-blue-500 to-cyan-500";
}

// Filter projects by categories
export function filterProjects(
  projects: Project[],
  selectedCategories: ProjectCategory[]
): Project[] {
  if (selectedCategories.length === 0) {
    return projects;
  }

  return projects.filter((project) => {
    const projectCategories = categorizeProject(project);
    return selectedCategories.some((cat) => projectCategories.includes(cat));
  });
}

// Sort projects
export function sortProjects(projects: Project[], sortBy: SortOption): Project[] {
  if (sortBy === "recent") {
    // Projects are ordered by index in data file (first = most recent)
    return projects;
  }

  if (sortBy === "impact") {
    // Sort by extracting first metric (numeric value)
    return [...projects].sort((a, b) => {
      const aMetric = extractMetrics(a.metrics).primary;
      const bMetric = extractMetrics(b.metrics).primary;

      // Extract numbers for comparison
      const aNum = parseInt(aMetric.match(/\d+/)?.[0] || "0");
      const bNum = parseInt(bMetric.match(/\d+/)?.[0] || "0");

      return bNum - aNum;
    });
  }

  return projects;
}

// Get featured projects (first 2)
export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.slice(0, 2);
}

// Get remaining projects (after featured)
export function getRemainingProjects(projects: Project[]): Project[] {
  return projects.slice(2);
}

// Filter projects by technologies
export function filterProjectsByTechnology(
  projects: Project[],
  selectedTechnologies: Technology[]
): Project[] {
  if (selectedTechnologies.length === 0) {
    return projects;
  }

  return projects.filter((project) => {
    const projectTechs = project.technologies.map(t => t.toLowerCase());
    return selectedTechnologies.some((tech) =>
      projectTechs.some(pt => pt.includes(tech.toLowerCase()))
    );
  });
}

// Search projects by title, metrics, technologies, and categories
export function searchProjects(
  projects: Project[],
  query: string
): Project[] {
  if (!query.trim()) {
    return projects;
  }

  const lowerQuery = query.toLowerCase();

  return projects.filter((project) => {
    const titleMatch = project.title.toLowerCase().includes(lowerQuery);
    const metricsMatch = project.metrics.toLowerCase().includes(lowerQuery);
    const technologiesMatch = project.technologies.some((tech) =>
      tech.toLowerCase().includes(lowerQuery)
    );
    const categoriesMatch = categorizeProject(project).some((cat) =>
      cat.toLowerCase().includes(lowerQuery)
    );

    return titleMatch || metricsMatch || technologiesMatch || categoriesMatch;
  });
}

// Combined filter function
export function filterAndSearchProjects(
  projects: Project[],
  options: {
    categories?: ProjectCategory[];
    technologies?: Technology[];
    searchQuery?: string;
  }
): Project[] {
  let result = projects;

  if (options.categories && options.categories.length > 0) {
    result = filterProjects(result, options.categories);
  }

  if (options.technologies && options.technologies.length > 0) {
    result = filterProjectsByTechnology(result, options.technologies);
  }

  if (options.searchQuery) {
    result = searchProjects(result, options.searchQuery);
  }

  return result;
}
