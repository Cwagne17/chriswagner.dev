"use client";

import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import type { Experience } from "../types/iPortfolio";

interface ExperienceProps {
  experience: Experience[];
}

const Experience = ({ experience }: ExperienceProps) => {
  return (
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
  );
};

export default Experience;
