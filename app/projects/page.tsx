"use client";

import type { Schema } from "@/amplify/data/resource";
import { Status } from "@/amplify/data/resource";
import { Project } from "@/types/project";
import { generateClient } from "aws-amplify/data";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const client = generateClient<Schema>();

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await client.models.Project.list({
        filter: {
          status: {
            eq: Status.PUBLISHED,
          },
        },
      });
      setProjects(data as Project[]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Header Section */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight pb-2">
                All Projects
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore my complete portfolio of cloud infrastructure projects,
                DevOps implementations, and enterprise solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className="max-w-7xl mx-auto">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No published projects found.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {projects.map((project, index) => {
                  const gradient = getProjectGradient(project.slug);
                  return (
                    <Link href={`/projects/${project.slug}`} key={project.slug}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-card rounded-lg p-6 border border-border hover:border-border/60 transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                          >
                            <Code2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                            <ExternalLink className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-xl mb-3">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies?.map((tech, techIndex) => (
                              <span
                                key={`${project.slug}-tech-${techIndex}`}
                                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded border border-border/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {project.metrics && (
                          <p
                            className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mt-auto`}
                          >
                            {project.metrics}
                          </p>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
