"use client";

import { Search, ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Technology } from "@/lib/projectUtils";
import { THEME_CLASSES } from "@/lib/theme";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableTechnologies: Technology[];
  selectedTechnologies: Technology[];
  onTechnologyToggle: (technology: Technology) => void;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  availableTechnologies,
  selectedTechnologies,
  onTechnologyToggle,
}: SearchAndFiltersProps) {
  const [showTechFilters, setShowTechFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
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
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:border-[color:var(--accent-border-medium)] focus:outline-none transition-colors text-foreground text-sm"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowTechFilters(!showTechFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-[color:var(--accent-border-medium)] transition-colors whitespace-nowrap text-sm font-medium"
          >
            Technologies {selectedTechnologies.length > 0 ? `(${selectedTechnologies.length})` : ""}
            <ChevronDown className="h-4 w-4" />
          </button>

          {showTechFilters && (
            <div className="absolute right-0 top-full mt-2 min-w-[220px] max-h-72 overflow-auto bg-card border border-border rounded-lg shadow-lg z-20">
              {availableTechnologies.map((tech) => {
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
