"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import type { Project } from "@/types/project";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setAutoRotate(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setAutoRotate(false);
  };

  // Resume auto-rotation after user interaction
  useEffect(() => {
    if (!autoRotate) {
      const resumeTimer = setTimeout(() => {
        setAutoRotate(true);
      }, 8000); // Resume after 8 seconds of inactivity

      return () => clearTimeout(resumeTimer);
    }
  }, [autoRotate]);

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [autoRotate, projects.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setAutoRotate(false);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative aspect-video bg-secondary/30 rounded-lg overflow-hidden border border-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* Make entire slide clickable */}
            <Link
              href={`/projects/${currentProject.slug}`}
              className="absolute inset-0 flex flex-col justify-between cursor-pointer group"
            >
              {/* Diagram Area - Largest Element */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full bg-secondary border border-border/50 flex items-center justify-center group-hover:border-border transition-colors">
                  <div className="text-center">
                    <div className="text-muted-foreground text-sm mb-2">Architecture Diagram</div>
                    {currentProject.caseStudy?.architecture?.image && (
                      <img
                        src={currentProject.caseStudy.architecture.image}
                        alt={currentProject.caseStudy.architecture.alt}
                        className="max-w-xs max-h-48 mx-auto"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Section - Title, Metrics */}
              <div className="space-y-4 p-8 md:p-12 text-center">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentProject.title}
                </h3>

                {/* Metrics */}
                {currentProject.metrics && (
                  <div className="flex flex-wrap gap-6 justify-center text-sm font-medium text-muted-foreground">
                    {currentProject.metrics.split(" • ").map((metric, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none p-4">
          <button
            onClick={handlePrevious}
            className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-accent w-8"
                : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to project ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
