import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="font-mono text-xs text-muted">© {new Date().getFullYear()}</span>
        {/* Unlabeled on purpose - the "secret" entry point into /admin. */}
        <Link href="/admin" aria-label="Admin panel" className="h-1.5 w-1.5 rounded-full bg-line" />
      </div>
    </footer>
  );
}
