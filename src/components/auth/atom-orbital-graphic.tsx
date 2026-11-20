interface AtomOrbitalGraphicProps {
  className?: string;
  isDark?: boolean;
}

export function AtomOrbitalGraphic({ className = "w-full h-full", isDark = true }: AtomOrbitalGraphicProps) {
  // Color palette dynamically adapted for dark hero panel vs light form background
  const shellPrimary = isDark ? "#059669" : "#059669";
  const shellSecondary = isDark ? "#334155" : "#059669";
  const shellMuted = isDark ? "#64748B" : "#047857";

  const orbit1Stroke = "#059669";
  const orbit2Stroke = isDark ? "#10B981" : "#10B981";
  const orbit3Stroke = isDark ? "#64748B" : "#047857";
  const orbit4Stroke = isDark ? "#34D399" : "#059669";
  const orbit5Stroke = isDark ? "#334155" : "#10B981";

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric Quantum Energy Shells */}
      <circle
        cx="200"
        cy="200"
        r="180"
        stroke={shellSecondary}
        strokeWidth="1.4"
        strokeDasharray="5 9"
        strokeOpacity={isDark ? "0.4" : "0.6"}
      />
      <circle
        cx="200"
        cy="200"
        r="142"
        stroke={shellPrimary}
        strokeWidth="1.4"
        strokeDasharray="6 8"
        strokeOpacity={isDark ? "0.3" : "0.55"}
      />
      <circle
        cx="200"
        cy="200"
        r="96"
        stroke={shellMuted}
        strokeWidth="1.2"
        strokeDasharray="4 6"
        strokeOpacity={isDark ? "0.25" : "0.5"}
      />
      <circle
        cx="200"
        cy="200"
        r="58"
        stroke={shellPrimary}
        strokeWidth="1.0"
        strokeDasharray="2 4"
        strokeOpacity={isDark ? "0.2" : "0.45"}
      />

      {/* Quadrant Scientific Alignment Reticle Cross-ticks */}
      {/* Top tick with crossbar */}
      <line x1="200" y1="10" x2="200" y2="26" stroke="#059669" strokeWidth="1.8" strokeOpacity={isDark ? "0.75" : "0.85"} />
      <line x1="194" y1="16" x2="206" y2="16" stroke="#059669" strokeWidth="1.4" strokeOpacity={isDark ? "0.75" : "0.85"} />

      {/* Bottom tick with crossbar */}
      <line x1="200" y1="374" x2="200" y2="390" stroke="#059669" strokeWidth="1.8" strokeOpacity={isDark ? "0.75" : "0.85"} />
      <line x1="194" y1="384" x2="206" y2="384" stroke="#059669" strokeWidth="1.4" strokeOpacity={isDark ? "0.75" : "0.85"} />

      {/* Left tick with crossbar */}
      <line x1="10" y1="200" x2="26" y2="200" stroke="#059669" strokeWidth="1.8" strokeOpacity={isDark ? "0.75" : "0.85"} />
      <line x1="16" y1="194" x2="16" y2="206" stroke="#059669" strokeWidth="1.4" strokeOpacity={isDark ? "0.75" : "0.85"} />

      {/* Right tick with crossbar */}
      <line x1="374" y1="200" x2="390" y2="200" stroke="#059669" strokeWidth="1.8" strokeOpacity={isDark ? "0.75" : "0.85"} />
      <line x1="384" y1="194" x2="384" y2="206" stroke="#059669" strokeWidth="1.4" strokeOpacity={isDark ? "0.75" : "0.85"} />

      {/* 45-degree Reference Quadrant Nodes */}
      <circle cx="73" cy="73" r="2.5" fill={shellSecondary} fillOpacity={isDark ? "0.7" : "0.8"} />
      <circle cx="327" cy="73" r="2.5" fill={shellSecondary} fillOpacity={isDark ? "0.7" : "0.8"} />
      <circle cx="73" cy="327" r="2.5" fill={shellSecondary} fillOpacity={isDark ? "0.7" : "0.8"} />
      <circle cx="327" cy="327" r="2.5" fill={shellSecondary} fillOpacity={isDark ? "0.7" : "0.8"} />

      {/* Slowly Rotating Gyroscopic Quantum Orbital System */}
      <g className="animate-[spin_90s_linear_infinite] origin-[200px_200px]">
        {/* Orbit 1: Primary Emerald Ellipse (-35 deg) */}
        <ellipse
          cx="200"
          cy="200"
          rx="168"
          ry="58"
          transform="rotate(-35 200 200)"
          stroke={orbit1Stroke}
          strokeWidth="2"
          strokeOpacity={isDark ? "0.9" : "0.85"}
        />

        {/* Orbit 2: Mint Energy Ellipse (+35 deg) */}
        <ellipse
          cx="200"
          cy="200"
          rx="168"
          ry="58"
          transform="rotate(35 200 200)"
          stroke={orbit2Stroke}
          strokeWidth="1.8"
          strokeOpacity={isDark ? "0.8" : "0.8"}
        />

        {/* Orbit 3: Deep Slate / Cyan Orbit (-75 deg) */}
        <ellipse
          cx="200"
          cy="200"
          rx="160"
          ry="54"
          transform="rotate(-75 200 200)"
          stroke={orbit3Stroke}
          strokeWidth="1.6"
          strokeOpacity={isDark ? "0.55" : "0.75"}
        />

        {/* Orbit 4: Light Emerald Orbit (+75 deg) */}
        <ellipse
          cx="200"
          cy="200"
          rx="160"
          ry="54"
          transform="rotate(75 200 200)"
          stroke={orbit4Stroke}
          strokeWidth="1.6"
          strokeOpacity={isDark ? "0.45" : "0.75"}
        />

        {/* Orbit 5: Equatorial Horizontal Ring (0 deg) */}
        <ellipse
          cx="200"
          cy="200"
          rx="172"
          ry="56"
          stroke={orbit5Stroke}
          strokeWidth="1.4"
          strokeOpacity={isDark ? "0.4" : "0.65"}
        />

        {/* Luminous Quantum Particles (Electrons / Energy Packets) */}
        {/* Particle 1 on Orbit 1 (-35 deg) */}
        <circle cx="325" cy="112" r="5" fill="#059669" />
        <circle cx="325" cy="112" r="9" fill="#059669" fillOpacity={isDark ? "0.25" : "0.35"} />
        <circle cx="75" cy="288" r="4" fill={isDark ? "#A7F3D0" : "#10B981"} />

        {/* Particle 2 on Orbit 2 (+35 deg) */}
        <circle cx="325" cy="288" r="5" fill="#10B981" />
        <circle cx="325" cy="288" r="9" fill="#10B981" fillOpacity={isDark ? "0.25" : "0.35"} />
        <circle cx="75" cy="112" r="4" fill={isDark ? "#6EE7B7" : "#059669"} />

        {/* Particle 3 on Orbit 3 (-75 deg) */}
        <circle cx="160" cy="46" r="4" fill={isDark ? "#94A3B8" : "#059669"} />

        {/* Particle 4 on Orbit 4 (+75 deg) */}
        <circle cx="240" cy="354" r="4" fill={isDark ? "#A7F3D0" : "#10B981"} />

        {/* Particles on Equator */}
        <circle cx="368" cy="200" r="4" fill={isDark ? "#E2E8F0" : "#059669"} />
        <circle cx="32" cy="200" r="3.5" fill={isDark ? "#64748B" : "#10B981"} />
      </g>

      {/* Stationary Dense Core Quantum Nucleus */}
      <circle cx="200" cy="200" r="30" fill="#059669" fillOpacity={isDark ? "0.12" : "0.18"} />
      <circle cx="200" cy="200" r="20" fill="#059669" fillOpacity={isDark ? "0.25" : "0.35"} />
      <circle cx="200" cy="200" r="12" fill="#059669" fillOpacity={isDark ? "0.5" : "0.6"} />
      <circle cx="200" cy="200" r="6.5" fill="#10B981" />
      <circle cx="200" cy="200" r="2.5" fill={isDark ? "#FFFFFF" : "#047857"} />
    </svg>
  );
}

