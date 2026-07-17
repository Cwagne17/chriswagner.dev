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
  filterAndSearchProjects,
  type Technology,
} from "@/lib/projectUtils";
import { THEME_CLASSES } from "@/lib/theme";

const AVAILABLE_TECHNOLOGIES = Array.from(
  new Set(allProjects.flatMap((project) => project.technologies)),
).sort((a, b) => a.localeCompare(b));

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);

  // Filter and search projects (project data order is most recent first)
  const filteredProjects = useMemo(() => {
    return filterAndSearchProjects(allProjects, {
      technologies: selectedTechnologies.length > 0 ? selectedTechnologies : undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [searchQuery, selectedTechnologies]);

  const handleTechnologyToggle = (technology: Technology) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology)
        ? prev.filter((t) => t !== technology)
        : [...prev, technology]
    );
  };

  const handleRemoveTechnology = (technology: Technology) => {
    setSelectedTechnologies((prev) => prev.filter((t) => t !== technology));
  };

  const handleClearAll = () => {
    setSearchQuery("");
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
              availableTechnologies={AVAILABLE_TECHNOLOGIES}
              selectedTechnologies={selectedTechnologies}
              onTechnologyToggle={handleTechnologyToggle}
            />

            {/* Active Filters Chips */}
            <AnimatePresence>
              <FilterChips
                selectedTechnologies={selectedTechnologies}
                onRemoveTechnology={handleRemoveTechnology}
                onClearAll={handleClearAll}
              />
            </AnimatePresence>

            {/* Results Count */}
            {(searchQuery || selectedTechnologies.length > 0) && (
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
                  {filteredProjects.map((project, index) => (
                      <CaseStudyCard
                        key={project.slug}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies.slice(0, 10)}
                        thumbnailImage={project.caseStudy?.architecture?.image}
                        thumbnailAlt={project.caseStudy?.architecture?.alt}
                        href={`/projects/${project.slug}`}
                        index={index}
                      />
                  ))}
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
                    className="px-4 py-2 rounded-lg bg-[color:var(--button-primary)] hover:bg-[color:var(--button-primary-hover)] text-white text-sm font-medium transition-colors"
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
