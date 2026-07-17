import type { Project } from "@/types/project";

export type Technology = string;
export type SortOption = "impact" | "recent";

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

// Search projects by title, description, metrics, and technologies
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
    const descriptionMatch = project.description.toLowerCase().includes(lowerQuery);
    const metricsMatch = project.metrics.toLowerCase().includes(lowerQuery);
    const technologiesMatch = project.technologies.some((tech) =>
      tech.toLowerCase().includes(lowerQuery)
    );
    return titleMatch || descriptionMatch || metricsMatch || technologiesMatch;
  });
}

// Combined filter function
export function filterAndSearchProjects(
  projects: Project[],
  options: {
    technologies?: Technology[];
    searchQuery?: string;
  }
): Project[] {
  let result = projects;

  if (options.technologies && options.technologies.length > 0) {
    result = filterProjectsByTechnology(result, options.technologies);
  }

  if (options.searchQuery) {
    result = searchProjects(result, options.searchQuery);
  }

  return result;
}
