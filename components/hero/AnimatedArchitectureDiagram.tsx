"use client";

import { useReducedMotion } from "motion/react";

/**
 * AnimatedArchitectureDiagram
 * Shows User → SSO/IAM → WAF/ALB → EKS Cluster (Ingress → Service → Pods)
 * with animated request/response data flow
 */
export function AnimatedArchitectureDiagram() {
  const shouldReduceMotion = useReducedMotion();

  // Node positions (relative to 600x420 viewBox)
  const nodes = {
    user: { x: 40, y: 210, label: "User" },
    iam: { x: 160, y: 150, label: "SSO / IAM" },
    waf: { x: 280, y: 210, label: "WAF / ALB" },
    eks: { x: 480, y: 210, label: "EKS Cluster" },
    ingress: { x: 440, y: 130, label: "Ingress" },
    service: { x: 480, y: 210, label: "Service" },
    pod1: { x: 440, y: 280, label: "" },
    pod2: { x: 480, y: 280, label: "" },
    pod3: { x: 520, y: 280, label: "" },
  };

  // Connection paths
  const paths = [
    { from: nodes.user, to: nodes.iam },
    { from: nodes.iam, to: nodes.waf },
    { from: nodes.waf, to: nodes.eks },
    // Inside EKS cluster
    { from: { x: 400, y: 210 }, to: nodes.ingress },
    { from: nodes.ingress, to: nodes.service },
    { from: nodes.service, to: nodes.pod2 },
  ];

  // Path for the traveling data dot (main flow)
  const dataFlowPath = `
    M ${nodes.user.x} ${nodes.user.y}
    L ${nodes.iam.x} ${nodes.iam.y}
    L ${nodes.waf.x} ${nodes.waf.y}
    L ${nodes.eks.x - 80} ${nodes.eks.y}
    L ${nodes.ingress.x} ${nodes.ingress.y}
    L ${nodes.service.x} ${nodes.service.y}
    L ${nodes.pod2.x} ${nodes.pod2.y}
  `;

  return (
    <div className="relative w-full aspect-[3/2] max-w-2xl mx-auto">
      <svg
        viewBox="0 0 600 420"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter for data dots */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* EKS Cluster Container (large rounded rect with grid background) */}
        <g>
          <rect
            x="380"
            y="100"
            width="200"
            height="220"
            rx="12"
            className="fill-[color:var(--accent-soft)] stroke-[color:var(--accent-border-medium)]"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          {/* Grid pattern inside cluster */}
          <pattern
            id="clusterGrid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              className="stroke-[color:var(--accent-soft)]"
              strokeWidth="0.5"
            />
          </pattern>
          <rect
            x="380"
            y="100"
            width="200"
            height="220"
            rx="12"
            fill="url(#clusterGrid)"
          />
          <text
            x="480"
            y="320"
            className="fill-[color:var(--primary)] text-xs font-medium"
            textAnchor="middle"
          >
            EKS Cluster
          </text>
        </g>

        {/* Connection Lines */}
        {paths.map((path, i) => (
          <line
            key={i}
            x1={path.from.x}
            y1={path.from.y}
            x2={path.to.x}
            y2={path.to.y}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            strokeDasharray="4,4"
          >
            {!shouldReduceMotion && (
              <animate
                attributeName="stroke-dashoffset"
                from="8"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>
        ))}

        {/* User Node */}
        <g>
          <circle
            cx={nodes.user.x}
            cy={nodes.user.y}
            r="24"
            className="fill-secondary stroke-border"
            strokeWidth="2"
          />
          {/* Simple user icon */}
          <circle cx={nodes.user.x} cy={nodes.user.y - 4} r="6" className="fill-[color:var(--primary)]" />
          <path
            d={`M ${nodes.user.x - 10} ${nodes.user.y + 12} Q ${nodes.user.x} ${nodes.user.y + 6} ${nodes.user.x + 10} ${nodes.user.y + 12}`}
            className="fill-[color:var(--primary)]"
          />
          {!shouldReduceMotion && (
            <circle cx={nodes.user.x} cy={nodes.user.y} r="24" className="fill-none stroke-[color:var(--primary)]" strokeWidth="2" opacity="0">
              <animate attributeName="r" values="24;32;24" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
          )}
          <text
            x={nodes.user.x}
            y={nodes.user.y + 40}
            className="fill-foreground text-xs font-medium"
            textAnchor="middle"
          >
            {nodes.user.label}
          </text>
        </g>

        {/* IAM Node */}
        <g>
          <rect
            x={nodes.iam.x - 24}
            y={nodes.iam.y - 24}
            width="48"
            height="48"
            rx="8"
            className="fill-secondary stroke-border"
            strokeWidth="2"
          />
          <image
            href="/aws-icons/Architecture-Service-Icons_07312025/Arch_Security-Identity-Compliance/48/Arch_AWS-Identity-and-Access-Management_48.svg"
            x={nodes.iam.x - 20}
            y={nodes.iam.y - 20}
            width="40"
            height="40"
          />
          {!shouldReduceMotion && (
            <rect
              x={nodes.iam.x - 24}
              y={nodes.iam.y - 24}
              width="48"
              height="48"
              rx="8"
              className="fill-none stroke-[color:var(--accent-hover)]"
              strokeWidth="2"
              opacity="0"
            >
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </rect>
          )}
          <text
            x={nodes.iam.x}
            y={nodes.iam.y + 40}
            className="fill-foreground text-xs font-medium"
            textAnchor="middle"
          >
            SSO / IAM
          </text>
        </g>

        {/* WAF/ALB Node */}
        <g>
          <rect
            x={nodes.waf.x - 28}
            y={nodes.waf.y - 28}
            width="56"
            height="56"
            rx="8"
            className="fill-secondary stroke-border"
            strokeWidth="2"
          />
          <image
            href="/aws-icons/Architecture-Service-Icons_07312025/Arch_Security-Identity-Compliance/48/Arch_AWS-WAF_48.svg"
            x={nodes.waf.x - 20}
            y={nodes.waf.y - 28}
            width="40"
            height="40"
          />
          <image
            href="/aws-icons/Architecture-Service-Icons_07312025/Arch_Networking-Content-Delivery/48/Arch_Elastic-Load-Balancing_48.svg"
            x={nodes.waf.x - 20}
            y={nodes.waf.y - 4}
            width="40"
            height="40"
          />
          {!shouldReduceMotion && (
            <rect
              x={nodes.waf.x - 28}
              y={nodes.waf.y - 28}
              width="56"
              height="56"
              rx="8"
              className="fill-none stroke-[color:var(--primary)]"
              strokeWidth="2"
              opacity="0"
            >
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" begin="1s" />
            </rect>
          )}
          <text
            x={nodes.waf.x}
            y={nodes.waf.y + 42}
            className="fill-foreground text-xs font-medium"
            textAnchor="middle"
          >
            WAF / ALB
          </text>
        </g>

        {/* Ingress Node (inside EKS) */}
        <g>
          <rect
            x={nodes.ingress.x - 20}
            y={nodes.ingress.y - 20}
            width="40"
            height="40"
            rx="6"
            className="fill-[color:var(--accent-soft)] stroke-[color:var(--accent-border-medium)]"
            strokeWidth="1.5"
          />
          <text
            x={nodes.ingress.x}
            y={nodes.ingress.y + 4}
            className="fill-[color:var(--primary)] text-[10px] font-medium"
            textAnchor="middle"
          >
            Ingress
          </text>
        </g>

        {/* Service Node (inside EKS) */}
        <g>
          <rect
            x={nodes.service.x - 24}
            y={nodes.service.y - 20}
            width="48"
            height="40"
            rx="6"
            className="fill-[color:var(--accent-soft)] stroke-[color:var(--accent-border-medium)]"
            strokeWidth="1.5"
          />
          <text
            x={nodes.service.x}
            y={nodes.service.y + 4}
            className="fill-[color:var(--primary)] text-[10px] font-medium"
            textAnchor="middle"
          >
            Service
          </text>
        </g>

        {/* Pods (3 small circles inside EKS) */}
        {[nodes.pod1, nodes.pod2, nodes.pod3].map((pod, i) => (
          <g key={i}>
            <circle
              cx={pod.x}
              cy={pod.y}
              r="12"
              className="fill-[color:var(--accent-soft)] stroke-[color:var(--accent-border-medium)]"
              strokeWidth="1.5"
            />
            <circle cx={pod.x} cy={pod.y} r="4" className="fill-[color:var(--accent-hover)]" />
            {!shouldReduceMotion && (
              <circle
                cx={pod.x}
                cy={pod.y}
                r="12"
                className="fill-none stroke-[color:var(--accent-hover)]"
                strokeWidth="1"
                opacity="0"
              >
                <animate
                  attributeName="r"
                  values="12;16;12"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                />
              </circle>
            )}
          </g>
        ))}

        {/* Animated Data Flow Dot (Request) */}
        {!shouldReduceMotion && (
          <g>
            <circle r="4" className="fill-[color:var(--primary)]" filter="url(#glow)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path={dataFlowPath}
              />
            </circle>
            {/* Label following the dot */}
            <text className="fill-[color:var(--primary)] text-[9px] font-medium" textAnchor="middle">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path={dataFlowPath}
              />
              Request
            </text>
          </g>
        )}

        {/* Animated Data Flow Dot (Response - offset timing) */}
        {!shouldReduceMotion && (
          <circle r="3" className="fill-[color:var(--accent-hover)]" filter="url(#glow)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={dataFlowPath}
              begin="2s"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}
