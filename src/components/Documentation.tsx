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
                  <h4 className="text-lg font-medium text-foreground mb-3">Using Cargo (Recommended)</h4>
                  <CodeBlock code="cargo install lumos-cli" />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Using npm (WASM binary)</h4>
                  <CodeBlock code="npm install -g @getlumos/cli" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Note: npm package v0.1.0 provides WASM-based CLI. No Rust toolchain required.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">From Source</h4>
                  <CodeBlock code={`git clone https://github.com/getlumos/lumos.git
cd lumos
cargo build --release --bin lumos`} />
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
                  <h4 className="text-lg font-medium text-foreground mb-3">1. Create a schema file</h4>
                  <CodeBlock
                    language=".lumos"
                    code={`// schema.lumos
#[solana]
#[account]
struct PlayerAccount {
    wallet: PublicKey,
    level: u16,
    experience: u64,
}

#[solana]
enum GameState {
    Active,
    Paused,
    Finished,
}`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">2. Generate Rust + TypeScript</h4>
                  <CodeBlock code="lumos generate schema.lumos" />
                  <p className="text-sm text-muted-foreground mt-2">
                    This creates <code className="px-1 py-0.5 rounded bg-muted text-foreground">generated.rs</code> and <code className="px-1 py-0.5 rounded bg-muted text-foreground">generated.ts</code> with perfect Borsh compatibility
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">3. Use in your Anchor program</h4>
                  <CodeBlock
                    language="rust"
                    code={`// programs/mygame/src/lib.rs
use anchor_lang::prelude::*;
mod generated;
use generated::{PlayerAccount, GameState};

#[program]
pub mod mygame {
    use super::*;
    pub fn init_player(ctx: Context<InitPlayer>) -> Result<()> {
        let player = &mut ctx.accounts.player;
        player.wallet = ctx.accounts.signer.key();
        player.level = 1;
        player.experience = 0;
        Ok(())
    }
}`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">4. Use in your TypeScript client</h4>
                  <CodeBlock
                    language="typescript"
                    code={`// client/src/index.ts
import { PlayerAccount, PlayerAccountBorsh } from './generated';

// Fetch and deserialize account
const accountInfo = await connection.getAccountInfo(playerPubkey);
const player = PlayerAccountBorsh.deserialize(accountInfo.data);
console.log(\`Level: \${player.level}, XP: \${player.experience}\`);`}
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                <h4 className="text-sm font-medium text-accent mb-2">Pro Tip</h4>
                <p className="text-sm text-foreground">
                  Run <code className="px-1 py-0.5 rounded bg-muted">lumos validate schema.lumos</code> to check your schema for errors before generating code!
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
                    cmd: "lumos generate <schema.lumos>",
                    desc: "Generate Rust and TypeScript code from .lumos schema file",
                  },
                  {
                    cmd: "lumos validate <schema.lumos>",
                    desc: "Validate schema syntax and type definitions without generating code",
                  },
                  {
                    cmd: "lumos init [project-name]",
                    desc: "Create new LUMOS project with example schema and directory structure",
                  },
                  {
                    cmd: "lumos check <schema.lumos>",
                    desc: "Perform static analysis and security checks on schema definitions",
                  },
                  {
                    cmd: "lumos diff <old.lumos> <new.lumos>",
                    desc: "Show differences between two schema versions for migration planning",
                  },
                  {
                    cmd: "lumos --help",
                    desc: "Display complete help information with all available commands",
                  },
                  {
                    cmd: "lumos --version",
                    desc: "Display current LUMOS CLI version (latest: v0.1.1)",
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
                <h3 className="text-2xl font-semibold text-foreground">Project Organization</h3>
                <p className="text-muted-foreground">
                  Best practices for organizing LUMOS schemas in your project
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Recommended Project Structure</h4>
                  <CodeBlock
                    language="bash"
                    code={`my-solana-app/
├── schemas/
│   ├── accounts.lumos      # Account definitions
│   ├── instructions.lumos  # Instruction data structures
│   └── events.lumos        # Event types
├── programs/
│   └── myapp/
│       └── src/
│           ├── lib.rs
│           └── generated.rs  # Generated by LUMOS
└── client/
    └── src/
        └── generated.ts      # Generated by LUMOS`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Output Customization</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Control output paths using CLI options:
                  </p>
                  <CodeBlock
                    code={`# Default: generates to current directory
lumos generate schemas/accounts.lumos

# Custom Rust output
lumos generate schemas/accounts.lumos --rust-out programs/myapp/src/

# Custom TypeScript output
lumos generate schemas/accounts.lumos --ts-out client/src/types/`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Schema Attributes</h4>
                  <div className="space-y-3">
                    {[
                      {
                        attr: "#[solana]",
                        desc: "Mark module for Solana-specific code generation (PublicKey support)",
                      },
                      {
                        attr: "#[account]",
                        desc: "Generate Anchor account struct with proper derives",
                      },
                      {
                        attr: "#[deprecated]",
                        desc: "Mark fields as deprecated with optional migration message",
                      },
                      {
                        attr: "// comments",
                        desc: "Add documentation that appears in generated code",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border">
                        <code className="text-sm font-mono text-primary block mb-1">{item.attr}</code>
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
                  <h4 className="text-lg font-medium text-foreground mb-3">Enum Support</h4>
                  <CodeBlock
                    language=".lumos"
                    code={`#[solana]
enum GameState {
    Active,               // Unit variant
    Paused,
    Finished { score: u64 },  // Struct variant
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    LUMOS supports unit, tuple, and struct enum variants with Borsh discriminants
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Nested Structs</h4>
                  <CodeBlock
                    language=".lumos"
                    code={`#[solana]
#[account]
struct Shop {
    owner: PublicKey,
    inventory: Vec<Item>,
    settings: ShopSettings,
}

struct Item {
    id: u32,
    price: u64,
    stock: u16,
}

struct ShopSettings {
    is_open: bool,
    discount_rate: u8,
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    LUMOS automatically handles nested structures and complex types
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Build Integration</h4>
                  <CodeBlock
                    language="json"
                    code={`// package.json
{
  "scripts": {
    "generate": "lumos generate schemas/*.lumos",
    "prebuild": "npm run generate",
    "build": "anchor build",
    "test": "anchor test"
  }
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Integrate LUMOS into your build pipeline for automatic code generation
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">CI/CD with GitHub Actions</h4>
                  <CodeBlock
                    language="yaml"
                    code={`# .github/workflows/build.yml
- uses: getlumos/lumos-action@v1
  with:
    schema: 'schemas/**/*.lumos'

- name: Build Anchor program
  run: anchor build

- name: Run tests
  run: anchor test`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Use the official LUMOS GitHub Action for automated schema validation and generation
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h4 className="text-sm font-medium text-primary mb-2">Need Help?</h4>
                <p className="text-sm text-foreground">
                  Check out the{" "}
                  <a
                    href="https://github.com/getlumos/lumos"
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
