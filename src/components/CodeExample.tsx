import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export const CodeExample = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Before & After
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Lumos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the difference Lumos makes in your development workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Without Lumos */}
          <Card className="p-6 bg-card border-destructive/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-destructive" />
                <h3 className="text-xl font-semibold text-foreground">Without Lumos</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="text-muted-foreground mb-2">// program/src/state.rs</div>
                  <pre className="text-foreground font-mono text-xs leading-relaxed overflow-x-auto">
{`#[account]
pub struct PlayerAccount {
    pub wallet: Pubkey,
    pub level: u16,
    pub experience: u64,
}`}
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="text-muted-foreground mb-2">// client/src/types.ts (manually written)</div>
                  <pre className="text-foreground font-mono text-xs leading-relaxed overflow-x-auto">
{`interface PlayerAccount {
  wallet: PublicKey;
  level: number;
  experience: number; // ⚠️ Precision issue!
}
// ⚠️ No Borsh schema - manual serialization`}
                  </pre>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-destructive">
                    Manual duplication • Type mismatches • Missing Borsh compatibility • Runtime bugs
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* With Lumos */}
          <Card className="p-6 bg-card border-primary/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">With Lumos</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
                  <div className="text-primary mb-2">// schema.lumos (single source of truth) ✨</div>
                  <pre className="text-foreground font-mono text-xs leading-relaxed overflow-x-auto">
{`#[solana]
#[account]
struct PlayerAccount {
    wallet: PublicKey,
    level: u16,
    experience: u64,
}`}
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="text-muted-foreground mb-2">// Auto-generated Rust + TypeScript + Borsh schemas</div>
                  <pre className="text-foreground font-mono text-xs leading-relaxed overflow-x-auto">
{`✅ generated.rs - Perfect Anchor integration
✅ generated.ts - TypeScript interfaces
✅ Borsh schemas - Guaranteed compatibility
✅ JSDoc warnings - u64 precision notes`}
                  </pre>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-primary">
                    Schema-first • Zero duplication • 100% type safety • Borsh guaranteed
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
