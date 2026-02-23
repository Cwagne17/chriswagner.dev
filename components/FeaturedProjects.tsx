"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { THEME_CLASSES } from "@/lib/theme";
import { Button } from "./ui";
import { ProjectCarousel } from "./hero/ProjectCarousel";
import type { Project } from "../types/project";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20 relative">
      {/* Background accent */}
      <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${THEME_CLASSES.gradient.brandSubtle} rounded-full blur-3xl`}></div>

      <div className="max-w-[1600px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className={`w-16 h-1 bg-gradient-to-r ${THEME_CLASSES.gradient.brand} rounded-full`} />
        </motion.div>

        {/* Project Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ProjectCarousel projects={projects} />
        </motion.div>

        {/* See All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <Button size="lg" rightIcon={ExternalLink}>
              Explore All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
