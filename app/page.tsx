"use client";

import About from "../components/About";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import FeaturedProjects from "../components/FeaturedProjects";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import type {
  Certification,
  Experience as ExperienceType,
} from "../types/iPortfolio";
import { featuredProjects } from "../data/projects";

export default function Home() {
  const certifications: Certification[] = [
    {
      title: "AWS Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      badge:
        "https://images.credly.com/size/110x110/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png",
    },
    {
      title: "AWS DevOps Engineer - Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      badge:
        "https://images.credly.com/size/110x110/images/bd31ef42-d460-493e-8503-39592aaf0458/image.png",
    },
    {
      title: "HashiCorp Terraform Associate",
      issuer: "HashiCorp",
      date: "2022",
      badge:
        "https://images.credly.com/size/110x110/images/99289602-861e-4929-8277-773e63a2fa6f/image.png",
    },
  ];


  const experience: ExperienceType[] = [
    {
      company: "Senior Cloud Engineer",
      role: "TechCorp Solutions",
      period: "2022 - Present",
      description:
        "Leading cloud infrastructure design and implementation for enterprise clients. Managing AWS environments serving 10M+ users daily.",
      achievements: [
        "Reduced infrastructure costs by 40% through optimization",
        "Implemented disaster recovery reducing RTO from 4 hours to 15 minutes",
        "Led team of 5 engineers in microservices migration",
      ],
    },
    {
      company: "DevOps Engineer",
      role: "StartupInc",
      period: "2020 - 2022",
      description:
        "Built and maintained CI/CD pipelines and cloud infrastructure. Established DevOps practices and security standards.",
      achievements: [
        "Implemented automated testing reducing bugs by 65%",
        "Designed scalable architecture supporting 500% growth",
        "Established security compliance meeting SOC 2 standards",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <About />
        <FeaturedProjects projects={featuredProjects} />
        <Certifications certifications={certifications} />
        <Experience experience={experience} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
