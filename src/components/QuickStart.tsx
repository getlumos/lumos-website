import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

export const QuickStart = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const commands = [
    {
      step: "1",
      title: "Install",
      command: "cargo install lumos-cli",
      description: "Install the LUMOS CLI from crates.io"
    },
    {
      step: "2",
      title: "Write Schema",
      command: "lumos init my-project",
      description: "Create a new project with example schema"
    },
    {
      step: "3",
      title: "Generate",
      command: "lumos generate schema.lumos",
      description: "Generate Rust + TypeScript from your schema"
    }
  ];

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="quick-start" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">3 Commands to Get Started</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick Start
            </h2>
            <p className="text-lg text-muted-foreground">
              Get up and running with LUMOS in under a minute
            </p>
          </div>

          {/* Commands */}
          <div className="space-y-4">
            {commands.map((cmd, index) => (
              <div
                key={index}
                className="group relative flex items-stretch gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{cmd.step}</span>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{cmd.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{cmd.description}</p>

                  {/* Command */}
                  <div className="flex items-center gap-2">
                    <code className="flex-grow px-3 py-2 rounded bg-secondary font-mono text-sm text-foreground overflow-x-auto">
                      $ {cmd.command}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cmd.command, index)}
                      className="flex-shrink-0 p-2 rounded hover:bg-secondary transition-colors"
                      aria-label="Copy command"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alternative installation */}
          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">No Rust installed?</strong>{" "}
              Use our npm package:{" "}
              <code className="px-2 py-1 rounded bg-secondary text-xs">npm install -g @getlumos/cli</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
