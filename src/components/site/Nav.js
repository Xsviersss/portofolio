"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Menu } from "lucide-react";

const LINKS = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-display text-[17px] font-bold tracking-tight text-text">
          A<span className="text-blue">.</span>R
        </a>
        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="font-body text-sm text-muted transition-colors hover:text-text">
              {label}
            </a>
          ))}
          <Link href="/admin" title="Admin" className="text-muted transition-colors hover:text-blue-2">
            <Lock size={15} />
          </Link>
        </nav>
        <button
          className="text-text sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t border-line px-6 pb-4 sm:hidden">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="pt-2.5 font-body text-sm text-muted"
            >
              {label}
            </a>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)} className="pt-1.5 font-body text-sm text-muted">
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
