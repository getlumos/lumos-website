import { Check, X, ArrowRight } from "lucide-react";

export const WhenToUse = () => {
  const useWhen = [
    {
      title: "Building Solana Programs",
      description: "You're developing on Solana and need type-safe schemas for accounts and instructions"
    },
    {
      title: "Multi-Language Projects",
      description: "You need consistent types across Rust (on-chain) and TypeScript (client-side)"
    },
    {
      title: "Anchor Framework Users",
      description: "You want automated account struct generation with space constants and IDL"
    },
    {
      title: "NFT & Token Projects",
      description: "Building with Metaplex Token Metadata and need validated schemas"
    },
    {
      title: "Teams with Multiple Developers",
      description: "Schema-first approach ensures everyone works from the same source of truth"
    },
    {
      title: "Borsh Serialization Required",
      description: "You need guaranteed binary serialization compatibility across languages"
    }
  ];

  const dontUseWhen = [
    {
      title: "Non-Solana Projects",
      description: "LUMOS is specifically designed for Solana/Borsh serialization"
    },
    {
      title: "Simple Single-Language Apps",
      description: "If you only need Rust OR TypeScript, direct implementation may be simpler"
    },
    {
      title: "Non-Borsh Serialization",
      description: "LUMOS generates Borsh-compatible code; use other tools for JSON/Protobuf"
    },
    {
      title: "Existing Mature Codebases",
      description: "Adding LUMOS to large existing projects may require significant refactoring"
    }
  ];

  return (
    <section id="when-to-use" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Is LUMOS Right for You?
            </h2>
            <p className="text-lg text-muted-foreground">
              LUMOS is designed for specific use cases. Here's how to know if it's a good fit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* When to Use */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-500">Use LUMOS When</h3>
              </div>

              <div className="space-y-4">
                {useWhen.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-secondary/30 border border-green-500/20 hover:border-green-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* When NOT to Use */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-500">Don't Use LUMOS When</h3>
              </div>

              <div className="space-y-4">
                {dontUseWhen.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-secondary/30 border border-red-500/20 hover:border-red-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alternative suggestion */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Not sure?</strong> LUMOS works best for new Solana projects
                  or when refactoring to improve type safety. Start with a small schema and expand from there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
