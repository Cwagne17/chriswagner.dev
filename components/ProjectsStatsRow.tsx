"use client";

import { motion } from "motion/react";

interface ProjectsStatsRowProps {
  projectCount: number;
  yearsExperience: number;
}

export function ProjectsStatsRow({ projectCount, yearsExperience }: ProjectsStatsRowProps) {
  const stats = [
    { label: "Projects", value: projectCount.toString() },
    { label: "Focus Areas", value: "Security, Cloud, DevOps" },
    { label: "Years Experience", value: `${yearsExperience}+` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-3 gap-4 mb-12 py-6 px-6 rounded-lg bg-secondary/30 border border-border/50"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {stat.value}
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
