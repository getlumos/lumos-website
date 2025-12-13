import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import LZString from "lz-string";

// Lazy load Monaco Editor to avoid SSR issues
const Editor = lazy(() => import("@monaco-editor/react"));

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

declare global {
  interface Window {
    __LUMOS_WASM__?: WasmModule & { ready?: boolean };
  }
}

export default function PlaygroundComponent() {
  const [schemaCode, setSchemaCode] = useState(examples.account.code);
  const [rustOutput, setRustOutput] = useState("// Loading WASM...");
  const [tsOutput, setTsOutput] = useState("// Loading WASM...");
  const [error, setError] = useState<string | null>(null);
  const [isWasmReady, setIsWasmReady] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedExample, setSelectedExample] = useState("account");
  const [activeOutputTab, setActiveOutputTab] = useState<"rust" | "typescript">("rust");
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

  // Load WASM module on mount
  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Check if already loaded
        if (window.__LUMOS_WASM__?.ready) {
          wasmRef.current = window.__LUMOS_WASM__ as WasmModule;
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
        const wasm = window.__LUMOS_WASM__;
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
  }, [compile]);

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
  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
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
    } catch (err) {
      console.error("Copy failed:", err);
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
  };

  const currentOutput = activeOutputTab === "rust" ? rustOutput : tsOutput;
  const currentCopied = activeOutputTab === "rust" ? copiedRust : copiedTs;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Playground</h1>
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
              isWasmReady
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}>
              {isWasmReady ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  WASM Ready
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Loading...
                </>
              )}
            </span>
            {isCompiling && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Compiling...
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Example selector */}
            <select
              value={selectedExample}
              onChange={handleExampleChange}
              className="h-9 px-3 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">Load example...</option>
              {Object.entries(examples).map(([key, { name, category }]) => (
                <option key={key} value={key}>
                  [{category}] {name}
                </option>
              ))}
            </select>

            {/* Share button */}
            <button
              onClick={generateShareUrl}
              disabled={!isWasmReady}
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-9 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
            >
              {copiedShare ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              )}
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center gap-2 text-red-400 text-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="truncate">{error}</span>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col border-r border-border min-h-0">
          <div className="px-4 py-2 border-b border-border bg-secondary/30 flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              .lumos Schema
            </span>
          </div>
          <div className="flex-1 min-h-[200px]">
            <Suspense fallback={<div className="p-4 text-muted-foreground">Loading editor...</div>}>
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
            </Suspense>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-4 py-2 border-b border-border bg-secondary/30 flex items-center justify-between">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveOutputTab("rust")}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeOutputTab === "rust"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Rust
              </button>
              <button
                onClick={() => setActiveOutputTab("typescript")}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeOutputTab === "typescript"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                TypeScript
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => copyToClipboard(currentOutput, activeOutputTab === "rust" ? "rust" : "ts")}
                disabled={!isWasmReady || !!error}
                className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                title="Copy"
              >
                {currentCopied ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => downloadFile(currentOutput, activeOutputTab === "rust" ? "generated.rs" : "generated.ts")}
                disabled={!isWasmReady || !!error}
                className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                title="Download"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[200px]">
            <Suspense fallback={<div className="p-4 text-muted-foreground">Loading editor...</div>}>
              <Editor
                height="100%"
                language={activeOutputTab === "rust" ? "rust" : "typescript"}
                value={currentOutput}
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
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
