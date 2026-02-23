import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-6 bg-gradient-to-r from-background to-secondary/10">
      <div className="max-w-6xl mx-auto text-center">
        <Link
          href="/admin"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Admin access"
        >
          © {currentYear} Chris Wagner. All rights reserved.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
