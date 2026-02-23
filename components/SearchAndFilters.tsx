"use client";

import { Search, ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectCategory, Technology } from "@/lib/projectUtils";
import { AVAILABLE_TECHNOLOGIES } from "@/lib/projectUtils";
import { THEME_CLASSES } from "@/lib/theme";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: ProjectCategory[];
  selectedTechnologies: Technology[];
  onCategoryToggle: (category: ProjectCategory) => void;
  onTechnologyToggle: (technology: Technology) => void;
}

const CATEGORIES: ProjectCategory[] = ["Security", "Cloud Infra", "DevOps", "Identity", "VDI", "Modernization"];

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategories,
  selectedTechnologies,
  onCategoryToggle,
  onTechnologyToggle,
}: SearchAndFiltersProps) {
  const [showTopicFilters, setShowTopicFilters] = useState(false);
  const [showTechFilters, setShowTechFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setShowTopicFilters(false);
        setShowTechFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8" ref={containerRef}>
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

        <div className="relative">
          <button
            onClick={() => {
              setShowTopicFilters(!showTopicFilters);
              setShowTechFilters(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-blue-500/50 transition-colors whitespace-nowrap text-sm font-medium"
          >
            Topic {selectedCategories.length > 0 ? `(${selectedCategories.length})` : ""}
            <ChevronDown className="h-4 w-4" />
          </button>

          {showTopicFilters && (
            <div className="absolute right-0 top-full mt-2 min-w-[220px] bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => onCategoryToggle(category)}
                    className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? `${THEME_CLASSES.bg.brandSoft} ${THEME_CLASSES.text.brandStrong}`
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{category}</span>
                    {isSelected && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowTechFilters(!showTechFilters);
              setShowTopicFilters(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-blue-500/50 transition-colors whitespace-nowrap text-sm font-medium"
          >
            Technologies {selectedTechnologies.length > 0 ? `(${selectedTechnologies.length})` : ""}
            <ChevronDown className="h-4 w-4" />
          </button>

          {showTechFilters && (
            <div className="absolute right-0 top-full mt-2 min-w-[220px] max-h-72 overflow-auto bg-card border border-border rounded-lg shadow-lg z-20">
              {AVAILABLE_TECHNOLOGIES.map((tech) => {
                const isSelected = selectedTechnologies.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => onTechnologyToggle(tech)}
                    className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? `${THEME_CLASSES.bg.brandSoft} ${THEME_CLASSES.text.brandStrong}`
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{tech}</span>
                    {isSelected && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
