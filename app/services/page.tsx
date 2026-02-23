"use client";

import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Code,
  FileText,
  GitBranch,
  MessageCircle,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { THEME_CLASSES } from "@/lib/theme";

export default function ServicesPage() {
  const contractOffers = [
    {
      title: "Cloud Platform Buildout",
      bullets: ["Landing zone and account strategy", "Network and IAM baseline", "Delivery-ready architecture docs"],
      icon: Cloud,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Infrastructure as Code Delivery",
      bullets: ["Reusable modules and standards", "Promotion across dev/stage/prod", "Drift-resistant deployments"],
      icon: Code,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "CI/CD and Release Acceleration",
      bullets: ["Pipeline templates", "Security and test gates", "Faster release cycles"],
      icon: GitBranch,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Ops and Compliance Automation",
      bullets: ["Compliance as code", "Runbook automation", "Operational cost reduction"],
      icon: Settings,
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  const engagementModels = [
    {
      title: "Project Sprint (2-6 weeks)",
      description:
        "A focused engagement to deliver a concrete outcome: platform baseline, IaC migration, or pipeline rollout.",
      points: ["Defined scope and milestones", "Weekly demos and handoff docs", "Fast delivery for urgent initiatives"],
      icon: FileText,
    },
    {
      title: "Fractional Cloud Lead",
      description:
        "Ongoing part-time technical leadership to guide architecture, delivery quality, and engineering execution.",
      points: ["Architecture and roadmap ownership", "Standards and guardrails", "Mentoring and unblock support"],
      icon: MessageCircle,
    },
    {
      title: "Stabilize and Transfer",
      description:
        "Short engagement to reduce incidents, standardize operations, and leave your team with maintainable systems.",
      points: ["Operational triage and hardening", "Clear runbooks and ownership model", "Measured transition plan"],
      icon: CheckCircle,
    },
  ];

  const deliveryFlow = [
    {
      step: "1",
      title: "Discovery and Alignment",
      description: "We define business goals, technical constraints, and success metrics before execution starts.",
      icon: MessageCircle,
    },
    {
      step: "2",
      title: "Implementation",
      description: "I deliver production-grade changes with transparency, checkpoints, and practical documentation.",
      icon: Settings,
    },
    {
      step: "3",
      title: "Enablement and Handover",
      description: "Your team receives runbooks, architecture rationale, and transition support to stay autonomous.",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className={`bg-gradient-to-r ${THEME_CLASSES.gradient.brand} bg-clip-text text-transparent`}>
                    Short-Term Cloud Engineering Contracts
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  I help teams execute high-impact AWS and DevOps initiatives fast:
                  platform modernization, IaC delivery, CI/CD standardization, and operational hardening.
                  You get a senior engineer who can plan and ship.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/#contact"
                    className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${THEME_CLASSES.gradient.brand} text-white px-6 py-3 rounded-lg font-medium hover:opacity-95 transition-all`}
                  >
                    Discuss a Contract
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:border-border/70 transition-colors"
                  >
                    Review Case Studies
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${THEME_CLASSES.gradient.brandSoft} rounded-2xl border border-border overflow-hidden`}>
                  <div className="relative w-full aspect-[4/5]">
                    <Image
                      src="/portrait.jpeg"
                      alt="Chris Wagner"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, (min-width: 768px) 70vw, 100vw"
                      quality={100}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offerings */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Contract Offerings</h2>
              <p className="text-muted-foreground max-w-3xl">
                Pick one focused objective or combine services into a short engagement plan.
                Every engagement is scoped to concrete deliverables and a measurable outcome.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {contractOffers.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-8 border border-border hover:border-border/60 transition-all hover:shadow-lg group text-center h-full flex flex-col"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-2xl mb-4">
                      {service.title}
                    </h3>
                    <div className="space-y-2 text-left">
                      {service.bullets.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className={`w-4 h-4 mt-0.5 ${THEME_CLASSES.text.brand} shrink-0`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Engagement Models</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                If you need immediate execution, choose a project sprint. If you need ongoing leadership and delivery support, choose a fractional model.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {engagementModels.map((model, index) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <model.icon className={`w-7 h-7 ${THEME_CLASSES.text.brand} mb-3`} />
                  <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
                  <p className="text-muted-foreground mb-4">{model.description}</p>
                  <div className="space-y-2">
                    {model.points.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className={`w-4 h-4 mt-0.5 ${THEME_CLASSES.text.brand} shrink-0`} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Lightweight process, strong communication, and clear ownership from day one.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {deliveryFlow.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 border border-border h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-r ${THEME_CLASSES.gradient.brand} text-white font-semibold flex items-center justify-center`}>
                      {step.step}
                    </div>
                    <step.icon className={`w-5 h-5 ${THEME_CLASSES.text.brand}`} />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${THEME_CLASSES.gradient.brandSubtle}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="max-w-4xl mx-auto relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Need Senior Help for a Defined Initiative?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Share the outcome you need. I&apos;ll help you scope the work, define the path,
                and execute with your team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-500/30 text-foreground px-8 py-4 rounded-lg font-medium hover:border-blue-500/60 hover:bg-blue-500/5 transition-all text-lg"
                >
                  View Past Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
