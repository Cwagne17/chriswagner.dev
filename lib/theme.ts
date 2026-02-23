type ProjectCategory = "Security" | "Cloud Infra" | "DevOps" | "Identity" | "VDI" | "Modernization";

export const THEME_CLASSES = {
  gradient: {
    brand: "from-blue-500 to-purple-500",
    brandSoft: "from-blue-500/10 to-purple-500/10",
    brandSubtle: "from-blue-500/5 to-purple-500/5",
    blueCyan: "from-blue-500 to-cyan-500",
  },
  text: {
    brand: "text-blue-500",
    brandStrong: "text-blue-400",
  },
  border: {
    brandSoft: "border-blue-500/20",
    brandMedium: "border-blue-500/50",
  },
  bg: {
    brandSoft: "bg-blue-500/10",
  },
} as const;

export const PROJECT_CATEGORY_GRADIENTS: Record<ProjectCategory, string> = {
  Security: "from-red-500 to-pink-500",
  "Cloud Infra": "from-orange-500 to-yellow-500",
  DevOps: "from-green-500 to-emerald-500",
  Identity: "from-purple-500 to-pink-500",
  VDI: "from-cyan-500 to-blue-500",
  Modernization: "from-blue-500 to-purple-500",
};
