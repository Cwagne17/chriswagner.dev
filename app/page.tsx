"use client";

import {
  Award,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const certifications = [
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

  const projects = [
    {
      title: "Multi-Region AWS Infrastructure",
      description:
        "Designed and implemented a highly available, multi-region AWS infrastructure using Terraform, supporting 99.99% uptime for critical applications.",
      technologies: [
        "AWS",
        "Terraform",
        "CloudFormation",
        "Docker",
        "Kubernetes",
      ],
      link: "https://github.com",
      metrics: "99.99% uptime, 50% cost reduction",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "CI/CD Pipeline Automation",
      description:
        "Built comprehensive CI/CD pipelines using GitHub Actions and AWS CodePipeline, reducing deployment time by 80% and eliminating manual errors.",
      technologies: [
        "GitHub Actions",
        "AWS CodePipeline",
        "Docker",
        "ECS",
        "Lambda",
      ],
      link: "https://github.com",
      metrics: "80% faster deployments, 100% automation",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Serverless Monitoring Platform",
      description:
        "Developed a serverless monitoring and alerting system using AWS Lambda, CloudWatch, and SNS for real-time infrastructure monitoring.",
      technologies: ["AWS Lambda", "CloudWatch", "SNS", "Python", "DynamoDB"],
      link: "https://github.com",
      metrics: "Real-time alerting, 60% cost savings",
      gradient: "from-blue-500 to-purple-500",
    },
  ];

  const experience = [
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
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section id="about" className="py-20 px-6 relative">
          {/* Subtle background accent */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>

              {/* Profile Picture Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-32 h-32 mx-auto mb-8 relative"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-muted-foreground/50" />
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
                <div className="absolute -inset-2 rounded-full border border-purple-500/20 animate-pulse delay-1000"></div>
              </motion.div>

              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p className="mb-6">
                  I am a passionate cloud engineer with expertise in AWS,
                  infrastructure as code, and DevOps practices. With over 4
                  years of experience, I specialize in building scalable,
                  secure, and cost-effective cloud solutions.
                </p>
                <p className="mb-6">
                  My approach combines deep technical knowledge with business
                  acumen, ensuring that every solution I deliver not only meets
                  technical requirements but also drives business value. I am
                  particularly passionate about automation, security, and
                  helping teams adopt modern cloud-native practices.
                </p>
                <p>
                  When I am not architecting cloud solutions, you can find me
                  contributing to open-source projects, staying current with the
                  latest cloud technologies, and mentoring aspiring cloud
                  engineers.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section - Moved before Certifications */}
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 border border-border hover:border-border/60 transition-all hover:shadow-lg group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <a
                      href={project.link}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <h3 className="font-semibold text-xl mb-3">
                    {project.title}
                  </h3>
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
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section - Moved after Projects */}
        <section id="certifications" className="py-20 px-6 relative">
          {/* Background accent */}
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Certifications
              </h2>
              <p className="text-muted-foreground text-lg">
                Professional certifications demonstrating expertise in cloud
                technologies
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 text-center border border-border hover:border-blue-500/20 transition-all group"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all">
                    <Award className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{cert.title}</h3>
                  <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                  <p className="text-sm text-blue-500 font-medium">
                    {cert.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-20 px-6 bg-secondary/20 relative"
        >
          {/* Background accent */}
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience
              </h2>
              <p className="text-muted-foreground text-lg">
                Professional journey in cloud engineering and DevOps
              </p>
            </motion.div>

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-8 border border-border group hover:border-blue-500/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all">
                      <Briefcase className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-xl">
                            {exp.company}
                          </h3>
                          <p className="text-blue-500 font-medium">
                            {exp.role}
                          </p>
                        </div>
                        <span className="text-muted-foreground font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 rounded-full text-sm">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>

                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 relative">
          {/* Background accent */}
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get In Touch
              </h2>
              <p className="text-muted-foreground text-lg">
                Let&apos;s discuss your cloud infrastructure needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-semibold text-xl mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span>chris@example.com</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10">
                      <Phone className="w-5 h-5 text-purple-500" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10">
                      <MapPin className="w-5 h-5 text-cyan-500" />
                      <span>Available for remote work</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-6">Connect</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      className="w-12 h-12 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-lg flex items-center justify-center hover:from-gray-500/20 hover:to-gray-600/20 transition-all border border-gray-500/20 hover:border-gray-500/30"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-gray-500" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg flex items-center justify-center hover:from-blue-500/20 hover:to-blue-600/20 transition-all border border-blue-500/20 hover:border-blue-500/30"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-blue-500" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors ${
                      errors.name
                        ? "border-red-500"
                        : "border-border focus:border-blue-500"
                    } focus:outline-none`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors ${
                      errors.email
                        ? "border-red-500"
                        : "border-border focus:border-blue-500"
                    } focus:outline-none`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-border focus:border-blue-500"
                    } focus:outline-none`}
                    placeholder="Tell me about your project or how I can help..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 bg-gradient-to-r from-background to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Chris Wagner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
