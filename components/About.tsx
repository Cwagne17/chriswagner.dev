"use client";

import { motion } from "motion/react";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 relative">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-32 h-32 mx-auto mb-8 relative"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center overflow-hidden">
              <Image
                src="/portrait.jpeg"
                alt="Christopher Wagner"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
            <div className="absolute -inset-2 rounded-full border border-purple-500/20 animate-pulse delay-1000"></div>
          </motion.div>

          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="mb-6">
              I am a passionate Cloud Engineer and Infrastructure Architect with
              five years of experience designing, deploying, and optimizing
              systems on Amazon Web Services (AWS). I currently work at the
              Naval Supply Systems Command (NAVSUP) and with SecurEd Inc., where
              I focus on building secure, scalable, and cost-effective cloud
              solutions.
            </p>
            <p className="mb-6">
              My expertise lies in Infrastructure as Code, DevOps practices, and
              containerized architectures. I help development teams modernize
              their applications by designing, deploying, and optimizing systems
              that leverage containers and cloud-native services. Whether
              re-platforming legacy workloads or implementing new cloud-native
              solutions, I ensure that the architectures I deliver are
              efficient, resilient, and aligned with business goals. I also hold
              multiple certifications, including CCSP, AWS certifications, and
              Kubernetes certifications.
            </p>
            <p>
              I’m particularly passionate about automation, security, and
              building architectures that are grounded in performance,
              standardization, and best practices. I take pride in creating
              solutions that not only work but work well — reliably,
              efficiently, and in ways that can be repeated and scaled. Outside
              of work, I love exploring open-source projects and keeping up with
              the latest in technology. Beyond tech, I enjoy playing music,
              challenging myself with CrossFit, and traveling to national parks
              to recharge and find inspiration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
