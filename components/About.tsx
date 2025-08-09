"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";

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

          {/* Profile Picture Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-32 h-32 mx-auto mb-8 relative"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center overflow-hidden">
              <User className="w-16 h-16 text-muted-foreground/50" />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
            <div className="absolute -inset-2 rounded-full border border-purple-500/20 animate-pulse delay-1000"></div>
          </motion.div>

          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="mb-6">
              I am a passionate cloud engineer with expertise in AWS,
              infrastructure as code, and DevOps practices. With over 4
              years of experience, I specialize in building scalable,
              secure, and cost-effective cloud solutions.
            </p>
            <p className="mb-6">
              My approach combines deep technical knowledge with business
              acumen, ensuring that every solution I deliver not only meets
              technical requirements but also drives business value. I am
              particularly passionate about automation, security, and
              helping teams adopt modern cloud-native practices.
            </p>
            <p>
              When I am not architecting cloud solutions, you can find me
              contributing to open-source projects, staying current with the
              latest cloud technologies, and mentoring aspiring cloud
              engineers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
