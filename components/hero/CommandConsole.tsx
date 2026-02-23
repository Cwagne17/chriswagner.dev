"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

interface ConsoleSession {
  title: string;
  lines: string[];
}

const sessions: ConsoleSession[] = [
  {
    title: "session: cdk deploy",
    lines: [
      "$ cdk deploy EksPlatformStack --require-approval never",
      "✨ Synthesizing CDK app…",
      "✅ Security checks (cdk-nag)… PASS",
      "✅ Change set created: +12 ~3 -0",
      "🚀 Deploying EksPlatformStack…",
      "✅ Outputs:",
      "- ClusterName: eks-prod",
      "- IngressURL: https://argocd.example.com",
    ],
  },
  {
    title: "session: terraform apply",
    lines: [
      "$ terraform init -upgrade",
      "✔ Initialized backend (S3 + DynamoDB lock)",
      "$ terraform workspace select prod",
      'Switched to workspace "prod"',
      "$ terraform plan -out=tfplan",
      "Plan: 8 to add, 2 to change, 0 to destroy",
      "$ terraform apply -auto-approve tfplan",
      "✔ Apply complete! Resources: 10 added, 2 changed",
    ],
  },
  {
    title: "session: kubectl rollout",
    lines: [
      "$ kubectl apply -k ./k8s/overlays/prod",
      "namespace/app configured",
      "deployment.apps/api configured",
      "service/api configured",
      "ingress.networking.k8s.io/api configured",
      "$ kubectl rollout status deploy/api -n app",
      'deployment "api" successfully rolled out',
      "$ kubectl get pods -n app",
      "api-6c9f… 3/3 Running",
    ],
  },
  {
    title: "session: inspec verify",
    lines: [
      "$ inspec exec profiles/eks-baseline -t aws://us-east-1",
      "Profile: EKS Baseline",
      "✔ AWS EKS public endpoint restricted",
      "✔ Worker nodes in private subnets",
      "✔ Cluster logging enabled",
      "✔ CIS/STIG-aligned controls… PASS",
      "Summary: 0 failures, 0 skipped",
    ],
  },
];

export function CommandConsole() {
  const shouldReduceMotion = useReducedMotion();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle session rotation and animation
  useEffect(() => {
    if (shouldReduceMotion) {
      // If reduced motion, just show all lines immediately
      setDisplayedLines(sessions[currentSessionIndex].lines);
      return;
    }

    // Reset lines for new session
    setDisplayedLines([]);
    setIsTransitioning(true);

    // Animate lines appearing with stagger
    const lines = sessions[currentSessionIndex].lines;
    lines.forEach((_, index) => {
      setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[index]]);
      }, index * 150);
    });

    setIsTransitioning(false);
  }, [currentSessionIndex, shouldReduceMotion]);

  // Rotation timer (only if not reduced motion)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const rotationTimer = setInterval(() => {
      setCurrentSessionIndex((prev) => (prev + 1) % sessions.length);
    }, 16000);

    return () => clearInterval(rotationTimer);
  }, [shouldReduceMotion]);

  const currentSession = sessions[currentSessionIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Console Card */}
      <div className="relative bg-slate-900/80 dark:bg-slate-950 rounded-lg border border-slate-700/50 dark:border-slate-800 overflow-hidden shadow-2xl">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative px-4 py-3 bg-gradient-to-r from-slate-800/50 to-slate-900/50 dark:from-slate-900/50 dark:to-slate-950/50 border-b border-slate-700/30 dark:border-slate-800">
          <div className="flex items-center justify-between">
            {/* Control dots */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>

            {/* Title */}
            <div className="text-sm font-mono text-slate-300 dark:text-slate-400">
              {currentSession.title}
            </div>

            {/* Spacer */}
            <div className="w-[50px]" />
          </div>
        </div>

        {/* Body */}
        <div className="relative px-4 py-4 font-mono text-sm min-h-[280px] max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          {displayedLines.length === 0 && !shouldReduceMotion ? (
            // Placeholder while loading
            <div className="text-slate-500/50 animate-pulse">⌛</div>
          ) : (
            <div className="space-y-1">
              {displayedLines.map((line, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-300 ${
                    shouldReduceMotion
                      ? "opacity-100"
                      : "opacity-0 animate-fade-in"
                  }`}
                  style={
                    !shouldReduceMotion
                      ? {
                          animationDelay: `${index * 50}ms`,
                        }
                      : {}
                  }
                >
                  <ConsoleLine line={line} />
                </div>
              ))}

              {/* Blinking cursor */}
              <div className="inline-block">
                <span className="text-slate-300 dark:text-slate-400 animate-pulse">
                  █
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Session indicators */}
        <div className="absolute bottom-2 right-4 flex gap-1">
          {sessions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!shouldReduceMotion) {
                  setCurrentSessionIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSessionIndex
                  ? "bg-blue-400 w-6"
                  : "bg-slate-600 hover:bg-slate-500"
              } ${shouldReduceMotion ? "cursor-default" : "cursor-pointer"}`}
              aria-label={`Jump to session ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl -z-10" />
    </div>
  );
}

/**
 * ConsoleLine - renders individual console lines with syntax highlighting
 */
function ConsoleLine({ line }: { line: string }) {
  // Command lines starting with $
  if (line.startsWith("$")) {
    return <div className="text-emerald-300 dark:text-emerald-400">{line}</div>;
  }

  // Check marks and success indicators
  if (line.includes("✔") || line.includes("✅") || line.includes("PASS")) {
    return <div className="text-green-500 dark:text-green-400">{line}</div>;
  }

  // Info and warning indicators
  if (line.includes("✨") || line.includes("🚀")) {
    return <div className="text-blue-400 dark:text-blue-300">{line}</div>;
  }

  // Default - normal console text
  return <div className="text-slate-300 dark:text-slate-300">{line}</div>;
}
