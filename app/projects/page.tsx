"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CaseStudyCard } from "@/components/ui";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { FilterChips } from "@/components/FilterChips";
import { allProjects } from "../../data/projects";
import {
  categorizeProject,
  extractMetrics,
  getCategoryColor,
  filterAndSearchProjects,
  type ProjectCategory,
  type Technology,
} from "@/lib/projectUtils";
import { THEME_CLASSES } from "@/lib/theme";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);

  // Filter and search projects (project data order is most recent first)
  const filteredProjects = useMemo(() => {
    return filterAndSearchProjects(allProjects, {
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      technologies: selectedTechnologies.length > 0 ? selectedTechnologies : undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [searchQuery, selectedCategories, selectedTechnologies]);

  const handleCategoryToggle = (category: ProjectCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTechnologyToggle = (technology: Technology) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology)
        ? prev.filter((t) => t !== technology)
        : [...prev, technology]
    );
  };

  const handleRemoveCategory = (category: ProjectCategory) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const handleRemoveTechnology = (technology: Technology) => {
    setSelectedTechnologies((prev) => prev.filter((t) => t !== technology));
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTechnologies([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="py-12 px-6 relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${THEME_CLASSES.gradient.brandSubtle}`}>
            <div className={`absolute top-1/4 left-1/4 w-72 h-72 ${THEME_CLASSES.bg.brandSoft} rounded-full blur-3xl animate-pulse`}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${THEME_CLASSES.bg.brandSoft} rounded-full blur-3xl animate-pulse delay-1000`}></div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-[color:var(--primary)] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Case Studies
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Search, Filters & Grid */}
        <section className="py-16 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Search & Filters */}
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategories={selectedCategories}
              selectedTechnologies={selectedTechnologies}
              onCategoryToggle={handleCategoryToggle}
              onTechnologyToggle={handleTechnologyToggle}
            />

            {/* Active Filters Chips */}
            <AnimatePresence>
              <FilterChips
                selectedCategories={selectedCategories}
                selectedTechnologies={selectedTechnologies}
                onRemoveCategory={handleRemoveCategory}
                onRemoveTechnology={handleRemoveTechnology}
                onClearAll={handleClearAll}
              />
            </AnimatePresence>

            {/* Results Count */}
            {(searchQuery || selectedCategories.length > 0 || selectedTechnologies.length > 0) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground mb-6"
              >
                Found {filteredProjects.length} case {filteredProjects.length === 1 ? "study" : "studies"}
              </motion.p>
            )}

            {/* Case Studies Grid */}
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                >
                  {filteredProjects.map((project, index) => {
                    const categories = categorizeProject(project);
                    const { primary, statPills } = extractMetrics(project.metrics);
                    const categoryColor = getCategoryColor(categories[0]);
                    const primaryTopic = categories[0];
                    const metricsDisplay = [primary, ...statPills.map((pill) => pill.label)]
                      .slice(0, 2)
                      .map((item) => {
                        const parts = item.trim().split(/\s+/);

                        if (parts[0] === "<" || parts[0] === ">") {
                          return {
                            value: `${parts[0]} ${parts[1] ?? ""}`.trim(),
                            label: parts.slice(2).join(" "),
                          };
                        }

                        return {
                          value: parts[0] ?? "",
                          label: parts.slice(1).join(" "),
                        };
                      });

                    return (
                      <CaseStudyCard
                        key={project.slug}
                        title={project.title}
                        metrics={metricsDisplay}
                        technologies={project.technologies.slice(0, 10)}
                        thumbnailImage={project.caseStudy?.architecture?.image}
                        thumbnailAlt={project.caseStudy?.architecture?.alt}
                        topicBadge={primaryTopic}
                        topicColor={categoryColor}
                        href={`/projects/${project.slug}`}
                        index={index}
                      />
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <p className="text-muted-foreground mb-6 text-lg">
                    No case studies found matching your filters.
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="px-4 py-2 rounded-lg bg-[color:var(--primary)] hover:bg-[color:var(--accent-hover)] text-white text-sm font-medium transition-colors"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
