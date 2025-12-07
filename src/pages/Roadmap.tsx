import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Check,
  Clock,
  CircleDot,
  Rocket,
  Target,
  Sparkles,
  Code,
  Cpu,
  Globe,
  Package,
  Shield,
  Wrench,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

interface Phase {
  id: string;
  number: string;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  progress: number;
  description: string;
  items: {
    name: string;
    status: "done" | "in-progress" | "planned";
  }[];
}

const era1Phases: Phase[] = [
  {
    id: "5.1",
    number: "5.1",
    title: "Schema Evolution",
    status: "completed",
    progress: 100,
    description: "Support schema changes without breaking deployed programs",
    items: [
      { name: "Schema versioning with #[version]", status: "done" },
      { name: "Automatic migration code generation", status: "done" },
      { name: "Backward compatibility validation", status: "done" },
      { name: "Deprecation warnings", status: "done" },
      { name: "Schema diff tool", status: "done" },
    ],
  },
  {
    id: "5.2",
    number: "5.2",
    title: "IDE Integration",
    status: "completed",
    progress: 100,
    description: "Multi-editor support via Language Server Protocol",
    items: [
      { name: "LSP implementation", status: "done" },
      { name: "IntelliJ IDEA / Rust Rover plugin", status: "done" },
      { name: "Neovim + Tree-sitter", status: "done" },
      { name: "Emacs mode", status: "done" },
      { name: "Sublime Text package", status: "done" },
    ],
  },
  {
    id: "5.3",
    number: "5.3",
    title: "Advanced Type System",
    status: "completed",
    progress: 100,
    description: "Express complex Solana program constraints",
    items: [
      { name: "Custom derive macros", status: "done" },
      { name: "Fixed-size arrays (const generics)", status: "done" },
      { name: "Type aliases and imports", status: "done" },
      { name: "Nested module support", status: "done" },
      { name: "Generic struct/enum definitions", status: "done" },
    ],
  },
  {
    id: "5.4",
    number: "5.4",
    title: "Multi-Language Generation",
    status: "in-progress",
    progress: 71,
    description: "Generate schemas in Python, Go, Ruby alongside Rust & TypeScript",
    items: [
      { name: "Multi-language architecture", status: "done" },
      { name: "Python generator (borsh-construct)", status: "done" },
      { name: "Go generator (borsh tags)", status: "done" },
      { name: "Ruby generator (borsh-rb)", status: "done" },
      { name: "CLI --lang flag", status: "done" },
      { name: "Cross-language compatibility tests", status: "planned" },
    ],
  },
  {
    id: "6.1",
    number: "6.1",
    title: "Framework Integration",
    status: "in-progress",
    progress: 25,
    description: "Deep integration with Solana frameworks",
    items: [
      { name: "Anchor framework plugin", status: "done" },
      { name: "Seahorse integration", status: "planned" },
      { name: "Native Solana program support", status: "planned" },
      { name: "Metaplex compatibility", status: "planned" },
    ],
  },
  {
    id: "6.2",
    number: "6.2",
    title: "Tooling Ecosystem",
    status: "completed",
    progress: 100,
    description: "Developer tools and CI/CD integration",
    items: [
      { name: "cargo lumos subcommand", status: "done" },
      { name: "GitHub Action for CI/CD", status: "done" },
      { name: "Pre-commit hook", status: "done" },
      { name: "@getlumos/cli npm package", status: "done" },
    ],
  },
  {
    id: "6.3",
    number: "6.3",
    title: "Security & Validation",
    status: "completed",
    progress: 100,
    description: "Static analysis and security tooling",
    items: [
      { name: "Vulnerability detection", status: "done" },
      { name: "Account size overflow detection", status: "done" },
      { name: "Security audit generator", status: "done" },
      { name: "Fuzzing support", status: "done" },
    ],
  },
];

const era2Phases: Phase[] = [
  {
    id: "7",
    number: "7",
    title: "Core Language Foundation",
    status: "upcoming",
    progress: 0,
    description: "Transform .lumos from schema DSL to real programming language",
    items: [
      { name: "Extended grammar (variables, functions)", status: "planned" },
      { name: "Lexer & Parser", status: "planned" },
      { name: "AST evaluation engine", status: "planned" },
      { name: "Standard library (core)", status: "planned" },
      { name: "REPL for development", status: "planned" },
    ],
  },
  {
    id: "8",
    number: "8",
    title: "Type System Layer",
    status: "upcoming",
    progress: 0,
    description: "TypeScript-like gradual typing for workflows",
    items: [
      { name: "Type inference", status: "planned" },
      { name: "Generic types (List<T>)", status: "planned" },
      { name: "Solana-native types (Pubkey, Lamports)", status: "planned" },
      { name: "Anchor IDL integration", status: "planned" },
    ],
  },
  {
    id: "9",
    number: "9",
    title: "Compiler & Runtime",
    status: "upcoming",
    progress: 0,
    description: "Execute workflows natively and compile to other formats",
    items: [
      { name: "IR (Intermediate Representation)", status: "planned" },
      { name: "lumos run command", status: "planned" },
      { name: "Package manager (LPM)", status: "planned" },
      { name: "lumos-solana library", status: "planned" },
    ],
  },
];

