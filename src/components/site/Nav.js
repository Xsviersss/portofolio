"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Menu, X } from "lucide-react";

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
          className="relative h-5 w-5 text-text sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu
            size={20}
            className={`absolute inset-0 transition-all duration-200 ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            size={20}
            className={`absolute inset-0 transition-all duration-200 ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out sm:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 border-t border-line px-6 pb-4 pt-1">
            {LINKS.map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`translate-y-0 py-2 font-body text-sm text-muted transition-all duration-300 hover:text-text ${
                  open ? "opacity-100" : "-translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                {label}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className={`py-2 font-body text-sm text-muted transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${LINKS.length * 40}ms` : "0ms" }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}