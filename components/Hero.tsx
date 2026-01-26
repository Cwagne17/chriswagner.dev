"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { CommandConsole } from "./hero/CommandConsole";
import { Button } from "./ui";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden pb-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,100,255,0.1),transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-1 h-1 bg-purple-500/40 rounded-full"
        animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-cyan-500/35 rounded-full"
        animate={{ y: [0, -25, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Bottom fade to hint at content below */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-[5]"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                I build secure, compliant cloud platforms that scale.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Cloud Engineer & Solutions Architect specializing in Kubernetes, IaC, and enterprise automation.
              </p>
            </div>


            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/projects">
                <Button size="lg" rightIcon={ArrowRight}>
                  View Case Studies
                </Button>
              </Link>
              <Button 
                variant="secondary" 
                size="lg" 
                leftIcon={Mail}
                onClick={scrollToContact}
              >
                Get In Touch
              </Button>
            </motion.div>

            {/* Currently line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-xs text-muted-foreground/60"
            >
              Currently: Zero Trust architectures + multi-account AWS platforms
            </motion.p>
          </motion.div>

          {/* Right Column - Command Console */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <CommandConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
