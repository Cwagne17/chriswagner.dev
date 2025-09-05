"use client";

import { Certification } from "@/types/certification";
import { Award } from "lucide-react";
import { motion } from "motion/react";

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
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
              <p className="text-sm text-blue-500 font-medium">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
