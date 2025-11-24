import { Button } from "@/components/ui/button";
import { Github, Star, GitFork } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Start Building
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Type-Safe </span>
              Solana Apps
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join developers building production Solana applications with schema-first code generation.
            </p>
          </div>

          {/* GitHub Stats */}
          <div className="flex flex-wrap gap-4 justify-center py-4">
            <div className="px-4 py-2 rounded-lg bg-card border border-border flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Open Source</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-card border border-border flex items-center gap-2">
              <GitFork className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">MIT & Apache-2.0</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-card border border-border flex items-center gap-2">
              <Github className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">getlumos</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              variant="hero"
              size="lg"
              className="group text-lg"
              asChild
            >
              <a href="https://github.com/getlumos/lumos" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                Get Started on GitHub
                <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
          </div>

          {/* License info */}
          <p className="text-sm text-muted-foreground pt-8">
            Free and open source • Licensed under MIT and Apache-2.0
          </p>
        </div>
      </div>
    </section>
  );
};
