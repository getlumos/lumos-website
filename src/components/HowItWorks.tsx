import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Define Your Types",
      description: "Write your data structures in either TypeScript or Rust using your preferred language.",
      language: "TypeScript",
    },
    {
      number: "02",
      title: "Run Lumos",
      description: "Execute the Lumos code generation tool with a simple command or integrated build step.",
      language: "CLI",
    },
    {
      number: "03",
      title: "Get Perfect Types",
      description: "Receive fully-typed, production-ready code in the target language with zero manual work.",
      language: "Rust",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold">
            How It
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to synchronized type definitions
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20 -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow h-full">
                  <div className="space-y-4">
                    {/* Step number */}
                    <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent opacity-20">
                      {step.number}
                    </div>
                    
                    {/* Language badge */}
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {step.language}
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </Card>

                {/* Arrow between steps for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-glow-pulse">
                      <ArrowRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
