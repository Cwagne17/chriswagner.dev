"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "./Badge";

export interface PillarCardProps {
  title: string;
  icon: LucideIcon;
  bullets: string[];
  tools: string[];
  index?: number;
}

export function PillarCard({ title, icon: Icon, bullets, tools, index = 0 }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-secondary/30 rounded-lg p-6 border border-border hover:border-blue-500/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <ul className="space-y-2 mb-4">
        {bullets.map((bullet, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2">
        {tools.map((tool, i) => (
          <Badge key={i} variant="muted" size="sm">
            {tool}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
