"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-cyan-500/35 rounded-full"
        animate={{ y: [0, -25, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-blue-500 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Chris Wagner
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Cloud Engineer & Infrastructure Architect
          </motion.p>
          <motion.p 
            className="text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Building scalable, secure cloud solutions with modern DevOps practices
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            onClick={scrollToAbout}
            className="group flex flex-col items-center gap-2 cursor-pointer border-none bg-transparent p-2"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label="Scroll to about section"
          >
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Learn more
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 group-hover:border-blue-500/50 transition-colors flex items-center justify-center"
            >
              <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-blue-500 transition-colors" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
