"use client";

import { useRef } from "react";
import { useJarvisStore } from "@/lib/store";
import { routeCommand } from "@/lib/parser";

export default function CommandBar() {
  const store = useJarvisStore();
  const { commandInput, isProcessing, setCommandInput } = store;
  const composingRef = useRef(false);

  const handleSubmit = async () => {
    const raw = commandInput.trim();
    if (!raw || isProcessing) return;
    setCommandInput("");
    await routeCommand(raw, store);
  };

  return (
    <div className="col-start-2 row-start-3 bg-j-bg1 border-t border-j-bd flex items-center gap-2.5 px-3.5">
      {/* Prompt symbol */}
      <span className="font-mono text-[13px] text-j-amber flex-shrink-0">
        {isProcessing ? (
          <span className="pulse-amber">▸</span>
        ) : "$"}
      </span>

      {/* Input */}
      <input
        type="text"
        value={commandInput}
        onChange={(e) => setCommandInput(e.target.value)}
        onCompositionStart={() => { composingRef.current = true; }}
        onCompositionEnd={() => { composingRef.current = false; }}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && !composingRef.current) {
            e.preventDefault();
            await handleSubmit();
          }
          if (e.key === "ArrowUp") { e.preventDefault(); store.historyUp(); }
          if (e.key === "ArrowDown") { e.preventDefault(); store.historyDown(); }
        }}
        placeholder="enter command... (open vault · snapshot now · open music · show recs)"
        disabled={isProcessing}
        className="flex-1 bg-j-bg2 border border-j-bd rounded-md px-2.5 py-1 font-mono text-[11px] text-j-text placeholder:text-j-dim outline-none focus:border-j-amber-d transition-colors disabled:opacity-60"
      />

      {/* Hints */}
      <span className="font-mono text-[10px] text-j-dim hidden sm:block">↑ hist</span>
      <kbd className="bg-j-bg3 border border-j-bd rounded px-1 py-0.5 text-[9px] font-mono text-j-muted hidden sm:block">⌘K</kbd>
    </div>
  );
}
