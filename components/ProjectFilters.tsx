"use client";

import { motion } from "motion/react";
import type { ProjectCategory, SortOption } from "@/lib/projectUtils";

interface ProjectFiltersProps {
  selectedCategories: ProjectCategory[];
  sortBy: SortOption;
  onCategoryToggle: (category: ProjectCategory) => void;
  onSortChange: (sortBy: SortOption) => void;
}

const CATEGORIES: ProjectCategory[] = ["Security", "Cloud Infra", "DevOps", "Identity", "VDI", "Modernization"];
const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Most Impact", value: "impact" },
  { label: "Most Recent", value: "recent" },
];

export function ProjectFilters({
  selectedCategories,
  sortBy,
  onCategoryToggle,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 space-y-4"
    >
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <motion.button
              key={category}
              onClick={() => onCategoryToggle(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-blue-500/20 border border-blue-500/50 text-blue-400"
                  : "bg-secondary/50 border border-border text-muted-foreground hover:border-blue-500/30"
              }`}
            >
              {category}
            </motion.button>
          );
        })}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sort:</span>
        <div className="flex gap-2">
          {SORT_OPTIONS.map((option) => {
            const isActive = sortBy === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
