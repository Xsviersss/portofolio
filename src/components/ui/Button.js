export function PrimaryButton({ children, icon: Icon, className = "", ...props }) {
  return (
    <button
      className={`group inline-flex items-center gap-2 rounded-lg bg-blue px-[18px] py-[11px] font-body text-sm font-medium text-white shadow-[0_0_0_1px_var(--color-blue),0_8px_24px_-8px_rgba(59,108,255,0.55)] transition-colors hover:bg-blue-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={15} className="transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}

export function GhostButton({ children, icon: Icon, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg border border-line px-4 py-[10px] font-body text-sm font-medium text-text transition-colors hover:border-blue ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={15} />}
    </button>
  );
}

export function IconButton({ icon: Icon, className = "", ...props }) {
  return (
    <button className={`rounded-md p-1.5 text-muted transition-colors hover:text-text ${className}`} {...props}>
      <Icon size={15} />
    </button>
  );
}
