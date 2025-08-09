import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="text-xl font-bold font-serif">Chris Wagner</div>
        <nav className="flex gap-6 text-sm font-medium text-muted">
          <Link href="#about" className="hover:text-text transition-colors">
            About
          </Link>
          <Link
            href="#experience"
            className="hover:text-text transition-colors"
          >
            Experience
          </Link>
          <Link href="#projects" className="hover:text-text transition-colors">
            Projects
          </Link>
          <Link href="#certs" className="hover:text-text transition-colors">
            Certs
          </Link>
          <Link href="#contact" className="hover:text-text transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
