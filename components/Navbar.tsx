"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Mail } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useScrollY } from "@/hooks/useScrollY";
import { THEME_CLASSES } from "@/lib/theme";
import { cn } from "@/lib/utils";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const scrollY = useScrollY();
  const shouldReduceMotion = useReducedMotion();

  const isScrolled = scrollY >= 80;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on ESC
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/#about", label: "About" },
    { href: "/#certifications", label: "Certifications" },
    { href: "/#experience", label: "Experience" },
  ];

  const allMobileLinks = [
    ...navLinks,
    { href: "/#contact", label: "Contact" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const transitionDuration = shouldReduceMotion ? 0 : 0.3;

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[color:var(--primary)] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-2"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
        style={{
          transitionDuration: `${transitionDuration}s`,
        }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 lg:px-12 py-4">
          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-bold hover:text-[color:var(--primary)] transition-colors z-10"
          >
            Chris Wagner
          </Link>

          {/* Desktop Navigation - Only show when scrolled */}
          <AnimatePresence>
            {isScrolled && (
              <motion.nav
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: transitionDuration }}
                className="hidden md:flex items-center gap-6 text-sm font-medium"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${THEME_CLASSES.gradient.brand} group-hover:w-full transition-all duration-300`}></span>
                  </Link>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Right side - Always visible */}
          <div className="flex items-center gap-3">
            {/* Contact Button - Desktop only, always in DOM to prevent layout shift */}
            <button
              onClick={scrollToContact}
              className={cn(
                `hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${THEME_CLASSES.gradient.brand} text-white rounded-lg text-sm font-medium hover:brightness-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-2 transition-all`,
                isScrolled
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              )}
              style={{
                transitionDuration: `${transitionDuration}s`,
              }}
              tabIndex={isScrolled ? 0 : -1}
              aria-hidden={!isScrolled}
            >
              <Mail className="w-4 h-4" />
              Contact
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border/50 hover:border-[color:var(--accent-border-medium)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-2"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className={`h-4 w-4 ${THEME_CLASSES.text.brand}`} />
                ) : (
                  <Moon className={`h-4 w-4 ${THEME_CLASSES.text.brand}`} />
                ))}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border/50 hover:border-[color:var(--accent-border-medium)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm"
            >
              <nav className="px-6 py-4 space-y-3">
                {allMobileLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.05,
                      duration: shouldReduceMotion ? 0 : 0.2,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block text-muted-foreground hover:text-foreground transition-colors py-2 border-l-2 border-transparent hover:border-[color:var(--accent-border-medium)] pl-4 focus:outline-none focus:border-[color:var(--accent-border-medium)] focus:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content anchor */}
      <div id="main-content" />
    </>
  );
}

export default Navbar;
