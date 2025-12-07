import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Tag,
  Plus,
  RefreshCw,
  Bug,
  Shield,
  AlertTriangle,
  Package,
  TestTube,
  FileText,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

interface ChangeItem {
  text: string;
  subItems?: string[];
}

interface ChangeSection {
  type: "added" | "changed" | "fixed" | "security" | "breaking" | "dependencies" | "testing" | "documentation";
  items: ChangeItem[];
}

interface Release {
  version: string;
  date: string;
  title?: string;
  description?: string;
  sections: ChangeSection[];
  compareUrl?: string;
  releaseUrl: string;
}

const releases: Release[] = [
  {
    version: "0.2.0",
    date: "2025-11-24",
    title: "Multi-File Imports & Type Aliases",
    description: "Major feature release introducing modular schema architecture with imports and type aliases.",
    sections: [
      {
        type: "added",
        items: [
          {
            text: "Type Aliases (#52)",
            subItems: [
              "Rust-style type alias syntax: `type UserId = PublicKey;`",
              "Recursive type resolution with circular reference detection",
              "Generate Rust `pub type` and TypeScript `export type` aliases",
            ],
          },
          {
            text: "Multi-File Imports (#52)",
            subItems: [
              "JavaScript-style import syntax: `import { Type1, Type2 } from \"./file.lumos\";`",
              "Automatic import discovery and resolution",
              "Circular import detection with clear error messages",
            ],
          },
          {
            text: "New File Resolver",
            subItems: [
              "`FileResolver` module (340 lines) for multi-file schema management",
              "Import caching to avoid duplicate parsing",
            ],
          },
          {
            text: "Examples",
            subItems: [
              "`examples/type_aliases.lumos` - 200+ lines, 23 types",
              "`examples/imports/` - Multi-file import examples with 7 files",
            ],
          },
        ],
      },
      {
        type: "changed",
        items: [
          { text: "Updated AST to include `Import` and `TypeAlias` structs" },
          { text: "Extended IR with `TypeAliasDefinition` and `TypeAlias` variant" },
          { text: "CLI `generate` command now uses `FileResolver` for multi-file support" },
          { text: "All generators updated to handle type aliases" },
        ],
      },
      {
        type: "fixed",
        items: [
          { text: "15+ non-exhaustive pattern matches across codebase" },
          { text: "Enum import validation timing (deferred until all files loaded)" },
          { text: "Multi-line import parsing with regex support" },
        ],
      },
      {
        type: "dependencies",
        items: [
          { text: "Added `regex = \"1.10\"` for import parsing" },
        ],
      },
      {
        type: "testing",
        items: [
          { text: "Added 4 new file_resolver tests" },
          { text: "All 202 tests passing (100% success rate)" },
        ],
      },
    ],
    compareUrl: "https://github.com/getlumos/lumos/compare/v0.1.1...v0.2.0",
    releaseUrl: "https://github.com/getlumos/lumos/releases/tag/v0.2.0",
  },
  {
    version: "0.1.1",
    date: "2025-11-23",
    title: "LSP & Schema Evolution",
    description: "Feature release with Language Server Protocol support, schema versioning, and security improvements.",
    sections: [
      {
        type: "added",
        items: [
          { text: "Schema versioning with `#[version]` attribute" },
          { text: "Automatic migration code generation" },
          { text: "Backward compatibility validation" },
          { text: "Deprecation warnings for schema fields" },
          { text: "Schema diff tool: `lumos diff`" },
          { text: "Language Server Protocol (LSP) implementation" },
          { text: "Custom derive macros support" },
          { text: "Fixed-size arrays with const generics" },
        ],
      },
      {
        type: "security",
        items: [
          { text: "User-defined type validation during transformation" },
          { text: "Path traversal protection in CLI" },
          { text: "u64 precision warnings in TypeScript output" },
        ],
      },
      {
        type: "changed",
        items: [
          { text: "Enhanced error messages with source location tracking" },
          { text: "Expanded test suite to 202 tests (from 64)" },
        ],
      },
    ],
    compareUrl: "https://github.com/getlumos/lumos/compare/v0.1.0...v0.1.1",
    releaseUrl: "https://github.com/getlumos/lumos/releases/tag/v0.1.1",
  },
  {
    version: "0.1.0",
    date: "2025-11-01",
    title: "Initial Release",
    description: "First stable release of LUMOS - Type-safe schema language for Solana development.",
    sections: [
      {
        type: "added",
        items: [
          { text: "Core schema language with structs and enums" },
          { text: "Rust and TypeScript code generation" },
          { text: "Borsh serialization support" },
          { text: "Anchor framework integration" },
          { text: "Context-aware code generation" },
          { text: "CLI tool with multiple commands" },
          { text: "VSCode extension" },
          { text: "Comprehensive documentation" },
        ],
      },
    ],
    releaseUrl: "https://github.com/getlumos/lumos/releases/tag/v0.1.0",
  },
];

