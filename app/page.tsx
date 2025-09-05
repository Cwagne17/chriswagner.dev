"use client";

import Experience from "@/components/Experience";
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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
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
