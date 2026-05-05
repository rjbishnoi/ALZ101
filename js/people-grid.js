/* ============================================
   NeuroViz — People Grid Visualization
   ============================================
   Replaces the abstract treemap heatmap with a "100 people" pictogram.
   Each person icon represents 1% of the dementia population, color-coded
   by underlying disease. Designed to be immediately readable to patients
   and families: "of 100 people with dementia, 60 have Alzheimer's, 10
   have vascular dementia..."
   ============================================ */

const NV_PEOPLE = {

  // SVG path for a single "person" icon (head + shoulders silhouette)
  // ViewBox is 24x32; we draw at 24x32 then scale.
  PERSON_PATH:
    'M12 2 C 9 2 7 4 7 7 C 7 10 9 12 12 12 C 15 12 17 10 17 7 C 17 4 15 2 12 2 Z ' +
    'M5 30 L5 22 C 5 17 8 14 12 14 C 16 14 19 17 19 22 L 19 30 Z',

  /**
   * Render the people pictogram into a target element.
   * @param {HTMLElement} target
   * @param {Object} opts { showLegend?: boolean, perRow?: number }
   */
  render(target, opts = {}) {
    if (!target || !window.NV_DATA) return;
    const types = window.NV_DATA.dementiaTypes;
    const perRow = opts.perRow || 20; // 20×5 = 100 icons
    const total = 100;

    // Aggregate to high-level disease groups for the legend / coloring.
    // Each group uses a distinct hue with a gradient-friendly base.
    const groups = [
      { id: 'AD',    name: "Alzheimer's disease",      color: '#c75a3c', count: 60 },
      { id: 'VAS',   name: 'Vascular dementia',        color: '#3c6e9a', count: 10 },
      { id: 'MIX',   name: 'Mixed dementia',           color: '#7a4a8a', count: 10 },
      { id: 'DLB',   name: 'Lewy body dementia',       color: '#8a6a3c', count:  7 },
      { id: 'FTD',   name: 'Frontotemporal dementia',  color: '#3c8a6a', count:  5 },
      { id: 'PDD',   name: "Parkinson's dementia",     color: '#6a8a3c', count:  3 },
      { id: 'OTH',   name: 'Other (NPH, CJD, etc.)',   color: '#9c8b76', count:  5 }
    ];

    // Build the array of 100 colors based on counts
    const personColors = [];
    groups.forEach(g => {
      for (let i = 0; i < g.count; i++) personColors.push({ color: g.color, group: g });
    });

    // Layout: each row holds `perRow` icons. We size the SVG to fill width.
    const containerWidth = target.clientWidth || 880;
    const cols = perRow;
    const rows = Math.ceil(total / cols);
    const iconW = 24;
    const iconH = 32;
    const gap = 4;
    const cellW = iconW + gap;
    const cellH = iconH + gap;
    const innerW = cols * cellW - gap;
    const innerH = rows * cellH - gap;

    // Compute positions
    const icons = personColors.map((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: col * cellW,
        y: row * cellH,
        color: p.color,
        groupId: p.group.id,
        groupName: p.group.name
      };
    });

    // Build SVG
    const svg = `
      <svg class="people-grid-svg"
           viewBox="0 0 ${innerW} ${innerH}"
           preserveAspectRatio="xMidYMid meet"
           width="100%" style="max-width:760px; display:block; margin:0 auto;">
        <g class="people-icons">
          ${icons.map((ic, i) => `
            <g class="person" data-group="${ic.groupId}" data-idx="${i}"
               transform="translate(${ic.x}, ${ic.y})">
              <path d="${this.PERSON_PATH}" fill="${ic.color}"
                    style="transition: opacity 0.18s, filter 0.18s;" />
              <title>${ic.groupName} — person ${i + 1} of 100</title>
            </g>
          `).join('')}
        </g>
      </svg>
    `;

    // Legend with counts
    const legend = `
      <div class="people-legend">
        ${groups.map(g => `
          <button class="people-legend-item" data-group="${g.id}">
            <span class="legend-swatch" style="background:${g.color};"></span>
            <span class="legend-name">${g.name}</span>
            <span class="legend-count">${g.count}<span class="muted">/100</span></span>
          </button>
        `).join('')}
      </div>
    `;

    target.innerHTML = `
      <div class="people-grid-wrap">
        <div class="people-headline">
          <div class="people-headline-text">
            Of every <b>100 people</b> living with dementia, <b style="color:#c75a3c;">~60 have Alzheimer's disease</b>.
            Each figure below represents one person.
          </div>
          <div class="people-headline-meta">Click a group below to highlight it.</div>
        </div>
        ${svg}
        ${legend}
      </div>
    `;

    // Wire up legend hover/click for interactive highlighting
    const grid = target.querySelector('.people-grid-svg');
    target.querySelectorAll('.people-legend-item').forEach(btn => {
      btn.addEventListener('mouseenter', () => this._highlight(grid, btn.dataset.group));
      btn.addEventListener('mouseleave', () => this._highlight(grid, null));
      btn.addEventListener('click',     () => {
        const sel = grid.dataset.selected === btn.dataset.group ? null : btn.dataset.group;
        grid.dataset.selected = sel || '';
        this._highlight(grid, sel);
        target.querySelectorAll('.people-legend-item').forEach(b =>
          b.classList.toggle('is-active', b.dataset.group === sel));
      });
    });
  },

  _highlight(grid, groupId) {
    if (!grid) return;
    const persons = grid.querySelectorAll('.person');
    if (!groupId) {
      persons.forEach(p => {
        p.style.opacity = '';
        p.style.filter = '';
      });
      return;
    }
    persons.forEach(p => {
      if (p.dataset.group === groupId) {
        p.style.opacity = '1';
        p.style.filter  = 'drop-shadow(0 0 1px rgba(0,0,0,0.4))';
      } else {
        p.style.opacity = '0.15';
        p.style.filter  = '';
      }
    });
  }
};

if (typeof window !== 'undefined') window.NV_PEOPLE = NV_PEOPLE;