const sectionConfig = {
  added: { icon: Plus, label: "Added", color: "text-green-400", bg: "bg-green-500/10" },
  changed: { icon: RefreshCw, label: "Changed", color: "text-blue-400", bg: "bg-blue-500/10" },
  fixed: { icon: Bug, label: "Fixed", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  security: { icon: Shield, label: "Security", color: "text-purple-400", bg: "bg-purple-500/10" },
  breaking: { icon: AlertTriangle, label: "Breaking Changes", color: "text-red-400", bg: "bg-red-500/10" },
  dependencies: { icon: Package, label: "Dependencies", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  testing: { icon: TestTube, label: "Testing", color: "text-orange-400", bg: "bg-orange-500/10" },
  documentation: { icon: FileText, label: "Documentation", color: "text-pink-400", bg: "bg-pink-500/10" },
};

const Changelog = () => {
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
                <a href="https://github.com/getlumos/lumos/releases" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  All Releases
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
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Keep a Changelog Format</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">What's New</span> in LUMOS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All notable changes to LUMOS are documented here. We follow{" "}
            <a href="https://semver.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Semantic Versioning
            </a>.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-12">
              {releases.map((release, index) => (
                <div key={release.version} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>

                  {/* Release card */}
                  <div className="md:ml-20 bg-secondary/30 rounded-xl border border-border overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-border">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-mono font-bold">
                          <Tag className="w-4 h-4" />
                          v{release.version}
                        </div>
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                            Latest
                          </span>
                        )}
                      </div>
                      {release.title && (
                        <h2 className="text-xl font-bold mb-2">{release.title}</h2>
                      )}
                      {release.description && (
                        <p className="text-muted-foreground">{release.description}</p>
                      )}
                    </div>

                    {/* Sections */}
                    <div className="p-6 space-y-6">
                      {release.sections.map((section) => {
                        const config = sectionConfig[section.type];
                        const Icon = config.icon;
                        return (
                          <div key={section.type}>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.color} text-sm font-medium mb-3`}>
                              <Icon className="w-4 h-4" />
                              {config.label}
                            </div>
                            <ul className="space-y-2 ml-1">
                              {section.items.map((item, i) => (
                                <li key={i} className="text-sm">
                                  <div className="flex items-start gap-2">
                                    <span className="text-muted-foreground mt-1.5">•</span>
                                    <div>
                                      <span className="text-foreground">{item.text}</span>
                                      {item.subItems && (
                                        <ul className="mt-1 space-y-1 ml-4">
                                          {item.subItems.map((subItem, j) => (
                                            <li key={j} className="text-muted-foreground text-xs flex items-start gap-2">
                                              <span className="mt-1">◦</span>
                                              <span>{subItem}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-secondary/20 border-t border-border flex flex-wrap gap-3">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={release.releaseUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Release Notes
                        </a>
                      </Button>
                      {release.compareUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={release.compareUrl} target="_blank" rel="noopener noreferrer">
                            View Changes
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Watch the repository on GitHub to get notified about new releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="https://github.com/getlumos/lumos" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                Star on GitHub
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/getlumos/lumos/subscription" target="_blank" rel="noopener noreferrer">
                Watch Releases
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Changelog;
