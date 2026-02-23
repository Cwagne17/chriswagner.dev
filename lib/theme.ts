type ProjectCategory = "Security" | "Cloud Infra" | "DevOps" | "Identity" | "VDI" | "Modernization";

export const THEME_CLASSES = {
  gradient: {
    brand: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
    brandSoft: "from-[color:var(--accent-soft)] to-[color:var(--accent-soft)]",
    brandSubtle: "from-[color:var(--accent-soft)] to-transparent",
    blueCyan: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
  },
  text: {
    brand: "text-[color:var(--primary)]",
    brandStrong: "text-[color:var(--accent-hover)]",
  },
  border: {
    brandSoft: "border-[color:var(--accent-border-soft)]",
    brandMedium: "border-[color:var(--accent-border-medium)]",
  },
  bg: {
    brandSoft: "bg-[color:var(--accent-soft)]",
  },
} as const;

export const PROJECT_CATEGORY_GRADIENTS: Record<ProjectCategory, string> = {
  Security: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
  "Cloud Infra": "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
  DevOps: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
  Identity: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
  VDI: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
  Modernization: "from-[color:var(--primary)] to-[color:var(--accent-hover)]",
};
