import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center">
      <span className="font-mono text-xs text-blue-2">404</span>
      <h1 className="mb-3 mt-2 font-display text-2xl font-semibold text-text">Page not found</h1>
      <p className="mb-8 max-w-sm font-body text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-body text-sm text-blue-2 transition-colors hover:text-blue"
      >
        <ArrowLeft size={15} /> Back to home
      </Link>
    </div>
  );
}