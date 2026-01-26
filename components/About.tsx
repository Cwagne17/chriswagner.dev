"use client";

import { Cloud, Code2, Shield } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { PillarCard } from "./ui/PillarCard";

const About = () => {
  const pillars = [
    {
      title: "Cloud Architecture",
      icon: Cloud,
      bullets: [
        "Design scalable, resilient AWS infrastructure",
        "Optimize for performance and cost efficiency"
      ],
      tools: ["AWS", "EKS", "WorkSpaces", "Lambda"]
    },
    {
      title: "Infrastructure as Code",
      icon: Code2,
      bullets: [
        "Automate deployments with Terraform & CDK",
        "Enable self-service infrastructure provisioning"
      ],
      tools: ["Terraform", "AWS CDK", "CloudFormation"]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      bullets: [
        "Implement STIG controls and compliance automation",
        "Build Zero Trust architectures"
      ],
      tools: ["STIG", "CCSP", "Zero Trust", "IAM"]
    }
  ];

  return (
    <section id="about" className="py-20 px-6 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                About
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6" />
            </div>

            {/* Profile Picture - Centered in left column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-32 h-32 relative mx-auto"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                  <Image
                    src="/portrait.jpeg"
                    alt="Christopher Wagner"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
            </motion.div>
            
            <div className="space-y-4 text-muted-foreground max-w-prose">
              <p className="leading-relaxed">
                Cloud Engineer and Infrastructure Architect with five years of experience building secure, 
                scalable AWS platforms. Currently at Naval Supply Systems Command (NAVSUP) and SecurEd Inc., 
                focusing on compliance automation and Zero Trust architectures.
              </p>
              <p className="leading-relaxed">
                I specialize in Infrastructure as Code, containerized workloads, and DevOps practices. 
                My approach: automate everything, secure by default, and build systems that scale reliably. 
                Certified in CCSP, AWS, and Kubernetes.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Pillars */}
          <div className="space-y-4">
            {pillars.map((pillar, index) => (
              <PillarCard key={index} {...pillar} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
