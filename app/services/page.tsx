"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  FileText,
  Gauge,
  GitBranch,
  MessageCircle,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { THEME_CLASSES } from "@/lib/theme";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

type Offering = {
  id: string;
  title: string;
  shortTitle: string;
  problem: string;
  outcome: string;
  bestFor: string;
  timeline: string;
  deliverables: string[];
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
};

type EngagementModel = {
  title: string;
  label: string;
  timeline: string;
  bestFor: string;
  cadence: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
};

const FIT_SIGNALS = [
  {
    title: "ClickOps is creating environment drift",
    description:
      "Manual cloud changes are making environments inconsistent, difficult to review, and harder to reproduce.",
    icon: Gauge,
  },
  {
    title: "Security is slowing delivery",
    description:
      "Controls and reviews are arriving too late, creating friction instead of confidence.",
    icon: Radar,
  },
  {
    title: "The roadmap needs senior execution",
    description:
      "The destination is clear, but your team needs hands-on cloud leadership to move faster.",
    icon: Route,
  },
] as const;

const OFFERINGS: Offering[] = [
  {
    id: "platform",
    title: "Cloud Platform Buildout",
    shortTitle: "Cloud foundation",
    problem:
      "Your AWS environment grew organically, or a new platform needs secure foundations before teams can safely build on it.",
    outcome:
      "A practical AWS foundation with clear guardrails, operational visibility, and an ownership model your team can extend.",
    bestFor: "New landing zones, platform modernization, or multi-environment growth",
    timeline: "3–6 weeks",
    deliverables: [
      "Account, environment, and network architecture",
      "IAM, security, and cost guardrails",
      "Operational access and observability baseline",
      "Implementation roadmap and ownership map",
    ],
    technologies: ["AWS", "IAM", "CloudWatch", "Organizations", "Control Tower"],
    icon: Cloud,
  },
  {
    id: "iac",
    title: "Infrastructure as Code Delivery",
    shortTitle: "Infrastructure as code",
    problem:
      "Infrastructure changes are inconsistent, difficult to review, or too dependent on manual console work and tribal knowledge.",
    outcome:
      "Reusable, reviewable infrastructure patterns with a safe path from development through production.",
    bestFor: "Terraform or CDK adoption, module design, and environment standardization",
    timeline: "2–5 weeks",
    deliverables: [
      "Reusable module and repository standards",
      "Environment promotion and validation workflow",
      "Policy checks and drift-resistant delivery",
      "Documentation and team enablement sessions",
    ],
    technologies: ["Terraform", "AWS CDK", "TypeScript", "GitHub Actions", "Policy as Code"],
    icon: Code2,
  },
  {
    id: "delivery",
    title: "DevSecOps Delivery",
    shortTitle: "DevSecOps",
    problem:
      "Security and delivery workflows are fragmented, releases feel risky, or controls vary from repository to repository.",
    outcome:
      "A repeatable DevSecOps system with shared pipelines, automated security gates, and visible rollback paths.",
    bestFor: "Secure software delivery, platform enablement, and pipeline modernization",
    timeline: "2–4 weeks",
    deliverables: [
      "Shared pipeline templates and conventions",
      "Security, test, and policy gates",
      "Rollback-safe deployment patterns",
      "Rollout plan across teams and repositories",
    ],
    technologies: ["GitHub Actions", "CircleCI", "Containers", "SAST", "GitOps"],
    icon: GitBranch,
  },
];

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "Project Sprint",
    label: "Defined outcome",
    timeline: "2–6 weeks",
    bestFor: "A focused initiative that needs momentum and a clear finish line.",
    cadence: "Hands-on delivery with weekly demos and decision checkpoints.",
    icon: Sparkles,
    featured: true,
  },
  {
    title: "Fractional Cloud Lead",
    label: "Embedded leadership",
    timeline: "Ongoing",
    bestFor: "A team that needs steady architecture and execution guidance.",
    cadence: "A predictable weekly rhythm for roadmap, reviews, and mentoring.",
    icon: ShieldCheck,
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Clarify the business outcome, technical reality, constraints, and owners.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Shape",
    description: "Turn ambiguity into a prioritized scope with milestones and success signals.",
    icon: Route,
  },
  {
    number: "03",
    title: "Deliver",
    description: "Build in visible increments, surface tradeoffs early, and validate as we go.",
    icon: Settings2,
  },
  {
    number: "04",
    title: "Transfer",
    description: "Hand over the system, operating context, documentation, and next-step roadmap.",
    icon: FileText,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "How quickly can an engagement start?",
    answer:
      "Most engagements can begin within one to two weeks after we align on scope, access, and the people needed for decisions.",
  },
  {
    question: "Will you work inside our existing tools and workflow?",
    answer:
      "Yes. I integrate with the repositories, communication channels, ticketing, and delivery practices your team already uses whenever practical.",
  },
  {
    question: "Do you work with internal engineering teams?",
    answer:
      "Yes. These engagements are designed to complement internal teams through hands-on delivery, pairing, architecture guidance, and clear ownership boundaries.",
  },
  {
    question: "What is included in the handoff?",
    answer:
      "Handoffs typically include code, configuration, runbooks, decision context, operating guidance, and live transfer sessions tailored to the engagement.",
  },
  {
    question: "What if the scope is not fully defined yet?",
    answer:
      "That is common. We can begin with a short discovery phase to identify the highest-leverage outcome and shape a realistic delivery plan.",
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${THEME_CLASSES.text.brand}`}>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Short-Term Cloud Engineering Contracts
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
            High-impact AWS and IaC delivery with clear scope and clean handoff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--button-primary)] px-6 py-3 font-medium text-white hover:bg-[color:var(--button-primary-hover)] hover:shadow-sm transition-all"
            >
              Discuss a Contract
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium hover:border-border/70 hover:shadow-sm transition-all"
            >
              Review Case Studies
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border bg-card">
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
      </div>
    </section>
  );
}

function FitSignals() {
  return (
    <section className="relative border-y border-border/60 bg-card/40 px-6 py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent-border-medium)] to-transparent" />
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          This is probably worth a conversation if…
        </p>
        <div className="grid gap-8 md:grid-cols-3 md:divide-x md:divide-border/70">
          {FIT_SIGNALS.map((signal, index) => (
            <motion.article
              key={signal.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex gap-4 md:px-6 first:md:pl-0 last:md:pr-0"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${THEME_CLASSES.bg.brandSoft}`}>
                <signal.icon className={`h-5 w-5 ${THEME_CLASSES.text.brand}`} />
              </div>
              <div>
                <h2 className="font-semibold">{signal.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {signal.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceExplorer() {
  const [activeId, setActiveId] = useState(OFFERINGS[0].id);
  const reduceMotion = useReducedMotion();
  const activeOffering =
    OFFERINGS.find((offering) => offering.id === activeId) ?? OFFERINGS[0];

  return (
    <section id="offerings" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute -right-56 top-24 h-[520px] w-[520px] rounded-full bg-[color:var(--accent-soft)] blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Choose the outcome"
          title="Move from cloud friction to forward motion."
          description="Start with the constraint that is holding your team back. Each engagement is shaped around an operational outcome—not a generic list of hours."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.7fr]">
          <div
            role="tablist"
            aria-label="Cloud engineering services"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
          >
            {OFFERINGS.map((offering, index) => {
              const Icon = offering.icon;
              const isActive = offering.id === activeOffering.id;

              return (
                <button
                  key={offering.id}
                  id={`service-tab-${offering.id}`}
                  role="tab"
                  aria-controls={`service-panel-${offering.id}`}
                  aria-selected={isActive}
                  onClick={() => setActiveId(offering.id)}
                  className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-[color:var(--accent-border-medium)] bg-[color:var(--accent-soft)] shadow-[var(--glow)]"
                      : "border-border bg-card/60 hover:-translate-y-0.5 hover:border-[color:var(--accent-border-soft)] hover:bg-card"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-[color:var(--button-primary)] text-white" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">0{index + 1}</span>
                    <span className="block font-semibold">{offering.shortTitle}</span>
                  </span>
                  <ArrowRight
                    className={`ml-auto hidden h-4 w-4 transition-transform sm:block ${
                      isActive ? `${THEME_CLASSES.text.brand} translate-x-1` : "text-muted-foreground"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[590px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lg)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent-border-medium)] to-transparent" />
            <AnimatePresence mode="wait">
              <motion.article
                key={activeOffering.id}
                id={`service-panel-${activeOffering.id}`}
                role="tabpanel"
                aria-labelledby={`service-tab-${activeOffering.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="p-6 md:p-10"
              >
                <div className="flex flex-col gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className={`mb-2 text-sm font-medium ${THEME_CLASSES.text.brand}`}>
                      {activeOffering.timeline} typical engagement
                    </p>
                    <h3 className="text-2xl font-bold md:text-3xl">{activeOffering.title}</h3>
                  </div>
                  <Link
                    href="/#contact"
                    className={`inline-flex shrink-0 items-center gap-2 text-sm font-semibold ${THEME_CLASSES.text.brand} hover:brightness-125`}
                  >
                    Discuss this service
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-8 pt-8 md:grid-cols-2">
                  <div className="space-y-7">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        The situation
                      </p>
                      <p className="leading-relaxed">{activeOffering.problem}</p>
                    </div>
                    <div className="rounded-xl border border-[color:var(--accent-border-soft)] bg-[color:var(--accent-soft)] p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        The outcome
                      </p>
                      <p className="font-medium leading-relaxed">{activeOffering.outcome}</p>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Best fit
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {activeOffering.bestFor}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      What gets delivered
                    </p>
                    <ul className="space-y-4">
                      {activeOffering.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex gap-3 text-sm leading-relaxed">
                          <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${THEME_CLASSES.text.brand}`} />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-2 border-t border-border/70 pt-6">
                      {activeOffering.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function EngagementModels() {
  return (
    <section id="engagement-models" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Ways to work together"
          title="The right amount of support for the moment."
          description="Choose a focused delivery sprint, steady technical leadership, or rapid operational intervention. Scope stays explicit in every model."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {ENGAGEMENT_MODELS.map((model, index) => {
            const Icon = model.icon;
            return (
              <motion.article
                key={model.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] ${
                  model.featured
                    ? "border-[color:var(--accent-border-medium)] bg-[color:var(--accent-soft)]"
                    : "border-border bg-card"
                }`}
              >
                {model.featured && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-[color:var(--button-primary)] px-3 py-1.5 text-xs font-semibold text-white">
                    Most focused
                  </div>
                )}
                <div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-xl ${model.featured ? "bg-[color:var(--button-primary)] text-white" : "bg-secondary"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {model.label}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{model.title}</h3>
                <p className={`mt-3 text-3xl font-bold ${THEME_CLASSES.text.brandStrong}`}>
                  {model.timeline}
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{model.bestFor}</p>
                <div className="my-6 h-px bg-border" />
                <p className="flex gap-3 text-sm leading-relaxed">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${THEME_CLASSES.text.brand}`} />
                  {model.cadence}
                </p>
                <Link
                  href="/#contact"
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${THEME_CLASSES.text.brand}`}
                >
                  Explore this model
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="border-y border-border/60 bg-card/30 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How delivery works"
          title="Visible progress. No black box."
          description="A lightweight operating rhythm keeps the work moving and gives your team the context to make fast, informed decisions."
        />

        <div className="relative mt-16 grid gap-4 md:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[color:var(--accent-border-medium)] to-transparent md:block" />
          {PROCESS_STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative rounded-xl border border-border bg-card p-5 md:border-0 md:bg-transparent md:p-0 md:text-center"
            >
              <div className="relative z-10 mb-5 flex items-center gap-3 md:flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--accent-border-medium)] bg-background shadow-[var(--glow)]">
                  <step.icon className={`h-5 w-5 ${THEME_CLASSES.text.brand}`} />
                </div>
                <span className="font-mono text-xs text-muted-foreground md:absolute md:right-[calc(50%-2.7rem)] md:top-0">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:px-3">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Before we start"
            title="Good questions are part of good scoping."
            description="A few practical answers about timing, collaboration, and what your team receives."
          />
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-card px-6">
          {FAQ_ITEMS.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold focus-visible:outline-none focus-visible:text-[color:var(--primary)]">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary transition-transform group-open:rotate-45">
                  <span className="text-xl font-light">+</span>
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[color:var(--accent-border-medium)] bg-card px-6 py-16 text-center shadow-[var(--shadow-lg)] md:px-12 md:py-20">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[color:var(--accent-soft)] blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[color:var(--accent-soft)] blur-[100px]" />
        <div className="relative mx-auto max-w-3xl">
          <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.2em] ${THEME_CLASSES.text.brand}`}>
            Start with the outcome
          </p>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            What would make the next 90 days meaningfully better?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Share the initiative, constraint, or operational problem. I’ll help turn it into a practical first step.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--button-primary)] px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[color:var(--button-primary-hover)] hover:shadow-xl"
            >
              Tell Me What You’re Solving
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/50 px-7 py-3.5 font-semibold transition-all hover:border-[color:var(--accent-border-medium)] hover:bg-secondary/70"
            >
              See Relevant Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FitSignals />
        <ServiceExplorer />
        <EngagementModels />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
