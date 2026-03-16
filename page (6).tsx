"use client";

import { useJarvisStore } from "@/lib/store";
import { SectionLabel } from "@/components/ui";

export default function CmdPage() {
  const { commandResult, commandLog, llmCallCount, sessionCounter } = useJarvisStore();

  return (
    <div className="screen-enter max-w-3xl">
      <SectionLabel>Result</SectionLabel>
      <pre className="bg-j-bg2 border border-j-bd rounded-lg p-3 font-mono text-[11px] text-j-muted whitespace-pre-wrap leading-7 min-h-[80px] mb-4">
        {commandResult}
      </pre>

      <SectionLabel>Command Log</SectionLabel>
      <div className="flex flex-col gap-1 mb-4">
        {commandLog.length === 0 && (
          <div className="text-[10px] font-mono text-j-dim py-2">No commands yet this session.</div>
        )}
        {commandLog.map((entry) => (
          <div
            key={entry.id}
            className={`px-3 py-1.5 rounded-md bg-j-bg2 font-mono text-[10px] border-l-2 ${
              entry.status === "ok" ? "border-l-j-green" : entry.status === "error" ? "border-l-j-red" : "border-l-j-bd"
            }`}
          >
            <span className={entry.status === "ok" ? "text-j-green" : entry.status === "error" ? "text-j-red" : "text-j-muted"}>$</span>
            {" "}
            <span className="text-j-text">{entry.raw}</span>
            <span className="text-j-dim ml-2">—</span>
            <span className="text-j-dim ml-2">{entry.resultText.split("\n")[0]}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-j-bg1 border border-j-bd rounded-lg p-3 font-mono text-[10px] leading-7">
          <div className="text-[9px] text-j-dim uppercase tracking-wider mb-2">Navigation</div>
          {["open home", "open vault", "open project", "open timeline", "open branch", "open music", "open settings", "open status"].map((cmd) => (
            <div key={cmd} className="text-j-amber">{cmd}</div>
          ))}
        </div>
        <div className="bg-j-bg1 border border-j-bd rounded-lg p-3 font-mono text-[10px] leading-7">
          <div className="text-[9px] text-j-dim uppercase tracking-wider mb-2">Actions</div>
          {["snapshot now", "branch create [name]", "show recs", "open music", "open cmd"].map((cmd) => (
            <div key={cmd} className="text-j-cyan">{cmd}</div>
          ))}
          <div className="border-t border-j-bd mt-2 pt-2 text-[9px] text-j-dim">
            <div>LLM calls: {llmCallCount} · S-00{sessionCounter}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
