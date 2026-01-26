"use client";

import { Certification } from "@/types/certification";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <section id="certifications" className="py-20 px-6 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certifications & Credentials
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-prose">
            Industry-recognized certifications validating expertise in cloud security, compliance, and infrastructure management.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-card rounded-lg border border-border p-6 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Badge/Icon Container */}
                <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300 overflow-hidden border border-blue-500/20 group-hover:border-blue-500/40">
                  {cert.badge ? (
                    <Image
                      src={cert.badge}
                      alt={`${cert.title} badge`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Award className="w-8 h-8 text-blue-500" />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-blue-500 transition-colors duration-300">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-sm text-muted-foreground mb-4">
                  {cert.issuer}
                </p>

                {/* External Link Indicator */}
                <div className="flex items-center gap-2 text-blue-500 group-hover:gap-3 transition-all duration-300 text-sm font-medium">
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
