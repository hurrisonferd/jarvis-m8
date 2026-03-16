"use client";

import { useJarvisStore, sel } from "@/lib/store";
import { SectionLabel, StatCard, Badge } from "@/components/ui";

const MODULE_STATUS: { key: string; label: string; status: "active" | "partial" | "loaded" | "disabled" }[] = [
  { key: "jarvis_core",    label: "jarvis_core",    status: "active" },
  { key: "de3_engine",     label: "de3_engine",     status: "active" },
  { key: "log_horizon",    label: "log_horizon",    status: "partial" },
  { key: "sync_protocol",  label: "sync_protocol",  status: "active" },
  { key: "2ds_engine",     label: "2ds_engine",     status: "active" },
  { key: "vault",          label: "vault",          status: "active" },
  { key: "musicos",        label: "musicos",        status: "loaded" },
  { key: "snapshot_engine",label: "snapshot_engine",status: "active" },
];

const STATUS_VARIANT: Record<string, "green" | "yellow" | "cyan" | "gray"> = {
  active: "green", partial: "yellow", loaded: "cyan", disabled: "gray",
};

function timeStr(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function StatusPage() {
  const store = useJarvisStore();
  const project = sel.activeProject(store);

  const snapCount = project ? sel.projectSnapshots(store, project.id).length : 0;
  const artCount = Object.values(store.artifacts).filter((a) => a.projectId === project?.id).length;
  const branchCount = project ? sel.projectBranches(store, project.id).length : 0;

  return (
    <div className="screen-enter max-w-3xl">
      <div className="mb-4">
        <h1 className="text-[15px] font-semibold text-j-text">System Status</h1>
        <div className="text-[10px] font-mono text-j-muted mt-1">
          JARVIS OS v0.4.6 · M8 Alpha · session: S-00{store.sessionCounter}
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <StatCard
          value={store.syncStatus === "saving" ? "SAVING" : store.syncStatus === "error" ? "ERROR" : "SAVED"}
          label="Sync"
          color={store.syncStatus === "error" ? "text-j-red" : "text-j-green"}
        />
        <StatCard value={`S-00${store.sessionCounter}`} label="Session" color="text-j-amber" />
        <StatCard value="ACTIVE" label="Shell" color="text-j-cyan" />
        <StatCard value="0" label="Errors" color="text-j-muted" />
      </div>

      {/* Module status */}
      <SectionLabel>Module Status</SectionLabel>
      <div className="flex flex-col gap-1 mb-4">
        {MODULE_STATUS.map((m) => (
          <div key={m.key} className="flex items-center justify-between bg-j-bg2 rounded-md px-3 py-2 font-mono text-[11px]">
            <span className={STATUS_VARIANT[m.status] === "green" ? "text-j-amber" : STATUS_VARIANT[m.status] === "cyan" ? "text-j-cyan" : "text-j-muted"}>
              {m.label}
            </span>
            <Badge variant={STATUS_VARIANT[m.status]}>{m.status.toUpperCase()}</Badge>
          </div>
        ))}
      </div>

      {/* Parser / router stats */}
      <SectionLabel>Parser / Router</SectionLabel>
      <div className="bg-j-bg1 border border-j-bd rounded-lg p-3 font-mono text-[10px] leading-8 mb-4">
        {[
          ["Parser Mode", "Fast + LLM Fallback"],
          ["Fast Routes", "20 registered"],
          ["LLM Calls This Session", String(store.llmCallCount)],
          ["Commands Logged", String(store.commandLog.length)],
          ["Last Save", timeStr(store.lastSaveAt)],
          ["Session Counter", `S-00${store.sessionCounter}`],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <span className="text-j-muted">{label}</span>
            <span className="text-j-amber">{value}</span>
          </div>
        ))}
      </div>

      {/* Project stats */}
      <SectionLabel>Project Counters</SectionLabel>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <StatCard value={snapCount}   label="Snapshots"  color="text-j-cyan" />
        <StatCard value={artCount}    label="Artifacts"  color="text-j-green" />
        <StatCard value={branchCount} label="Branches"   color="text-j-yellow" />
      </div>

      {/* Error log */}
      <SectionLabel>Error Log</SectionLabel>
      <div className="bg-j-bg2 border border-j-bd rounded-lg p-3 font-mono text-[10px] text-j-dim">
        No errors in current session.
      </div>
    </div>
  );
}
