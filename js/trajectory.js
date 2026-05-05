/* ============================================
   NeuroViz — Disease Trajectory Figure
   ============================================
   Visual that replaces the abstract "severity gradient" with a
   patient-friendly arrow showing how dementia develops:
   Preclinical (silent) → MCI (warning signs) → Dementia (symptomatic)
   ============================================ */

const NV_TRAJECTORY = {

  render(target) {
    if (!target) return;

    const svg = `
      <svg class="trajectory-svg"
           viewBox="0 0 800 220"
           preserveAspectRatio="xMidYMid meet"
           width="100%" style="display:block;">
        <defs>
          <linearGradient id="trajGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"  stop-color="#a8c8a8"/>
            <stop offset="40%" stop-color="#d8b070"/>
            <stop offset="80%" stop-color="#a04848"/>
            <stop offset="100%" stop-color="#6b1f1a"/>
          </linearGradient>
          <marker id="trajArrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b1f1a"/>
          </marker>
        </defs>

        <!-- Trajectory bar -->
        <rect x="20" y="80" width="730" height="36"
              fill="url(#trajGrad)" stroke="#5a4a3a" stroke-width="0.5"/>
        <line x1="20" y1="98" x2="755" y2="98"
              stroke="#6b1f1a" stroke-width="2" marker-end="url(#trajArrow)" />

        <!-- Stage 1: Preclinical -->
        <g class="traj-stage">
          <circle cx="120" cy="98" r="18" fill="#fff" stroke="#6a8a6a" stroke-width="2.5"/>
          <text x="120" y="103" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="11"
                font-weight="700" fill="#3a5a3a">1</text>
          <text x="120" y="55" text-anchor="middle"
                font-family="Fraunces, serif" font-size="17" font-style="italic"
                font-weight="600" fill="#2a2a2a">Preclinical</text>
          <text x="120" y="145" text-anchor="middle"
                font-family="IBM Plex Sans, sans-serif" font-size="11"
                fill="#5a5a5a">No symptoms.</text>
          <text x="120" y="159" text-anchor="middle"
                font-family="IBM Plex Sans, sans-serif" font-size="11"
                fill="#5a5a5a">Brain changes only.</text>
          <text x="120" y="180" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="9"
                letter-spacing="0.06em" fill="#8a8a8a">15–20 YEARS</text>
        </g>

        <!-- Stage 2: MCI -->
        <g class="traj-stage">
          <circle cx="385" cy="98" r="18" fill="#fff" stroke="#b88a3a" stroke-width="2.5"/>
          <text x="385" y="103" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="11"
                font-weight="700" fill="#7a5a1a">2</text>
          <text x="385" y="55" text-anchor="middle"
                font-family="Fraunces, serif" font-size="17" font-style="italic"
                font-weight="600" fill="#2a2a2a">MCI</text>
          <text x="385" y="36" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="9"
                letter-spacing="0.04em" fill="#8a8a8a">MILD COGNITIVE IMPAIRMENT</text>
          <text x="385" y="145" text-anchor="middle"
                font-family="IBM Plex Sans, sans-serif" font-size="11"
                fill="#5a5a5a">Memory slips noticeable.</text>
          <text x="385" y="159" text-anchor="middle"
                font-family="IBM Plex Sans, sans-serif" font-size="11"
                fill="#5a5a5a">Daily life still independent.</text>
          <text x="385" y="180" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="9"
                letter-spacing="0.06em" fill="#8a8a8a">2–7 YEARS</text>
        </g>

        <!-- Stage 3: Dementia -->
        <g class="traj-stage">
          <circle cx="650" cy="98" r="18" fill="#fff" stroke="#a04848" stroke-width="2.5"/>
          <text x="650" y="103" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="11"
                font-weight="700" fill="#6b1f1a">3</text>
          <text x="650" y="55" text-anchor="middle"
                font-family="Fraunces, serif" font-size="17" font-style="italic"
                font-weight="600" fill="#2a2a2a">Dementia</text>
          <text x="650" y="145" text-anchor="middle"
                font-family="IBM Plex Sans, sans-serif" font-size="11"
                fill="#5a5a5a">Daily activities affected.</text>
          <text x="650" y="159" text-anchor="middle"
                font-family="IBM Plex Sans, sans-serif" font-size="11"
                fill="#5a5a5a">Mild → moderate → severe.</text>
          <text x="650" y="180" text-anchor="middle"
                font-family="JetBrains Mono, monospace" font-size="9"
                letter-spacing="0.06em" fill="#8a8a8a">8–12 YEARS</text>
        </g>

        <!-- "Not everyone progresses" annotation -->
        <text x="385" y="208" text-anchor="middle"
              font-family="IBM Plex Sans, sans-serif" font-size="10"
              font-style="italic" fill="#7a5a3a">
          ~10–15% of people with MCI progress to dementia each year — but not everyone does.
        </text>
      </svg>
    `;

    target.innerHTML = svg;
  }
};

if (typeof window !== 'undefined') window.NV_TRAJECTORY = NV_TRAJECTORY;
