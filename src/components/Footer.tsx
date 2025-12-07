import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Vision", href: "/vision" },
      { label: "Examples", href: "/examples" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.lumos-lang.org", external: true },
      { label: "Getting Started", href: "https://docs.lumos-lang.org/guide/getting-started", external: true },
      { label: "API Reference", href: "https://docs.lumos-lang.org/api", external: true },
      { label: "awesome-lumos", href: "https://github.com/getlumos/awesome-lumos", external: true },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/getlumos", external: true },
      { label: "Discussions", href: "https://github.com/getlumos/lumos/discussions", external: true },
      { label: "Contributing", href: "https://github.com/getlumos/lumos/blob/main/CONTRIBUTING.md", external: true },
      { label: "Community Hub", href: "/community" },
    ],
  },
  {
    title: "Editors",
    links: [
      { label: "VS Code", href: "https://marketplace.visualstudio.com/items?itemName=getlumos.lumos", external: true },
      { label: "IntelliJ IDEA", href: "https://github.com/getlumos/intellij-lumos", external: true },
      { label: "Neovim", href: "https://github.com/getlumos/nvim-lumos", external: true },
      { label: "Emacs", href: "https://github.com/getlumos/lumos-mode", external: true },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-lg font-bold text-white">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LUMOS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Type-safe schemas for Solana. Write once, generate everywhere.
            </p>
            <a
              href="https://github.com/getlumos/lumos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Sitemap */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LUMOS Contributors. Licensed under{" "}
            <a href="https://opensource.org/licenses/MIT" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">MIT</a>
            {" "}and{" "}
            <a href="https://opensource.org/licenses/Apache-2.0" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">Apache-2.0</a>.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built for Solana</span>
            <span>•</span>
            <span>v0.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
