"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { THEME_CLASSES } from "@/lib/theme";
import type { ProjectCategory, Technology } from "@/lib/projectUtils";

interface FilterChipsProps {
  selectedCategories: ProjectCategory[];
  selectedTechnologies: Technology[];
  onRemoveCategory: (category: ProjectCategory) => void;
  onRemoveTechnology: (technology: Technology) => void;
  onClearAll: () => void;
}

export function FilterChips({
  selectedCategories,
  selectedTechnologies,
  onRemoveCategory,
  onRemoveTechnology,
  onClearAll,
}: FilterChipsProps) {
  const hasFilters = selectedCategories.length > 0 || selectedTechnologies.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-secondary/30 rounded-lg border border-border/50"
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Active filters:
      </span>

      {selectedCategories.map((category) => (
        <motion.button
          key={category}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          onClick={() => onRemoveCategory(category)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${THEME_CLASSES.bg.brandSoft} border ${THEME_CLASSES.border.brandMedium} ${THEME_CLASSES.text.brandStrong} hover:brightness-110 transition-all text-xs font-medium`}
        >
          {category}
          <X className="h-3 w-3" />
        </motion.button>
      ))}

      {selectedTechnologies.map((tech) => (
        <motion.button
          key={tech}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          onClick={() => onRemoveTechnology(tech)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${THEME_CLASSES.bg.brandSoft} border ${THEME_CLASSES.border.brandMedium} ${THEME_CLASSES.text.brandStrong} hover:brightness-110 transition-all text-xs font-medium`}
        >
          {tech}
          <X className="h-3 w-3" />
        </motion.button>
      ))}

      {hasFilters && (
        <button
          onClick={onClearAll}
          className="ml-2 px-3 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all
        </button>
      )}
    </motion.div>
  );
}
