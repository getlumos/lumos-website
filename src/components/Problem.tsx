import { Card } from "@/components/ui/card";
import { AlertTriangle, Code2, RefreshCcw } from "lucide-react";

export const Problem = () => {
  const problems = [
    {
      icon: Code2,
      title: "Duplicate Type Definitions",
      description: "Maintaining separate type definitions in TypeScript and Rust leads to inconsistencies and bugs.",
    },
    {
      icon: RefreshCcw,
      title: "Manual Synchronization",
      description: "Every change requires manually updating types across both languages, wasting valuable development time.",
    },
    {
      icon: AlertTriangle,
      title: "Type Mismatches",
      description: "Human errors in type synchronization cause runtime errors that are difficult to debug in production.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold">
            The Problem with
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Full-Stack Solana</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building full-stack Solana applications means managing types in both TypeScript and Rust, leading to maintenance nightmares.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
