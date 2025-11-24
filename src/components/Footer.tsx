import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Lumos
            </h3>
            <p className="text-sm text-muted-foreground">
              Type-safe schemas for Solana
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/getlumos/lumos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 LUMOS Contributors. Licensed under MIT and Apache-2.0.</p>
        </div>
      </div>
    </footer>
  );
};
