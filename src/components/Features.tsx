import { Card } from "@/components/ui/card";
import { Zap, ArrowLeftRight, Shield, Blocks, Sparkles, Rocket } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: ArrowLeftRight,
      title: "Bidirectional Generation",
      description: "Generate TypeScript types from Rust or Rust types from TypeScript - your choice, your workflow.",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description: "Changes in one language automatically propagate to the other, keeping your codebase perfectly synchronized.",
    },
    {
      icon: Shield,
      title: "Type Safety Guaranteed",
      description: "Compile-time verification ensures your types are always correct across both languages.",
    },
    {
      icon: Blocks,
      title: "Solana-Optimized",
      description: "Built specifically for Solana development patterns, supporting accounts, instructions, and program structures.",
    },
    {
      icon: Sparkles,
      title: "Zero Configuration",
      description: "Smart defaults and intuitive API mean you can start generating types in minutes, not hours.",
    },
    {
      icon: Rocket,
      title: "Developer Velocity",
      description: "Focus on building features instead of maintaining type definitions. Ship faster with confidence.",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Why Choose
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Lumos</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The most powerful type generation framework for Solana developers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-accent-glow group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
