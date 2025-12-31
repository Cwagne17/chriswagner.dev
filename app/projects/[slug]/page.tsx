"use client";

import type { Schema } from "@/amplify/data/resource";
import { Status } from "@/amplify/data/resource";
import { getProjectGradient, Project } from "@/types/project";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "aws-amplify/storage";
import { ArrowLeft, Github } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

const client = generateClient<Schema>();

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [architectureImageUrl, setArchitectureImageUrl] = useState<string>("");

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      const { data } = await client.models.Project.list({
        filter: {
          slug: { eq: slug },
          status: { eq: Status.PUBLISHED },
        },
      });

      if (data.length > 0) {
        const projectData = data[0] as Project;
        setProject(projectData);

        // Get architecture image URL if it exists
        if (projectData.assets?.architecture?.key) {
          try {
            const { url } = await getUrl({
              key: projectData.assets.architecture.key,
            });
            setArchitectureImageUrl(url.toString());
          } catch (error) {
            console.error("Error getting architecture image URL:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Loading project...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Header Section */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>

              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {project.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies?.map((tech) => (
                  <span
                    key={`${project.slug}-tech-${tech}`}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.githubUrl && (
                <div className="grid md:grid-cols-1 gap-4 mb-8">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-blue-500/20 transition-all"
                  >
                    <Github className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">View Code</span>
                  </a>
                </div>
              )}

              {project.metrics && (
                <div
                  className={`p-4 bg-gradient-to-r ${getProjectGradient(project.slug)} bg-opacity-10 rounded-lg border border-border/50`}
                >
                  <p className="font-semibold text-lg">{project.metrics}</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Situation Section */}
        {project.situation && (
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  The Situation
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.situation}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Task Section */}
        {project.task && (
          <section className="py-16 px-6 bg-secondary/20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  The Task
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.task}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Architecture Section */}
        {architectureImageUrl && (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Architecture
                </h2>
                <div className="bg-card rounded-lg p-8 border border-border">
                  <div className="relative w-full">
                    <img
                      src={architectureImageUrl}
                      alt={
                        project.assets?.architecture?.alt ||
                        "Architecture diagram"
                      }
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  {project.assets?.architecture?.alt && (
                    <p className="text-center text-muted-foreground mt-4">
                      {project.assets.architecture.alt}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Actions Section */}
        {project.actions && project.actions.length > 0 && (
          <section className="py-16 px-6 bg-secondary/20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  Actions Taken
                </h2>
                <div className="space-y-6">
                  {project.actions.map((action, index) => (
                    <motion.div
                      key={`${project.slug}-action-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-1">
                        {action}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {project.results && project.results.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  Results & Impact
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={`${project.slug}-result-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-lg p-6 border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground leading-relaxed">
                          {result}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Remove the Resources Section since downloads are no longer needed */}
      </main>

      <Footer />
    </div>
  );
}
