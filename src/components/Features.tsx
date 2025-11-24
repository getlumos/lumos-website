import { Card } from "@/components/ui/card";
import { Zap, Target, Wrench, FileCode, Rocket, Palette } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Context-Aware Generation",
      description: "Automatically detects Anchor vs pure Borsh contexts. Generates correct imports and derives for your program structure.",
    },
    {
      icon: Target,
      title: "Full Type Support",
      description: "Primitives (u8-u128, i8-i128), Solana types (PublicKey, Signature), complex types (Vec, Option), and enums with discriminants.",
    },
    {
      icon: Wrench,
      title: "Seamless Anchor Integration",
      description: "Use #[account] attribute for Anchor programs. LUMOS handles all the integration automatically with proper derives.",
    },
    {
      icon: FileCode,
      title: "TypeScript + Borsh",
      description: "Generated TypeScript interfaces include Borsh serialization schemas with guaranteed compatibility across Rust and TS.",
    },
    {
      icon: Rocket,
      title: "Production Ready",
      description: "142/142 tests passing, v0.1.1 published to crates.io. Zero warnings, zero vulnerabilities. Battle-tested and reliable.",
    },
    {
      icon: Palette,
      title: "VSCode Extension",
      description: "Syntax highlighting, IntelliSense, diagnostics, quick fixes, and format-on-save. Published to VS Marketplace (v0.5.0).",
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
            Schema-first type generation for production Solana applications
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
