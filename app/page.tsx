"use client";

import Experience from "@/components/Experience";
import { MetricsStrip } from "@/components/ui/MetricsStrip";
import { certifications } from "@/data/certifications";
import { experiences } from "@/data/experiences";
import About from "../components/About";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import FeaturedProjects from "../components/FeaturedProjects";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { featuredProjects } from "../data/projects";

export default function Home() {
  const metrics = [
    { number: "5+", label: "Years", descriptor: "Cloud platforms" },
    { number: "EKS", label: "Kubernetes", descriptor: "Platform engineering" },
    { number: "IaC", label: "Automation", descriptor: "CDK + Terraform" },
    { number: "Policy", label: "Compliance", descriptor: "Audit-ready systems" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <MetricsStrip metrics={metrics} />
        <About />
        <FeaturedProjects projects={featuredProjects} />
        <Certifications certifications={certifications} />
        <Experience experience={experiences} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
