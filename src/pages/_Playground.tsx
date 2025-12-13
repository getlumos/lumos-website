import { useEffect, useState, useRef, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Copy,
  Share2,
  Check,
  Loader2,
  Code,
  FileCode,
  AlertCircle,
} from "lucide-react";
import LZString from "lz-string";
import Editor from "@monaco-editor/react";

// Example schemas
const examples: Record<string, { name: string; category: string; code: string }> = {
  account: {
    name: "Player Account",
    category: "Basics",
    code: `#[solana]
#[account]
struct PlayerAccount {
    wallet: PublicKey,
    level: u16,
    experience: u64,
    inventory: [PublicKey],
}`,
  },
  enum: {
    name: "Game State Enum",
    category: "Basics",
    code: `#[solana]
enum GameState {
    Active,
    Paused { reason: String },
    Finished { winner: PublicKey, score: u64 },
}`,
  },
  marketplace: {
    name: "NFT Marketplace",
    category: "DeFi",
    code: `#[solana]
#[account]
struct Marketplace {
    authority: PublicKey,
    fee_percentage: u16,
    total_volume: u64,
}

#[solana]
struct ListingData {
    seller: PublicKey,
    nft_mint: PublicKey,
    price: u64,
    listed_at: i64,
    buyer: Option<PublicKey>,
}

#[solana]
enum ListingStatus {
    Active,
    Sold { buyer: PublicKey, sold_at: i64 },
    Cancelled,
}`,
  },
  staking: {
    name: "DeFi Staking",
    category: "DeFi",
    code: `#[solana]
#[account]
struct StakePool {
    authority: PublicKey,
    stake_mint: PublicKey,
    reward_mint: PublicKey,
    total_staked: u64,
    reward_rate: u64,
    last_update: i64,
}

#[solana]
#[account]
struct StakeAccount {
    owner: PublicKey,
    pool: PublicKey,
    amount: u64,
    rewards_earned: u64,
    staked_at: i64,
}`,
  },
  dao: {
    name: "DAO Governance",
    category: "Governance",
    code: `#[solana]
#[account]
struct Proposal {
    creator: PublicKey,
    title: String,
    description_hash: [u8; 32],
    votes_for: u64,
    votes_against: u64,
    created_at: i64,
    ends_at: i64,
    status: ProposalStatus,
}

#[solana]
enum ProposalStatus {
    Active,
    Passed,
    Rejected,
    Executed,
}

#[solana]
struct Vote {
    voter: PublicKey,
    proposal: PublicKey,
    amount: u64,
    support: bool,
}`,
  },
  gaming: {
    name: "Gaming Inventory",
    category: "Gaming",
    code: `#[solana]
#[account]
struct GameCharacter {
    owner: PublicKey,
    name: String,
    class: CharacterClass,
    level: u16,
    health: u32,
    mana: u32,
    experience: u64,
}

#[solana]
enum CharacterClass {
    Warrior { strength: u16 },
    Mage { intelligence: u16 },
    Archer { agility: u16 },
    Healer { wisdom: u16 },
}

#[solana]
struct InventoryItem {
    item_id: u32,
    quantity: u16,
    equipped: bool,
}`,
  },
};

// WASM types
interface WasmModule {
  generateCode(source: string): { rust: string; typescript: string };
}

