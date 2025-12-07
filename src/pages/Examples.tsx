import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Github,
  ShoppingCart,
  Coins,
  Vote,
  Gamepad2,
  Clock,
  Code,
  FileCode,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

interface Example {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  stats: {
    structs: number;
    enums: number;
    lines: number;
  };
  features: string[];
  schemaPreview: string;
  githubPath: string;
}

const examples: Example[] = [
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    description: "Decentralized NFT marketplace with listings, sales tracking, and user profiles.",
    icon: <ShoppingCart className="w-6 h-6" />,
    difficulty: "Beginner",
    stats: { structs: 5, enums: 2, lines: 91 },
    features: ["Marketplace Config", "Listings & Sales", "NFT Metadata", "Transaction History", "User Profiles"],
    schemaPreview: `#[solana]
#[account]
struct Listing {
    seller: PublicKey,
    nft_mint: PublicKey,
    price: u64,
    status: ListingStatus,
}

#[solana]
enum ListingStatus {
    Active,
    Sold,
    Cancelled,
}`,
    githubPath: "nft-marketplace",
  },
  {
    id: "defi-staking",
    title: "DeFi Staking",
    description: "Flexible staking protocol with multiple pools, tiered rewards, and lock periods.",
    icon: <Coins className="w-6 h-6" />,
    difficulty: "Intermediate",
    stats: { structs: 6, enums: 3, lines: 112 },
    features: ["Multi-Pool Support", "Tiered APY", "Lock Periods", "Reward Calculation", "Pool Statistics"],
    schemaPreview: `#[solana]
#[account]
struct StakeAccount {
    owner: PublicKey,
    pool: PublicKey,
    amount: u64,
    status: StakingStatus,
}

#[solana]
enum RewardCalculationType {
    FixedAPY,
    TieredAPY { tier1_apy: u64 },
    DynamicAPY { min_apy: u64 },
}`,
    githubPath: "defi-staking",
  },
  {
    id: "dao-governance",
    title: "DAO Governance",
    description: "Comprehensive on-chain governance with proposals, voting, delegation, and timelock.",
    icon: <Vote className="w-6 h-6" />,
    difficulty: "Advanced",
    stats: { structs: 8, enums: 5, lines: 168 },
    features: ["Proposal System", "Weighted Voting", "Vote Delegation", "Timelock Execution", "Member Management"],
    schemaPreview: `#[solana]
#[account]
struct Proposal {
    id: u64,
    proposer: PublicKey,
    yes_votes: u64,
    no_votes: u64,
    status: ProposalStatus,
}

#[solana]
enum ProposalType {
    Transfer { recipient: PublicKey },
    ConfigChange { voting_period: i64 },
    AddMember { member: PublicKey },
}`,
    githubPath: "dao-governance",
  },
  {
    id: "gaming-inventory",
    title: "Gaming Inventory",
    description: "Web3 gaming system with player progression, items, crafting, and trading.",
    icon: <Gamepad2 className="w-6 h-6" />,
    difficulty: "Advanced",
    stats: { structs: 8, enums: 6, lines: 167 },
    features: ["Player Progression", "Item System", "Crafting Recipes", "Trading Market", "Achievements"],
    schemaPreview: `#[solana]
#[account]
struct Player {
    wallet: PublicKey,
    level: u16,
    experience: u64,
    gold: u64,
    equipped_weapon: Option<PublicKey>,
}

#[solana]
enum Rarity {
    Common,
    Rare,
    Epic,
    Legendary,
}`,
    githubPath: "gaming-inventory",
  },
  {
    id: "token-vesting",
    title: "Token Vesting",
    description: "Token vesting system with linear vesting, cliffs, milestones, and revocation.",
    icon: <Clock className="w-6 h-6" />,
    difficulty: "Intermediate",
    stats: { structs: 8, enums: 3, lines: 155 },
    features: ["Multiple Vesting Types", "Cliff Periods", "Milestone Unlocks", "Revocation Support", "Release Tracking"],
    schemaPreview: `#[solana]
#[account]
struct VestingSchedule {
    beneficiary: PublicKey,
    vesting_type: VestingType,
    total_amount: u64,
    released_amount: u64,
}

#[solana]
enum VestingType {
    Linear,
    Cliff { cliff_duration: i64 },
    Milestone { milestones: [Milestone] },
}`,
    githubPath: "token-vesting",
  },
];

const difficultyColors = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

const Examples = () => {
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
                <a href="https://github.com/getlumos/awesome-lumos" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View All on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border mb-6">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">5 Production-Ready Examples</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Real-World</span> Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn LUMOS by exploring complete, production-ready schemas. Each example includes
            Anchor programs, TypeScript clients, and comprehensive documentation.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">35+</div>
              <div className="text-muted-foreground">Structs</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">19</div>
              <div className="text-muted-foreground">Enums</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">693</div>
              <div className="text-muted-foreground">Lines of Schema</div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8">
            {examples.map((example) => (
              <div
                key={example.id}
                className="group bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Info Section */}
                  <div className="p-6 lg:p-8 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {example.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{example.title}</h3>
                          <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full border ${difficultyColors[example.difficulty]}`}>
                            {example.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{example.description}</p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-primary" />
                        <span>{example.stats.structs} structs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Code className="w-4 h-4 text-accent" />
                        <span>{example.stats.enums} enums</span>
                      </div>
                      <div className="text-muted-foreground">
                        {example.stats.lines} lines
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {example.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://github.com/getlumos/awesome-lumos/tree/main/examples/${example.githubPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Source
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={`https://github.com/getlumos/awesome-lumos/blob/main/examples/${example.githubPath}/schema`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Full Schema
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Code Preview Section */}
                  <div className="bg-[#0d1117] border-l border-border p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted-foreground font-mono">schema.lumos</span>
                      <span className="text-xs text-primary/60">Preview</span>
                    </div>
                    <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                      <code>{example.schemaPreview}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Clone any example and start building your own Solana application with type-safe schemas.
          </p>
          <div className="bg-[#0d1117] rounded-lg p-4 max-w-xl mx-auto mb-8">
            <code className="text-sm text-gray-300">
              git clone https://github.com/getlumos/awesome-lumos.git
            </code>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="https://github.com/getlumos/awesome-lumos" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                Explore on GitHub
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://docs.lumos-lang.org/guide/getting-started" target="_blank" rel="noopener noreferrer">
                Read the Docs
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Examples;
