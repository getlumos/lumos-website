import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  MessageSquare,
  Bug,
  Lightbulb,
  Heart,
  Users,
  BookOpen,
  Code,
  Terminal,
  Puzzle,
  ExternalLink,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuickLink {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const quickLinks: QuickLink[] = [
  {
    title: "GitHub Discussions",
    description: "Ask questions, share ideas, and connect with the community",
    icon: <MessageSquare className="w-6 h-6" />,
    href: "https://github.com/getlumos/lumos/discussions",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    title: "Report Issues",
    description: "Found a bug? Help us improve by reporting it",
    icon: <Bug className="w-6 h-6" />,
    href: "https://github.com/getlumos/lumos/issues/new?template=bug_report.md",
    color: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  {
    title: "Feature Requests",
    description: "Have an idea? We'd love to hear your suggestions",
    icon: <Lightbulb className="w-6 h-6" />,
    href: "https://github.com/getlumos/lumos/issues/new?template=feature_request.md",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  {
    title: "Star on GitHub",
    description: "Show your support by starring the repository",
    icon: <Star className="w-6 h-6" />,
    href: "https://github.com/getlumos/lumos",
    color: "bg-green-500/10 text-green-400 border-green-500/30",
  },
];

interface ContributionArea {
  title: string;
  description: string;
  icon: React.ReactNode;
  tasks: string[];
}

const contributionAreas: ContributionArea[] = [
  {
    title: "Core Compiler",
    description: "Work on the LUMOS compiler and code generators",
    icon: <Terminal className="w-5 h-5" />,
    tasks: ["Parser improvements", "New language features", "Generator optimizations", "Performance tuning"],
  },
  {
    title: "Editor Extensions",
    description: "Improve developer experience across IDEs",
    icon: <Code className="w-5 h-5" />,
    tasks: ["VSCode features", "IntelliJ plugin", "Neovim support", "Emacs mode"],
  },
  {
    title: "Documentation",
    description: "Help others learn and use LUMOS effectively",
    icon: <BookOpen className="w-5 h-5" />,
    tasks: ["Tutorials", "API docs", "Examples", "Translations"],
  },
  {
    title: "Ecosystem",
    description: "Build tools and integrations for the community",
    icon: <Puzzle className="w-5 h-5" />,
    tasks: ["GitHub Actions", "CI/CD integrations", "Framework plugins", "Templates"],
  },
];

interface EcosystemRepo {
  name: string;
  description: string;
  href: string;
  language: string;
}

const ecosystemRepos: EcosystemRepo[] = [
  { name: "lumos", description: "Core compiler, CLI, and LSP server", href: "https://github.com/getlumos/lumos", language: "Rust" },
  { name: "vscode-lumos", description: "VSCode extension with full LSP support", href: "https://github.com/getlumos/vscode-lumos", language: "TypeScript" },
  { name: "intellij-lumos", description: "IntelliJ IDEA and Rust Rover plugin", href: "https://github.com/getlumos/intellij-lumos", language: "Kotlin" },
  { name: "nvim-lumos", description: "Neovim plugin with Tree-sitter", href: "https://github.com/getlumos/nvim-lumos", language: "Lua" },
  { name: "lumos-mode", description: "Emacs major mode with LSP", href: "https://github.com/getlumos/lumos-mode", language: "Emacs Lisp" },
  { name: "sublime-lumos", description: "Sublime Text package", href: "https://github.com/getlumos/sublime-lumos", language: "YAML" },
  { name: "awesome-lumos", description: "Production-ready examples", href: "https://github.com/getlumos/awesome-lumos", language: "Anchor" },
  { name: "docs-lumos", description: "Official documentation site", href: "https://github.com/getlumos/docs-lumos", language: "VitePress" },
  { name: "lumos-action", description: "GitHub Action for CI/CD", href: "https://github.com/getlumos/lumos-action", language: "Bash" },
];

const languageColors: Record<string, string> = {
  Rust: "bg-orange-500",
  TypeScript: "bg-blue-500",
  Kotlin: "bg-purple-500",
  Lua: "bg-indigo-500",
  "Emacs Lisp": "bg-pink-500",
  YAML: "bg-green-500",
  Anchor: "bg-cyan-500",
  VitePress: "bg-emerald-500",
  Bash: "bg-gray-500",
};

const Community = () => {
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
                <a href="https://github.com/getlumos" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Org
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
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Open Source Community</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Join the <span className="bg-gradient-primary bg-clip-text text-transparent">LUMOS</span> Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LUMOS is built by developers, for developers. Whether you're a user, contributor,
            or just curious, there's a place for you here.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Get Involved</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg ${link.color} border mb-4`}>
                  {link.icon}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ways to Contribute</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every contribution matters, from fixing typos to implementing new features.
              Find an area that interests you and dive in!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contributionAreas.map((area) => (
              <div
                key={area.title}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.tasks.map((task) => (
                    <span
                      key={task}
                      className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/getlumos/lumos/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                <Heart className="w-5 h-5 mr-2" />
                Read Contributing Guide
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Ecosystem Repos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ecosystem Repositories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              LUMOS is more than just a compiler. Explore our ecosystem of tools,
              extensions, and resources.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecosystemRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm font-medium group-hover:text-primary transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{repo.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${languageColors[repo.language]}`} />
                  <span className="text-xs text-muted-foreground">{repo.language}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* First Contribution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Make Your First Contribution?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Look for issues labeled "good first issue" - they're perfect for newcomers
                and we'll help you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a href="https://github.com/getlumos/lumos/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                    Good First Issues
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/getlumos/lumos/discussions/categories/q-a" target="_blank" rel="noopener noreferrer">
                    Ask a Question
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            LUMOS is dual-licensed under{" "}
            <a href="https://opensource.org/licenses/MIT" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              MIT
            </a>{" "}
            and{" "}
            <a href="https://opensource.org/licenses/Apache-2.0" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Apache 2.0
            </a>{" "}
            licenses. Use it freely in your projects.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
