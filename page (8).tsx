"use client";

import { useRouter } from "next/navigation";
import { useJarvisStore, sel } from "@/lib/store";
import type { ArtifactType } from "@/lib/store";
import { SectionLabel, Badge, Btn } from "@/components/ui";
import { clsx } from "clsx";

const TYPE_VARIANT: Record<string, "amber" | "cyan" | "green" | "yellow" | "gray"> = {
  spec: "amber", packet: "cyan", plan: "yellow",
  log: "green", note: "gray", song_state: "yellow",
  prompt: "amber", card: "gray", export: "gray", image: "gray", recommendation: "cyan",
};

const FILTERS: { label: string; value: ArtifactType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Specs", value: "spec" },
  { label: "Packets", value: "packet" },
  { label: "Plans", value: "plan" },
  { label: "Logs", value: "log" },
  { label: "Notes", value: "note" },
  { label: "Songs", value: "song_state" },
];

const SORTS = [
  { label: "Newest", value: "created_desc" as const },
  { label: "Oldest", value: "created_asc" as const },
  { label: "Title", value: "title_asc" as const },
  { label: "Type", value: "type" as const },
];

export default function VaultPage() {
  const router = useRouter();
  const store = useJarvisStore();
  const { vaultFilter, vaultSearch, vaultSort, setVaultFilter, setVaultSearch, setVaultSort, setSelectedArtifact, clearVaultFilters } = store;
  const artifacts = sel.filteredArtifacts(store);
  const allTags = sel.allTags(store);

  return (
    <div className="screen-enter max-w-4xl">
      {/* Search */}
      <input
        type="text"
        value={vaultSearch}
        onChange={(e) => setVaultSearch(e.target.value)}
        placeholder="Search artifacts by title, tag, or content…"
        className="w-full bg-j-bg2 border border-j-bd rounded-lg px-3 py-2 font-mono text-[11px] text-j-text placeholder:text-j-dim outline-none focus:border-j-amber-d transition-colors mb-3"
      />

      {/* Filter chips */}
      <div className="flex gap-1.5 flex-wrap mb-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setVaultFilter(f.value)}
            className={clsx(
              "px-3 py-1 rounded-full border text-[10px] font-mono transition-all",
              vaultFilter === f.value
                ? "bg-j-amber border-j-amber text-black font-bold"
                : "bg-transparent border-j-bd text-j-muted hover:border-j-muted hover:text-j-text"
            )}
          >
            {f.label}
          </button>
        ))}

        {/* Sort */}
        <div className="ml-auto flex gap-1.5">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => setVaultSort(s.value)}
              className={clsx(
                "px-2.5 py-1 rounded border text-[9px] font-mono transition-all",
                vaultSort === s.value
                  ? "bg-j-bg3 border-j-muted text-j-text"
                  : "bg-transparent border-j-bd text-j-dim hover:text-j-muted"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex gap-1 flex-wrap mb-3">
          {allTags.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => store.toggleTag(tag)}
              className={clsx(
                "px-2 py-0.5 rounded text-[9px] font-mono border transition-all",
                store.tagFilter.includes(tag)
                  ? "bg-j-bg3 border-j-muted text-j-text"
                  : "bg-transparent border-j-bd text-j-dim hover:text-j-muted"
              )}
            >
              #{tag}
            </button>
          ))}
          {(vaultSearch || vaultFilter !== "all" || store.tagFilter.length > 0) && (
            <button
              onClick={clearVaultFilters}
              className="px-2 py-0.5 rounded text-[9px] font-mono border border-j-red text-j-red hover:bg-j-red hover:text-black transition-all"
            >
              clear
            </button>
          )}
        </div>
      )}

      <SectionLabel>{artifacts.length} artifact{artifacts.length !== 1 ? "s" : ""}</SectionLabel>

      {/* Grid */}
      {artifacts.length === 0 ? (
        <div className="text-center py-12 text-j-dim font-mono text-[12px]">
          No artifacts match current filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {artifacts.map((art) => (
            <div
              key={art.id}
              onClick={() => { setSelectedArtifact(art.id); router.push(`/vault/${art.id}`); }}
              className="bg-j-bg1 border border-j-bd rounded-lg p-2.5 cursor-pointer hover:border-j-muted transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-j-text truncate pr-2">{art.title}</span>
                <Badge variant={TYPE_VARIANT[art.type] ?? "gray"}>{art.type}</Badge>
              </div>
              <div className="text-[10px] text-j-muted leading-relaxed mb-1.5">{art.previewText}</div>
              <div className="flex gap-1 flex-wrap mb-1">
                {art.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[8px] font-mono text-j-dim">#{tag}</span>
                ))}
              </div>
              <div className="text-[9px] font-mono text-j-dim">
                {art.moduleId ?? "—"} · {art.branchId ? "main" : "—"} · recently
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
