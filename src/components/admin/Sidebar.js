"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Eye, LayoutGrid, LogOut, Settings, ShieldCheck, User } from "lucide-react";
import { GhostButton } from "@/components/ui/Button";

const NAV_ITEMS = [
  ["/admin/projects", "Projects", LayoutGrid],
  ["/admin/profile", "Profile", User],
  ["/admin/settings", "Settings", Settings],
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex shrink-0 justify-between border-b border-line bg-surface sm:w-56 sm:flex-col sm:border-b-0 sm:border-r">
      <div className="flex w-full items-center gap-6 p-5 sm:flex-col sm:items-stretch sm:gap-1">
        <div className="mb-2 hidden items-center gap-2 sm:flex">
          <ShieldCheck size={17} className="text-blue-2" />
          <span className="font-display text-sm font-semibold text-text">Admin</span>
        </div>
        {NAV_ITEMS.map(([href, label, Icon]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-[9px] font-body text-[13.5px] font-medium transition-colors ${
                active ? "bg-blue/10 text-blue-2" : "text-muted hover:text-text"
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2 p-5 sm:flex-col sm:items-stretch">
        <Link href="/">
          <GhostButton icon={Eye} className="!px-3 !py-2 !text-[13px]">
            <span className="hidden sm:inline">View site</span>
          </GhostButton>
        </Link>
        <GhostButton icon={LogOut} onClick={logout} className="!px-3 !py-2 !text-[13px]">
          <span className="hidden sm:inline">Log out</span>
        </GhostButton>
      </div>
    </aside>
  );
}
