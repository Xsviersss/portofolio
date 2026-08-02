export function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="atmosphere-orb absolute left-1/2 -top-[180px] h-[560px] w-[760px] -translate-x-1/2 blur-[40px]"
        style={{ background: "radial-gradient(circle, var(--color-blue-dim) 0%, transparent 70%)" }}
      />
    </div>
  );
}
