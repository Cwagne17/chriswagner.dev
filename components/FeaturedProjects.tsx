"use client";

import { Code2, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Project } from "../types/contact-form";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Showcasing cloud architecture and infrastructure solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-6 border border-border hover:border-border/60 transition-all hover:shadow-lg group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                  >
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-semibold text-xl mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p
                  className={`text-sm font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                >
                  {project.metrics}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* See All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
          >
            Explore All Projects
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
