import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Menu, X, ExternalLink } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Vision", href: "/vision" },
  { label: "Examples", href: "/examples" },
  { label: "Blog", href: "/blog" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Changelog", href: "/changelog" },
  { label: "Community", href: "/community" },
  { label: "Docs", href: "https://docs.lumos-lang.org", external: true },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="LUMOS" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LUMOS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/getlumos/lumos" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="https://github.com/getlumos/lumos" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
