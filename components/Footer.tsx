const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-6 bg-gradient-to-r from-background to-secondary/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted-foreground">
          © {currentYear} Chris Wagner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
