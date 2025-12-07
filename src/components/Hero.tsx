import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Sparkles, Eye, Code } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Open Source • Schema-First • Type-Safe</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Type-Safe</span> Schemas for Solana
            <br />
            Write Once. Zero Bugs.
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Define data structures in .lumos syntax. Generate production-ready Rust + TypeScript with guaranteed Borsh compatibility.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="hero"
              size="lg"
              className="group"
              asChild
            >
              <a href="https://github.com/getlumos/lumos" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                View on GitHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href="#documentation">
                Read Documentation
              </a>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
            >
              <Link to="/vision">
                <Eye className="w-5 h-5" />
                Our Vision
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
            >
              <Link to="/examples">
                <Code className="w-5 h-5" />
                Examples
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center pt-8 text-sm">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">142/142</div>
              <div className="text-muted-foreground">Tests Passing</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">v0.1.1</div>
              <div className="text-muted-foreground">Latest Stable</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-muted-foreground">Type Safety</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
