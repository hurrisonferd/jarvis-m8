"use client";

import { useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";
import type { Screen } from "@/lib/store";

const NAV_ITEMS: { screen: Screen; icon: string; label: string; path: string }[] = [
  { screen: "home",      icon: "⌂",  label: "Home",           path: "/home" },
  { screen: "cmd",       icon: "$",  label: "Command Center", path: "/cmd" },
  { screen: "project",   icon: "◈",  label: "Project",        path: "/project" },
  { screen: "vault",     icon: "▦",  label: "Vault",          path: "/vault" },
  { screen: "artifact",  icon: "◉",  label: "Artifact",       path: "/vault" },
  { screen: "timeline",  icon: "⌛", label: "Timeline",       path: "/timeline" },
  { screen: "branch",    icon: "⑂",  label: "Branches",       path: "/branch" },
  { screen: "music",     icon: "♫",  label: "MusicOS",        path: "/music" },
];

const BOTTOM_ITEMS = [
  { screen: "settings" as Screen, icon: "⚙",  label: "Settings", path: "/settings" },
  { screen: "status"   as Screen, icon: "◎",  label: "Status",   path: "/status" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path) && path !== "/vault" || pathname === path;

  const navigate = (path: string) => router.push(path);

  return (
    <aside className="col-start-1 row-start-1 row-end-4 bg-j-bg1 border-r border-j-bd flex flex-col items-center py-2 gap-0.5 z-10">
      {/* Logo */}
      <div className="font-mono text-[9px] text-j-amber font-bold mb-2 tracking-wider">JV</div>

      {/* Main nav */}
      {NAV_ITEMS.filter((item, i, arr) =>
        item.screen !== "artifact" || arr.findIndex(x => x.screen === "artifact") === i
      ).filter(item => item.screen !== "artifact").map((item) => (
        <NavBtn
          key={item.screen}
          icon={item.icon}
          label={item.label}
          active={isActive(item.path)}
          onClick={() => navigate(item.path)}
        />
      ))}

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-0.5">
        {BOTTOM_ITEMS.map((item) => (
          <NavBtn
            key={item.screen}
            icon={item.icon}
            label={item.label}
            active={isActive(item.path)}
            onClick={() => navigate(item.path)}
            muted
          />
        ))}
      </div>
    </aside>
  );
}

function NavBtn({ icon, label, active, onClick, muted }: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={clsx(
        "w-[38px] h-[38px] rounded-[7px] border-none flex items-center justify-center text-sm transition-all relative",
        active
          ? "bg-j-bg3 text-j-amber"
          : muted
          ? "bg-transparent text-j-dim hover:bg-j-bg3 hover:text-j-text"
          : "bg-transparent text-j-muted hover:bg-j-bg3 hover:text-j-text",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-j-amber rounded-r-sm" />
      )}
      {icon}
    </button>
  );
}
