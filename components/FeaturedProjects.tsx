"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ProjectCard, Button } from "./ui";
import type { Project } from "../types/project";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

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
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.div>

        {/* Asymmetric Grid: 1 large + 2 smaller */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Large Featured Project */}
          {projects[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:row-span-2"
            >
              <ProjectCard
                title={projects[0].title}
                description={projects[0].description}
                technologies={projects[0].technologies}
                impact={projects[0].metrics}
                href={`/projects/${projects[0].slug}`}
                index={0}
                thumbnail
                featured
              />
            </motion.div>
          )}

          {/* Smaller Projects */}
          <div className="grid gap-8">
            {projects.slice(1, 3).map((project, index) => (
              <ProjectCard
                key={index + 1}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                impact={project.metrics}
                href={`/projects/${project.slug}`}
                index={index + 1}
              />
            ))}
          </div>
        </div>

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
