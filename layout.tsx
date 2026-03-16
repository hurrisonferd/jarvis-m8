"use client";

import { useRouter, useParams } from "next/navigation";
import { useJarvisStore } from "@/lib/store";
import { Card, SectionLabel, Badge, Btn } from "@/components/ui";

const TYPE_VARIANT: Record<string, "amber" | "cyan" | "green" | "yellow" | "gray"> = {
  spec: "amber", packet: "cyan", plan: "yellow",
  log: "green", note: "gray", song_state: "yellow",
};

export default function ArtifactDetailPage() {
  const router = useRouter();
  const params = useParams();
  const store = useJarvisStore();
  const artifactId = params.id as string;
  const artifact = store.artifacts[artifactId] ?? store.selectedArtifactId ? store.artifacts[store.selectedArtifactId!] : null;

  if (!artifact) {
    return (
      <div className="screen-enter flex flex-col items-center justify-center h-full gap-3">
        <div className="text-j-dim font-mono text-[13px]">Artifact not found.</div>
        <Btn onClick={() => router.push("/vault")}>← Back to Vault</Btn>
      </div>
    );
  }

  const project = store.projects[artifact.projectId];
  const snapshot = artifact.snapshotId ? store.snapshots[artifact.snapshotId] : null;

  const handleDuplicate = () => {
    const copy = store.duplicateArtifact(artifact.id);
    router.push(`/vault/${copy.id}`);
  };

  const handleDelete = () => {
    store.deleteArtifact(artifact.id);
    router.push("/vault");
  };

  return (
    <div className="screen-enter max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-[16px] font-semibold text-j-text">{artifact.title}</h1>
          <div className="text-[9px] font-mono text-j-muted mt-1">
            {artifact.id.slice(0, 8)} · {artifact.moduleId ?? "—"} · {artifact.branchId ? "main" : "—"}
          </div>
        </div>
        <Badge variant={TYPE_VARIANT[artifact.type] ?? "gray"}>{artifact.type}</Badge>
      </div>

      {/* Tags */}
      {artifact.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-4">
          {artifact.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-mono text-j-dim bg-j-bg2 border border-j-bd px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content preview */}
      <SectionLabel>Content</SectionLabel>
      <pre className="bg-j-bg2 border border-j-bd rounded-lg p-3.5 font-mono text-[10px] text-j-muted whitespace-pre-wrap leading-7 mb-4 max-h-64 overflow-y-auto">
        {artifact.content || artifact.previewText || "No content."}
      </pre>

      {/* Metadata */}
      <SectionLabel>Metadata</SectionLabel>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Card className="p-2.5">
          <div className="text-[9px] font-mono text-j-dim uppercase tracking-wider mb-1">Project</div>
          <div className="text-[11px] font-mono text-j-text">{project?.title ?? "—"}</div>
        </Card>
        <Card className="p-2.5">
          <div className="text-[9px] font-mono text-j-dim uppercase tracking-wider mb-1">Branch</div>
          <div className="text-[11px] font-mono text-j-text">{artifact.branchId ? "main" : "—"}</div>
        </Card>
        <Card className="p-2.5">
          <div className="text-[9px] font-mono text-j-dim uppercase tracking-wider mb-1">Snapshot</div>
          <div className="text-[11px] font-mono text-j-text">
            {snapshot ? snapshot.stateHash : "—"}
          </div>
        </Card>
        <Card className="p-2.5">
          <div className="text-[9px] font-mono text-j-dim uppercase tracking-wider mb-1">Module</div>
          <div className="text-[11px] font-mono text-j-text">{artifact.moduleId ?? "—"}</div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <Btn primary>Open Full</Btn>
        <Btn onClick={handleDuplicate}>Duplicate</Btn>
        <Btn onClick={() => store.pinArtifactToProject && store.projects[artifact.projectId]?.pinnedArtifactIds.includes(artifact.id) ? null : null}>
          Pin
        </Btn>
        <Btn onClick={() => router.push("/timeline")}>View Snapshot</Btn>
        <Btn onClick={() => router.push("/vault")}>← Vault</Btn>
        <Btn danger onClick={handleDelete}>Delete</Btn>
      </div>
    </div>
  );
}
