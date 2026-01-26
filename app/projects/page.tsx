"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SectionHeader, ProjectCard } from "@/components/ui";
import { allProjects } from "../../data/projects";

export default function ProjectsPage() {
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
              className="mb-16"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              
              <SectionHeader
                eyebrow="Portfolio"
                title="All Projects"
                subtitle="Explore my complete portfolio of cloud infrastructure projects, DevOps implementations, and enterprise solutions."
                align="center"
                index="01"
              />
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {allProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  impact={project.metrics}
                  href={`/projects/${project.slug}`}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
