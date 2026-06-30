export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy" aria-hidden>
      <div className="hero-header-scrim absolute inset-0" />
      <div className="hero-map-overlay absolute inset-0" />
      <div className="hero-map-vignette absolute inset-0" />
    </div>
  );
}
