"use client";

import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import type { ProjectCategory, Technology, SortOption } from "@/lib/projectUtils";
import { AVAILABLE_TECHNOLOGIES } from "@/lib/projectUtils";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: ProjectCategory[];
  selectedTechnologies: Technology[];
  onCategoryToggle: (category: ProjectCategory) => void;
  onTechnologyToggle: (technology: Technology) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

const CATEGORIES: ProjectCategory[] = ["Security", "Cloud Infra", "DevOps", "Identity", "VDI", "Modernization"];

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategories,
  selectedTechnologies,
  onCategoryToggle,
  onTechnologyToggle,
  sortBy,
  onSortChange,
}: SearchAndFiltersProps) {
  const [showTechFilters, setShowTechFilters] = useState(false);

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input + Sort */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search case studies…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:border-blue-500/50 focus:outline-none transition-colors text-foreground text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTechFilters(!showTechFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-blue-500/50 transition-colors whitespace-nowrap text-sm font-medium"
          >
            Sort: {sortBy === "impact" ? "Most Impact" : "Most Recent"}
            <ChevronDown className="h-4 w-4" />
          </button>

          {showTechFilters && (
            <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
              <button
                onClick={() => {
                  onSortChange("impact");
                  setShowTechFilters(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                  sortBy === "impact"
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                Most Impact
              </button>
              <button
                onClick={() => {
                  onSortChange("recent");
                  setShowTechFilters(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                  sortBy === "recent"
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                Most Recent
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Topic Filters */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Topic
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryToggle(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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
      </div>

      {/* Technology Filters */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Technologies
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TECHNOLOGIES.map((tech) => {
            const isSelected = selectedTechnologies.includes(tech);
            return (
              <motion.button
                key={tech}
                onClick={() => onTechnologyToggle(tech)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-purple-500/20 border border-purple-500/50 text-purple-400"
                    : "bg-secondary/50 border border-border text-muted-foreground hover:border-purple-500/30"
                }`}
              >
                {tech}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
