"use client";

import { useEffect, useState } from "react";
import { useJarvisStore } from "@/lib/store";

export default function Topbar() {
  const { sessionCounter, shellMode, syncStatus, lastSaveAt } = useJarvisStore();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false }));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const syncLabel = syncStatus === "saving" ? "SAVING" : syncStatus === "error" ? "ERROR" : "SAVED";
  const syncColor = syncStatus === "error" ? "badge-red" : "badge-green";

  return (
    <header className="col-start-2 row-start-1 bg-j-bg1 border-b border-j-bd flex items-center gap-2 px-3.5 overflow-hidden">
      {/* Identity */}
      <span className="font-mono text-[11px] font-bold tracking-wider text-j-amber">JARVIS OS</span>
      <span className="text-j-dim">/</span>
      <span className="font-mono text-[10px] text-j-muted">v0.4.6</span>

      {/* Badges */}
      <span className="badge-amber px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">M8</span>
      <span className="badge-cyan px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">Gold Law</span>
      <span className="badge-green px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">
        {shellMode === "gold_law" ? "Gold Law" : shellMode.charAt(0).toUpperCase() + shellMode.slice(1)}
      </span>
      <span className="badge-amber px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">Hado 95</span>

      {/* Session */}
      <span className="badge-cyan px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">
        S-00{sessionCounter}
      </span>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        <span className={`${syncColor} px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase`}>
          {syncLabel}
        </span>
        <span className="font-mono text-[10px] text-j-dim">{time}</span>
      </div>
    </header>
  );
}