const statusConfig = {
  completed: { icon: Check, label: "Complete", color: "text-green-400", bg: "bg-green-500/20" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  upcoming: { icon: CircleDot, label: "Upcoming", color: "text-muted-foreground", bg: "bg-secondary" },
};

const itemStatusConfig = {
  done: { icon: Check, color: "text-green-400" },
  "in-progress": { icon: Clock, color: "text-yellow-400" },
  planned: { icon: CircleDot, color: "text-muted-foreground" },
};

const Roadmap = () => {
  const completedCount = era1Phases.filter(p => p.status === "completed").length;
  const totalEra1 = era1Phases.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/getlumos/lumos/blob/main/ROADMAP.md" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Full Roadmap
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border mb-6">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Living Document • Updated Weekly</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">LUMOS</span> Roadmap
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            From schema language to the first type-safe workflow language for Solana.
            Track our progress and see what's coming next.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-400">{completedCount}/{totalEra1}</div>
              <div className="text-muted-foreground">Era 1 Phases</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">Q1 2026</div>
              <div className="text-muted-foreground">DSL Complete</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">2027</div>
              <div className="text-muted-foreground">Full Language</div>
            </div>
          </div>
        </div>
      </section>

      {/* Era 1: DSL Completion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Era 1: DSL Completion</h2>
              <p className="text-muted-foreground">Phases 5-6 • Q1 2026</p>
            </div>
          </div>

          <div className="grid gap-6">
            {era1Phases.map((phase) => {
              const StatusIcon = statusConfig[phase.status].icon;
              return (
                <div
                  key={phase.id}
                  className="bg-secondary/30 rounded-xl border border-border overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">
                          Phase {phase.number}
                        </span>
                        <h3 className="text-lg font-semibold">{phase.title}</h3>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[phase.status].bg} ${statusConfig[phase.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[phase.status].label}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className={statusConfig[phase.status].color}>{phase.progress}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            phase.status === "completed" ? "bg-green-500" :
                            phase.status === "in-progress" ? "bg-yellow-500" : "bg-muted"
                          }`}
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Items */}
                    <div className="grid sm:grid-cols-2 gap-2">
                      {phase.items.map((item) => {
                        const ItemIcon = itemStatusConfig[item.status].icon;
                        return (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 text-sm"
                          >
                            <ItemIcon className={`w-4 h-4 ${itemStatusConfig[item.status].color}`} />
                            <span className={item.status === "done" ? "text-foreground" : "text-muted-foreground"}>
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Era 2: Language Transformation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Era 2: Language Transformation</h2>
              <p className="text-muted-foreground">Phases 7-9 • Q2 2026 - Q1 2027</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-8 max-w-2xl">
            LUMOS evolves from "schema generator" to "programmable workflow language" -
            the TypeScript of Solana automation.
          </p>

          <div className="grid gap-6">
            {era2Phases.map((phase) => {
              const StatusIcon = statusConfig[phase.status].icon;
              return (
                <div
                  key={phase.id}
                  className="bg-background rounded-xl border border-border overflow-hidden opacity-75"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">
                          Phase {phase.number}
                        </span>
                        <h3 className="text-lg font-semibold">{phase.title}</h3>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[phase.status].bg} ${statusConfig[phase.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[phase.status].label}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {phase.items.map((item) => (
                        <span
                          key={item.name}
                          className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Where LUMOS is heading - from schema DSL to the definitive developer tool for Solana.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-secondary/30 rounded-xl border border-border">
              <div className="p-3 rounded-lg bg-green-500/10 text-green-400 w-fit mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Schema DSL</h3>
              <p className="text-sm text-muted-foreground">
                Define once, generate type-safe code in 5 languages with guaranteed Borsh compatibility.
              </p>
              <div className="mt-4 text-xs text-green-400">Now Available</div>
            </div>

            <div className="p-6 bg-secondary/30 rounded-xl border border-border">
              <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-400 w-fit mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Workflow Language</h3>
              <p className="text-sm text-muted-foreground">
                Type-safe scripts for deployment, automation, and Solana operations.
              </p>
              <div className="mt-4 text-xs text-yellow-400">2026</div>
            </div>

            <div className="p-6 bg-secondary/30 rounded-xl border border-border">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 w-fit mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Multichain Platform</h3>
              <p className="text-sm text-muted-foreground">
                Expand beyond Solana to EVM, Cosmos, Sui, and more chains.
              </p>
              <div className="mt-4 text-xs text-purple-400">2027+</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Help Shape the Future</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            LUMOS is built in the open. Your feedback, contributions, and ideas help define the roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="https://github.com/getlumos/lumos/discussions" target="_blank" rel="noopener noreferrer">
                <Sparkles className="w-5 h-5" />
                Share Ideas
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/community">
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roadmap;
