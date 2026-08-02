export function Field({ label, children, className = "" }) {
  return (
    <label className={`mb-4 block ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClasses =
  "w-full rounded-[7px] border border-line bg-surface-2 px-3 py-[9px] font-body text-sm text-text outline-none transition-colors focus:border-blue";

export function TextInput({ className = "", ...props }) {
  return <input className={`${inputClasses} ${className}`} {...props} />;
}

export function TextArea({ className = "", ...props }) {
  return <textarea className={`${inputClasses} min-h-[80px] resize-y ${className}`} {...props} />;
}

export function Tag({ children }) {
  return (
    <span className="rounded-[5px] border border-blue/20 bg-blue/10 px-2 py-[3px] font-mono text-[11px] text-blue-2">
      {children}
    </span>
  );
}
