import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, Settings, Code2, Rocket, BookOpen } from "lucide-react";
import { useState } from "react";

const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <div className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto">
        <div className="text-xs text-muted-foreground mb-2">{language}</div>
        <pre className="text-sm text-foreground font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export const Documentation = () => {
  return (
    <section id="documentation" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Documentation</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Get Started with
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Lumos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to integrate Lumos into your Solana development workflow
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-card border-border">
          <Tabs defaultValue="installation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 h-auto p-1 bg-secondary/50">
              <TabsTrigger value="installation" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">Installation</span>
              </TabsTrigger>
              <TabsTrigger value="quickstart" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Rocket className="w-4 h-4" />
                <span className="hidden sm:inline">Quick Start</span>
              </TabsTrigger>
              <TabsTrigger value="cli" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">CLI Commands</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Configuration</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Code2 className="w-4 h-4" />
                <span className="hidden sm:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>

            {/* Installation */}
            <TabsContent value="installation" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Installation</h3>
                <p className="text-muted-foreground">
                  Install Lumos using your preferred package manager
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Using npm</h4>
                  <CodeBlock code="npm install -g @rector-labs/lumos" />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Using yarn</h4>
                  <CodeBlock code="yarn global add @rector-labs/lumos" />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Using pnpm</h4>
                  <CodeBlock code="pnpm add -g @rector-labs/lumos" />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Using Cargo (Rust)</h4>
                  <CodeBlock code="cargo install lumos" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h4 className="text-sm font-medium text-primary mb-2">Prerequisites</h4>
                <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                  <li>Node.js 16.x or higher (for TypeScript projects)</li>
                  <li>Rust 1.70+ (for Rust projects)</li>
                  <li>Solana CLI tools (optional, for full-stack projects)</li>
                </ul>
              </div>
            </TabsContent>

            {/* Quick Start */}
            <TabsContent value="quickstart" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Quick Start Guide</h3>
                <p className="text-muted-foreground">
                  Get up and running with Lumos in minutes
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">1. Initialize Lumos in your project</h4>
                  <CodeBlock code="lumos init" />
                  <p className="text-sm text-muted-foreground mt-2">
                    This creates a <code className="px-1 py-0.5 rounded bg-muted text-foreground">lumos.config.json</code> file in your project root
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">2. Define your types (TypeScript example)</h4>
                  <CodeBlock 
                    language="typescript"
                    code={`// src/types/account.ts
export interface UserAccount {
  pubkey: PublicKey;
  authority: PublicKey;
  balance: number;
  created_at: number;
  is_active: boolean;
}`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">3. Generate Rust types</h4>
                  <CodeBlock code="lumos generate --from typescript --to rust" />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">4. Check the output</h4>
                  <CodeBlock 
                    language="rust"
                    code={`// Generated in src/accounts/user_account.rs
#[account]
pub struct UserAccount {
    pub pubkey: Pubkey,
    pub authority: Pubkey,
    pub balance: u64,
    pub created_at: i64,
    pub is_active: bool,
}`}
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                <h4 className="text-sm font-medium text-accent mb-2">✨ Pro Tip</h4>
                <p className="text-sm text-foreground">
                  Run <code className="px-1 py-0.5 rounded bg-muted">lumos watch</code> to automatically regenerate types whenever your source files change!
                </p>
              </div>
            </TabsContent>

            {/* CLI Commands */}
            <TabsContent value="cli" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">CLI Commands</h3>
                <p className="text-muted-foreground">
                  Complete reference for Lumos command-line interface
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    cmd: "lumos init",
                    desc: "Initialize Lumos in your project with default configuration",
                  },
                  {
                    cmd: "lumos generate",
                    desc: "Generate types based on your configuration",
                  },
                  {
                    cmd: "lumos generate --from typescript --to rust",
                    desc: "Generate Rust types from TypeScript source",
                  },
                  {
                    cmd: "lumos generate --from rust --to typescript",
                    desc: "Generate TypeScript types from Rust source",
                  },
                  {
                    cmd: "lumos watch",
                    desc: "Watch for changes and automatically regenerate types",
                  },
                  {
                    cmd: "lumos validate",
                    desc: "Validate that all types are in sync",
                  },
                  {
                    cmd: "lumos clean",
                    desc: "Remove all generated files",
                  },
                  {
                    cmd: "lumos --help",
                    desc: "Display help information",
                  },
                  {
                    cmd: "lumos --version",
                    desc: "Display version information",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                    <code className="text-sm font-mono text-primary">{item.cmd}</code>
                    <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Configuration */}
            <TabsContent value="config" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Configuration Options</h3>
                <p className="text-muted-foreground">
                  Customize Lumos behavior with lumos.config.json
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Basic Configuration</h4>
                  <CodeBlock 
                    language="json"
                    code={`{
  "source": {
    "language": "typescript",
    "paths": ["src/types/**/*.ts"]
  },
  "target": {
    "language": "rust",
    "outputDir": "programs/myapp/src/accounts"
  },
  "options": {
    "watch": false,
    "verbose": false
  }
}`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Configuration Fields</h4>
                  <div className="space-y-3">
                    {[
                      {
                        field: "source.language",
                        type: "string",
                        desc: 'Source language for type definitions: "typescript" or "rust"',
                      },
                      {
                        field: "source.paths",
                        type: "string[]",
                        desc: "Glob patterns for source files to process",
                      },
                      {
                        field: "target.language",
                        type: "string",
                        desc: 'Target language for generated types: "rust" or "typescript"',
                      },
                      {
                        field: "target.outputDir",
                        type: "string",
                        desc: "Directory where generated files will be written",
                      },
                      {
                        field: "options.watch",
                        type: "boolean",
                        desc: "Enable watch mode for automatic regeneration",
                      },
                      {
                        field: "options.verbose",
                        type: "boolean",
                        desc: "Enable verbose logging output",
                      },
                      {
                        field: "options.formatting",
                        type: "object",
                        desc: "Code formatting options (prettier/rustfmt configs)",
                      },
                      {
                        field: "options.exclude",
                        type: "string[]",
                        desc: "Patterns to exclude from processing",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <code className="text-sm font-mono text-primary">{item.field}</code>
                          <span className="text-xs font-medium text-accent px-2 py-0.5 rounded bg-accent/10">{item.type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Advanced Usage */}
            <TabsContent value="advanced" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Advanced Usage</h3>
                <p className="text-muted-foreground">
                  Power user features and advanced patterns
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Custom Type Mappings</h4>
                  <CodeBlock 
                    language="json"
                    code={`{
  "typeMappings": {
    "BigInt": "u128",
    "Decimal": "f64",
    "Address": "Pubkey"
  }
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Define custom mappings between TypeScript and Rust types
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Nested Struct Generation</h4>
                  <CodeBlock 
                    language="typescript"
                    code={`// TypeScript
interface Order {
  id: string;
  items: OrderItem[];
  shipping: ShippingInfo;
}

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

interface ShippingInfo {
  address: string;
  method: "standard" | "express";
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2 mb-3">
                    Lumos automatically handles nested structures
                  </p>
                  <CodeBlock 
                    language="rust"
                    code={`// Generated Rust
#[account]
pub struct Order {
    pub id: String,
    pub items: Vec<OrderItem>,
    pub shipping: ShippingInfo,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OrderItem {
    pub product_id: String,
    pub quantity: u32,
    pub price: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ShippingInfo {
    pub address: String,
    pub method: ShippingMethod,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum ShippingMethod {
    Standard,
    Express,
}`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Build Integration</h4>
                  <CodeBlock 
                    language="json"
                    code={`// package.json
{
  "scripts": {
    "prebuild": "lumos generate",
    "build": "anchor build",
    "dev": "lumos watch & anchor test"
  }
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Integrate Lumos into your build pipeline
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">CI/CD Integration</h4>
                  <CodeBlock 
                    language="yaml"
                    code={`# .github/workflows/build.yml
- name: Generate types
  run: npx lumos generate

- name: Validate sync
  run: npx lumos validate

- name: Build project
  run: anchor build`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Ensure types stay in sync in your CI/CD pipeline
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h4 className="text-sm font-medium text-primary mb-2">Need Help?</h4>
                <p className="text-sm text-foreground">
                  Check out the{" "}
                  <a 
                    href="https://github.com/RECTOR-LABS/lumos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    GitHub repository
                  </a>
                  {" "}for more examples, or open an issue if you encounter any problems.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};
