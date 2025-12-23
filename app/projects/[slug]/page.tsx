"use client";

import { ArrowLeft, Download, ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { allProjects } from "../../../data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = allProjects.find((p) => p.slug === slug);

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
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.caseStudy.resources?.github || project.caseStudy.resources?.demo || project.caseStudy.resources?.download) && (
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {project.caseStudy.resources?.github && (
                    <a
                      href={project.caseStudy.resources.github}
                      className="flex items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-blue-500/20 transition-all"
                    >
                      <Github className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">View Code</span>
                    </a>
                  )}
                  {project.caseStudy.resources?.demo && (
                    <a
                      href={project.caseStudy.resources.demo}
                      className="flex items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-blue-500/20 transition-all"
                    >
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}
                  {project.caseStudy.resources?.download && (
                    <a
                      href={project.caseStudy.resources.download.url}
                      className="flex items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-blue-500/20 transition-all"
                    >
                      <Download className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Download</span>
                    </a>
                  )}
                </div>
              )}

              <div
                className={`p-4 bg-gradient-to-r ${project.gradient} bg-opacity-10 rounded-lg border border-border/50`}
              >
                <p className="font-semibold text-lg">{project.metrics}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                The Challenge
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 px-6 bg-secondary/20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                The Solution
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Architecture Section */}
        {project.caseStudy.architecture?.image && (
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
                  <div className="relative w-full h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg flex items-center justify-center">
                    {/* Placeholder for architecture diagram */}
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                        <ExternalLink className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">
                        {project.caseStudy.architecture.alt}
                      </p>
                      <p className="text-sm text-muted-foreground/60 mt-2">
                        Architecture diagram would be displayed here
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Process Section */}
        <section className="py-16 px-6 bg-secondary/20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Implementation Process
              </h2>
              <div className="space-y-6">
                {project.caseStudy.process.map((step, index) => (
                  <motion.div
                    key={index}
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
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
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
                {project.caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
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

        {/* Resources Section */}
        {project.caseStudy.resources?.download && (
          <section className="py-16 px-6 bg-secondary/20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  Additional Resources
                </h2>
                <div className="bg-card rounded-lg p-8 border border-border">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Download className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">
                        {project.caseStudy.resources.download.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.caseStudy.resources.download.description}
                      </p>
                      <a
                        href={project.caseStudy.resources.download.url}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                      >
                        Download PDF
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