const Playground = () => {
  const { toast } = useToast();
  const [schemaCode, setSchemaCode] = useState(examples.account.code);
  const [rustOutput, setRustOutput] = useState("// Loading WASM...");
  const [tsOutput, setTsOutput] = useState("// Loading WASM...");
  const [error, setError] = useState<string | null>(null);
  const [isWasmReady, setIsWasmReady] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedExample, setSelectedExample] = useState("account");
  const [activeOutputTab, setActiveOutputTab] = useState("rust");
  const [copiedRust, setCopiedRust] = useState(false);
  const [copiedTs, setCopiedTs] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const wasmRef = useRef<WasmModule | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const initialCodeRef = useRef<string>(examples.account.code);

  // Load schema from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("code");
    if (encoded) {
      try {
        const decoded = LZString.decompressFromEncodedURIComponent(encoded);
        if (decoded) {
          setSchemaCode(decoded);
          initialCodeRef.current = decoded;
          setSelectedExample("");
        }
      } catch (e) {
        console.error("Failed to decode URL schema:", e);
      }
    }
  }, []);

  // Load WASM module on mount
  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Check if already loaded
        if ((window as any).__LUMOS_WASM__?.ready) {
          wasmRef.current = (window as any).__LUMOS_WASM__ as WasmModule;
          setIsWasmReady(true);
          compile(initialCodeRef.current);
          return;
        }

        // Load the WASM init script
        const script = document.createElement("script");
        script.type = "module";
        script.src = "/wasm/init.js";

        // Wait for WASM to be ready
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error("WASM load timeout (15s)")), 15000);

          const onReady = () => {
            clearTimeout(timeout);
            window.removeEventListener("lumos-wasm-error", onError);
            resolve();
          };

          const onError = (e: Event) => {
            clearTimeout(timeout);
            window.removeEventListener("lumos-wasm-ready", onReady);
            reject(new Error((e as CustomEvent).detail?.message || "WASM load failed"));
          };

          window.addEventListener("lumos-wasm-ready", onReady, { once: true });
          window.addEventListener("lumos-wasm-error", onError, { once: true });

          script.onerror = () => {
            clearTimeout(timeout);
            window.removeEventListener("lumos-wasm-ready", onReady);
            window.removeEventListener("lumos-wasm-error", onError);
            reject(new Error("Failed to load WASM init script"));
          };

          document.head.appendChild(script);
        });

        // Get WASM module from window
        const wasm = (window as any).__LUMOS_WASM__;
        if (!wasm || !wasm.ready) {
          throw new Error("WASM module not initialized");
        }

        wasmRef.current = wasm as WasmModule;
        setIsWasmReady(true);

        // Initial compile
        compile(initialCodeRef.current);
      } catch (err) {
        const errorMsg = `Failed to load WASM: ${err instanceof Error ? err.message : String(err)}`;
        setError(errorMsg);
        setRustOutput(`// ${errorMsg}`);
        setTsOutput(`// ${errorMsg}`);
      }
    };

    loadWasm();
  }, []);

  // Compile function
  const compile = useCallback((source: string) => {
    if (!wasmRef.current) return;

    setIsCompiling(true);
    setError(null);

    try {
      const result = wasmRef.current.generateCode(source);
      setRustOutput(result.rust);
      setTsOutput(result.typescript);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      const errorOutput = `// Generation Error:\n//\n// ${errorMsg.split("\n").join("\n// ")}`;
      setRustOutput(errorOutput);
      setTsOutput(errorOutput);
    } finally {
      setIsCompiling(false);
    }
  }, []);

  // Debounced compile
  const debouncedCompile = useCallback((source: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      compile(source);
    }, 300);
  }, [compile]);

  // Handle schema code change
  const handleSchemaChange = (value: string | undefined) => {
    const newValue = value || "";
    setSchemaCode(newValue);
    if (isWasmReady) {
      debouncedCompile(newValue);
    }
  };

  // Handle example selection
  const handleExampleChange = (value: string) => {
    setSelectedExample(value);
    if (examples[value]) {
      const code = examples[value].code;
      setSchemaCode(code);
      if (isWasmReady) {
        compile(code);
      }
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: "rust" | "ts" | "share") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "rust") {
        setCopiedRust(true);
        setTimeout(() => setCopiedRust(false), 2000);
      } else if (type === "ts") {
        setCopiedTs(true);
        setTimeout(() => setCopiedTs(false), 2000);
      } else {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
      toast({
        title: "Copied!",
        description: type === "share" ? "Share URL copied to clipboard" : `${type === "rust" ? "Rust" : "TypeScript"} code copied`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  // Generate share URL
  const generateShareUrl = () => {
    const encoded = LZString.compressToEncodedURIComponent(schemaCode);
    const url = `${window.location.origin}/playground?code=${encoded}`;
    copyToClipboard(url, "share");
  };

  // Download file
  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: `${filename} saved`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">Playground</h1>
              <Badge variant="secondary" className="text-xs">
                {isWasmReady ? (
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-green-500" />
                    WASM Ready
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Loading...
                  </span>
                )}
              </Badge>
              {isCompiling && (
                <Badge variant="outline" className="text-xs">
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  Compiling...
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Example selector */}
              <Select value={selectedExample} onValueChange={handleExampleChange}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Load example..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(examples).map(([key, { name, category }]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1">
                          {category}
                        </Badge>
                        {name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Action buttons */}
              <Button
                variant="outline"
                size="sm"
                onClick={generateShareUrl}
                disabled={!isWasmReady}
              >
                {copiedShare ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Share2 className="h-4 w-4 mr-1" />
                )}
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{error}</span>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Input Panel */}
          <div className="flex-1 flex flex-col border-r border-border min-h-0">
            <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <Code className="h-4 w-4" />
                .lumos Schema
              </span>
            </div>
            <div className="flex-1 min-h-[200px]">
              <Editor
                height="100%"
                defaultLanguage="rust"
                value={schemaCode}
                onChange={handleSchemaChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  padding: { top: 16 },
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex-1 flex flex-col min-h-0">
            <Tabs
              value={activeOutputTab}
              onValueChange={setActiveOutputTab}
              className="flex-1 flex flex-col"
            >
              <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
                <TabsList className="h-8">
                  <TabsTrigger value="rust" className="text-xs px-3 h-7">
                    <FileCode className="h-3 w-3 mr-1" />
                    Rust
                  </TabsTrigger>
                  <TabsTrigger value="typescript" className="text-xs px-3 h-7">
                    <FileCode className="h-3 w-3 mr-1" />
                    TypeScript
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-1">
                  {activeOutputTab === "rust" ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => copyToClipboard(rustOutput, "rust")}
                        disabled={!isWasmReady || !!error}
                      >
                        {copiedRust ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => downloadFile(rustOutput, "generated.rs")}
                        disabled={!isWasmReady || !!error}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => copyToClipboard(tsOutput, "ts")}
                        disabled={!isWasmReady || !!error}
                      >
                        {copiedTs ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => downloadFile(tsOutput, "generated.ts")}
                        disabled={!isWasmReady || !!error}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <TabsContent value="rust" className="flex-1 mt-0 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="rust"
                  value={rustOutput}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    readOnly: true,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    padding: { top: 16 },
                  }}
                />
              </TabsContent>
              <TabsContent value="typescript" className="flex-1 mt-0 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  value={tsOutput}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    readOnly: true,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    padding: { top: 16 },
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Playground;
