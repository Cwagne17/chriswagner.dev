"use client";

import {
  ArrowRight,
  Cloud,
  Code,
  FileText,
  GitBranch,
  MessageCircle,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { THEME_CLASSES } from "@/lib/theme";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

type Offering = {
  id: string;
  title: string;
  summary: string;
  chips: string[];
  bestFor: string;
  timeline: string;
  fullScopeBullets: string[];
};

type Model = {
  id: "sprint" | "fractional" | "stabilize";
  title: string;
  timeline: string;
  bestFor: string;
  tags: string[];
};

type ComparisonRow = {
  label: string;
  values: Record<Model["id"], string>;
};

type ProcessStep = {
  step: string;
  title: string;
  summary: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

const OFFERINGS: Offering[] = [
  {
    id: "platform",
    title: "Cloud Platform Buildout",
    summary: "Launch secure AWS foundations your team can use immediately.",
    chips: ["AWS Account Baseline", "IAM + Network Guardrails", "Ops Readiness"],
    bestFor: "Best for teams building a new cloud landing zone.",
    timeline: "3-6 weeks",
    fullScopeBullets: [
      "Account and environment strategy",
      "Network and IAM baseline",
      "Security and cost guardrails",
      "Operational access and observability baseline",
      "Implementation ownership map",
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code Delivery",
    summary: "Build reusable Terraform/CDK patterns for safer delivery.",
    chips: ["Reusable Modules", "Policy Validation", "Environment Promotion"],
    bestFor: "Best for teams standardizing deployment workflows.",
    timeline: "2-5 weeks",
    fullScopeBullets: [
      "Reusable module standards",
      "Promotion across environments",
      "Validation and policy checks",
      "Drift-resistant workflows",
      "Repository structure and ownership model",
    ],
  },
  {
    id: "cicd",
    title: "CI/CD and Release Acceleration",
    summary: "Standardize pipelines and increase release confidence.",
    chips: ["Shared Pipelines", "Quality Gates", "Rollback Safety"],
    bestFor: "Best for teams shipping frequently across many services.",
    timeline: "2-4 weeks",
    fullScopeBullets: [
      "Shared pipeline templates",
      "Security and quality gates",
      "Rollback-safe release paths",
      "Deployment observability baseline",
      "Cross-repository rollout sequencing",
    ],
  },
  {
    id: "stabilize",
    title: "Stabilize and Transfer",
    summary: "Harden critical workloads and hand over with clear ownership.",
    chips: ["Incident Reduction", "Runbook Coverage", "Team Handoff"],
    bestFor: "Best for teams inheriting unstable or drifted environments.",
    timeline: "2-4 weeks",
    fullScopeBullets: [
      "Service reliability review and remediation plan",
      "Operational hardening and release guardrails",
      "Runbook creation and escalation pathways",
      "Ownership transfer sessions with internal team",
      "Post-engagement operating cadence recommendations",
    ],
  },
];

const OFFERING_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  platform: Cloud,
  iac: Code,
  cicd: GitBranch,
  stabilize: Settings,
};

const MODELS: Model[] = [
  {
    id: "sprint",
    title: "Project Sprint",
    timeline: "2-6 Weeks",
    bestFor: "Defined initiative with a fixed delivery window.",
    tags: ["Milestone", "High Focus", "Fast Start"],
  },
  {
    id: "fractional",
    title: "Fractional Cloud Lead",
    timeline: "Ongoing",
    bestFor: "Teams needing steady architecture and execution leadership.",
    tags: ["Weekly Cadence", "Mentorship", "Roadmap"],
  },
  {
    id: "stabilize",
    title: "Stabilize & Transfer",
    timeline: "2-4 Weeks",
    bestFor: "Workloads with incidents, drift, or unclear ownership.",
    tags: ["Hardening", "Runbooks", "Transition"],
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Timeline",
    values: {
      sprint: "2-6 weeks",
      fractional: "Part-time ongoing",
      stabilize: "2-4 weeks",
    },
  },
  {
    label: "Best for",
    values: {
      sprint: "Defined initiative",
      fractional: "Long-term strategic execution",
      stabilize: "Operational cleanup",
    },
  },
  {
    label: "Deliverables",
    values: {
      sprint: "Scoped implementation package",
      fractional: "Roadmap and technical guidance",
      stabilize: "Hardening and handoff artifacts",
    },
  },
  {
    label: "Involvement",
    values: {
      sprint: "High-intensity focus",
      fractional: "Steady weekly support",
      stabilize: "Hands-on remediation",
    },
  },
  {
    label: "Typical outcome",
    values: {
      sprint: "Delivered platform milestone",
      fractional: "Mature delivery capability",
      stabilize: "Lower incident rate",
    },
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "1",
    title: "Align",
    summary: "Set scope, constraints, and success measures.",
    details:
      "We define the target outcome, decision boundaries, owners, and milestones before implementation begins.",
    icon: MessageCircle,
  },
  {
    step: "2",
    title: "Build",
    summary: "Ship in checkpoints with visible progress.",
    details:
      "Work is delivered iteratively with practical status updates, clear tradeoffs, and production-ready outputs.",
    icon: Settings,
  },
  {
    step: "3",
    title: "Transfer",
    summary: "Hand over ownership with operational clarity.",
    details:
      "You receive runbooks, implementation rationale, and transition guidance so your team can operate confidently.",
    icon: FileText,
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly can we start?",
    answer: "Most engagements can begin within 1-2 weeks after scope alignment.",
  },
  {
    question: "Do you work with in-house engineering teams?",
    answer: "Yes, I integrate with your team workflows and ownership model.",
  },
  {
    question: "Is documentation included?",
    answer: "Yes, each engagement includes practical handoff documentation.",
  },
];

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-t border-border/70 pt-3">
      <summary
        className={`list-none cursor-pointer text-sm font-medium ${THEME_CLASSES.text.brand} hover:brightness-110 transition-all`}
      >
        {title}
      </summary>
      <div className="mt-3 space-y-2">{children}</div>
    </details>
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--primary)] px-6 py-3 font-medium text-white hover:brightness-110 hover:shadow-sm transition-all"
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

function OfferingsCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {OFFERINGS.map((offering) => {
        const ItemIcon = OFFERING_ICONS[offering.id] ?? Cloud;

        return (
          <article
            key={offering.id}
            className="rounded-xl border border-border bg-card p-6 hover:border-border/70 hover:shadow-sm transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ItemIcon className={`h-5 w-5 ${THEME_CLASSES.text.brand}`} />
                <h3 className="text-xl font-semibold">{offering.title}</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {offering.summary}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">
                  {offering.bestFor}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${THEME_CLASSES.border.brandSoft} ${THEME_CLASSES.bg.brandSoft}`}
                >
                  {offering.timeline}
                </span>
                {offering.chips.slice(0, 3).map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <Accordion title="Full scope">
                <ul className="space-y-2">
                  {offering.fullScopeBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ComparisonCards() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-5">
        {MODELS.map((model) => (
          <article
            key={model.id}
            className="rounded-lg border border-border bg-card p-5 hover:border-border/70 hover:shadow-sm transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">{model.title}</h3>
            <p className={`mb-2 text-3xl font-bold ${THEME_CLASSES.text.brandStrong}`}>{model.timeline}</p>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">{model.bestFor}</p>
            <div className="flex flex-wrap gap-2">
              {model.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <Accordion title="Compare details">
        <div className="overflow-x-auto rounded-lg border border-border">
          <div className="min-w-[720px] bg-card">
            <div className="grid grid-cols-4 border-b border-border">
              <div className="p-3 text-sm font-semibold">Criteria</div>
              <div className="p-3 text-sm font-semibold line-clamp-1">Project Sprint</div>
              <div className="p-3 text-sm font-semibold line-clamp-1">Fractional Cloud Lead</div>
              <div className="p-3 text-sm font-semibold line-clamp-1">Stabilize &amp; Transfer</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div key={row.label} className="grid grid-cols-4 border-b border-border last:border-b-0">
                <div className="p-3 text-sm font-medium line-clamp-1">{row.label}</div>
                <div className="p-3 text-sm text-muted-foreground line-clamp-2">{row.values.sprint}</div>
                <div className="p-3 text-sm text-muted-foreground line-clamp-2">{row.values.fractional}</div>
                <div className="p-3 text-sm text-muted-foreground line-clamp-2">{row.values.stabilize}</div>
              </div>
            ))}
          </div>
        </div>
      </Accordion>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 pb-20 pt-16">
      <div className="max-w-4xl mx-auto rounded-xl border border-border bg-card p-8 text-center md:p-10">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Need Senior Help on a Defined Initiative?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground leading-relaxed line-clamp-2">
          Share your target outcome and timeline to quickly scope the right engagement.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--primary)] px-7 py-3 font-medium text-white hover:brightness-110 hover:shadow-sm transition-all"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-7 py-3 font-medium hover:border-border/70 hover:shadow-sm transition-all"
          >
            View Case Studies
          </Link>
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

        <section id="offerings" className="px-6 py-24">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">Offerings</h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                Visual-first services with clear scope and concise outcomes.
              </p>
            </div>
            <OfferingsCards />
          </div>
        </section>

        <section id="engagement-models" className="px-6 py-24">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">Engagement Models</h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                Pick the model that best matches your timeline and team context.
              </p>
            </div>
            <ComparisonCards />
          </div>
        </section>

        <section id="process" className="px-6 py-24">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">Process</h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                Three steps, clear checkpoints, minimal overhead.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <article
                  key={step.title}
                  className="rounded-lg border border-border bg-card p-5 hover:border-border/70 hover:shadow-sm transition-all"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--primary)] text-sm font-semibold text-white">
                      {step.step}
                    </div>
                    <step.icon className={`h-5 w-5 ${THEME_CLASSES.text.brand}`} />
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{step.summary}</p>
                  <Accordion title="Details">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{step.details}</p>
                  </Accordion>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-24">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">FAQ</h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                Common questions before starting an engagement.
              </p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq) => (
                <article key={faq.question} className="rounded-lg border border-border bg-card p-4">
                  <Accordion title={faq.question}>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{faq.answer}</p>
                  </Accordion>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
