import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Layers, Zap, Shield, Rocket, Code, Package, CheckCircle, XCircle } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Vision = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              The <span className="bg-gradient-primary bg-clip-text text-transparent">Workflow Language</span>
              <br />for Solana
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From schema definitions today to full workflow automation tomorrow.
              <br />
              <strong className="text-foreground">Think: Hardhat for Ethereum, purpose-built for Solana.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Stack Visualization */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Where <span className="bg-gradient-primary bg-clip-text text-transparent">LUMOS</span> Sits
            </h2>
            <p className="text-muted-foreground">Understanding the Solana development stack</p>
          </div>

          <div className="space-y-3">
            {[
              { level: 5, name: "Application Layer", desc: "Wallets, dApps, Dashboards", examples: "Phantom, Jupiter, Magic Eden", highlight: false },
              { level: 4, name: "Workflow/Orchestration", desc: "Type-safe automation, deployment, testing", examples: "LUMOS (ENDGAME)", highlight: true },
              { level: 3, name: "Client/SDK Layer", desc: "Libraries to interact with programs", examples: "@solana/web3.js, Anchor TS", highlight: false },
              { level: 2, name: "Program/Contract Layer", desc: "Languages to write smart contracts", examples: "Rust + Anchor, Seahorse", highlight: false },
              { level: 1, name: "Runtime/VM Layer", desc: "Blockchain runtime, virtual machine", examples: "Sealevel, BPF VM", highlight: false },
            ].map((layer) => (
              <Card
                key={layer.level}
                className={`p-4 sm:p-6 transition-all duration-300 ${
                  layer.highlight
                    ? "bg-gradient-accent border-accent shadow-accent-glow"
                    : "bg-card border-border hover:border-accent/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                    layer.highlight ? "bg-background text-accent" : "bg-secondary text-muted-foreground"
                  }`}>
                    L{layer.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${layer.highlight ? "text-accent-foreground" : "text-foreground"}`}>
                        {layer.name}
                      </h3>
                      {layer.highlight && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-background text-accent rounded-full">
                          LUMOS TARGET
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${layer.highlight ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                      {layer.desc}
                    </p>
                  </div>
                  <div className={`text-sm ${layer.highlight ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                    {layer.examples}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            <strong className="text-foreground">Key Insight:</strong> LUMOS targets Level 4 (Workflow), NOT Level 2 (Smart Contracts).
            <br />We're not replacing Anchor. We're building what doesn't exist yet.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              The <span className="text-red-400">Problem</span> We're Solving
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="p-6 border-red-500/30 bg-red-500/5">
              <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Today: Fragmented Chaos
              </h3>
              <div className="bg-background/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">
{`# Typical deployment (5+ tools, no types)
anchor build          # Rust
solana deploy         # Solana CLI
ts-node init.ts       # TypeScript
python airdrop.py     # Python
solana logs           # Manual

# Hope nothing breaks...`}
                </pre>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> No type safety across tools</li>
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> Error-prone (silent failures)</li>
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> 5 different syntaxes</li>
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> Not reusable</li>
              </ul>
            </Card>

            {/* After */}
            <Card className="p-6 border-green-500/30 bg-green-500/5">
              <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Tomorrow: LUMOS
              </h3>
              <div className="bg-background/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-green-300/80">
{`import { deploy, init, airdrop }
  from "lumos-solana"

fn main() {
  let prog = deploy(".", "mainnet")
  initialize(prog, config)
  airdrop(users, lamports(1_000_000))
}

main() // Type-safe, one language`}
                </pre>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Type-safe end-to-end</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Single language</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Reusable packages</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> IDE autocomplete + LSP</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              The <span className="bg-gradient-primary bg-clip-text text-transparent">Evolution</span>
            </h2>
            <p className="text-muted-foreground">From utility tool to dominant platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: "NOW",
                version: "v0.2.0",
                title: "Schema Generator",
                desc: "Type definitions, code generation, Borsh serialization",
                position: "Level 2-3 (Utility)",
                icon: Code,
                active: true,
              },
              {
                phase: "2026",
                version: "Phase 5-6",
                title: "Complete DSL",
                desc: "Full schema language, advanced types, module system",
                position: "Level 3 (Focused)",
                icon: Package,
              },
              {
                phase: "2027",
                version: "ENDGAME",
                title: "Workflow Language",
                desc: "Native execution, package ecosystem, multi-target compilation",
                position: "Level 4 (DOMINANT)",
                icon: Rocket,
                highlight: true,
              },
            ].map((stage) => {
              const Icon = stage.icon;
              return (
                <Card
                  key={stage.phase}
                  className={`p-6 text-center transition-all duration-300 ${
                    stage.highlight
                      ? "bg-gradient-accent border-accent shadow-accent-glow"
                      : stage.active
                      ? "bg-primary/10 border-primary/50"
                      : "bg-card border-border"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    stage.highlight ? "bg-background" : "bg-secondary"
                  }`}>
                    <Icon className={`w-8 h-8 ${stage.highlight ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{stage.phase}</div>
                  <div className={`text-lg font-bold mb-2 ${stage.highlight ? "text-accent-foreground" : ""}`}>
                    {stage.title}
                  </div>
                  <p className={`text-sm mb-3 ${stage.highlight ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                    {stage.desc}
                  </p>
                  <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                    stage.highlight ? "bg-background text-accent" : "bg-secondary text-muted-foreground"
                  }`}>
                    {stage.position}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              LUMOS vs <span className="bg-gradient-primary bg-clip-text text-transparent">The Ecosystem</span>
            </h2>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                    <th className="px-6 py-4 text-center font-semibold">Anchor</th>
                    <th className="px-6 py-4 text-center font-semibold">Hardhat</th>
                    <th className="px-6 py-4 text-center font-semibold bg-accent/20 text-accent">LUMOS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { aspect: "Purpose", anchor: "Write programs", hardhat: "ETH workflows", lumos: "Solana workflows" },
                    { aspect: "Layer", anchor: "Level 2", hardhat: "Level 4", lumos: "Level 4" },
                    { aspect: "Type Safety", anchor: "Rust only", hardhat: "Limited (TS)", lumos: "Full stack" },
                    { aspect: "Solana Native", anchor: true, hardhat: false, lumos: true },
                    { aspect: "Workflow Automation", anchor: false, hardhat: true, lumos: true },
                    { aspect: "Package Ecosystem", anchor: false, hardhat: true, lumos: "Coming" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.aspect}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {typeof row.anchor === "boolean" ? (
                          row.anchor ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        ) : row.anchor}
                      </td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {typeof row.hardhat === "boolean" ? (
                          row.hardhat ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        ) : row.hardhat}
                      </td>
                      <td className="px-6 py-4 text-center bg-accent/10 font-medium text-accent">
                        {typeof row.lumos === "boolean" ? (
                          row.lumos ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        ) : row.lumos}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-center text-muted-foreground mt-6">
            <strong className="text-foreground">Key:</strong> LUMOS complements Anchor (Level 2) by automating Level 4 workflows.
          </p>
        </div>
      </section>

      {/* Why LUMOS Wins */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why LUMOS <span className="bg-gradient-primary bg-clip-text text-transparent">Wins</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Layers,
                title: "Category Creator",
                desc: "First to define 'type-safe workflow automation for Solana'. We own the vocabulary, we own the category.",
              },
              {
                icon: Shield,
                title: "Deep Technical Moat",
                desc: "Type system, compiler, runtime, LSP, package ecosystem. Takes 2-3 years to replicate.",
              },
              {
                icon: Zap,
                title: "Solana-Native Design",
                desc: "First-class Pubkey, Lamports, Signature types. Anchor IDL integration. Account model awareness.",
              },
              {
                icon: Rocket,
                title: "Execution Speed",
                desc: "3-5 commits/day pace. By the time competitors validate the idea, we're 12 months ahead.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="p-6 hover:border-accent/50 transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Build the <span className="bg-gradient-primary bg-clip-text text-transparent">Future</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join us in creating the workflow automation standard for Solana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="https://docs.lumos-lang.org/getting-started/quick-start" target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://docs.lumos-lang.org/guides/vision" target="_blank" rel="noopener noreferrer">
                Read Full Vision
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/getlumos/lumos" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Vision;
