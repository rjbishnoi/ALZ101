/* ============================================
   NeuroViz — Heatmap (real squarified treemap)
   Cells are sized proportional to selected metric (prevalence/trials),
   colored by severity. Squarified-treemap layout.
   ============================================ */

const NV_HEATMAP = {

  /**
   * @param {HTMLElement} target
   * @param {Object} opts { metric: 'prevalence' | 'severity' | 'trials', height }
   */
  render(target, opts = {}) {
    const metric = opts.metric || 'prevalence';
    const height = opts.height || 520;
    const width  = target.clientWidth || 880;
    const types  = window.NV_DATA.dementiaTypes;

    // Group taxonomy
    const groupDefs = [
      { name: 'AD Spectrum',        ids: ['AD','PCA','PPA'],         color: '#6b1f1a' },
      { name: 'Synucleinopathies',  ids: ['DLB','PDD'],              color: '#5a4a7a' },
      { name: 'Vascular & Mixed',   ids: ['VAD','MIX'],              color: '#2d5a7a' },
      { name: 'FTD Spectrum',       ids: ['FTD'],                    color: '#7a4a2d' },
      { name: 'Other Dementias',    ids: ['CJD','NPH','HD','WK'],    color: '#4a4a4a' }
    ];
    const groups = groupDefs.map(g => {
      const items = types.filter(t => g.ids.includes(t.id))
        .map(t => ({ ...t, _val: this.metricValue(t, metric) }))
        .sort((a, b) => b._val - a._val);
      const total = items.reduce((s, t) => s + t._val, 0);
      return { ...g, items, total };
    }).filter(g => g.items.length);

    // Squarified for outer groups
    const groupRects = this.squarify(
      groups.map(g => ({ ref: g, value: g.total })),
      { x: 0, y: 0, w: width, h: height }
    );

    // For each group rect, layout its items
    let html = `<div class="heatmap" style="position:relative; width:100%; height:${height}px; background: #0a1818;">`;
    groupRects.forEach(gr => {
      const g = gr.ref;
      // Header band area
      const HEADER = 16;
      const inner = { x: gr.x + 1, y: gr.y + HEADER, w: gr.w - 2, h: gr.h - HEADER - 1 };
      // Group header
      html += `
        <div class="hm-group-band" style="
          position:absolute; left:${gr.x}px; top:${gr.y}px;
          width:${gr.w}px; height:${HEADER}px;
          background:${g.color}; color:white;
          display:flex; align-items:center; padding:0 6px;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; box-sizing: border-box;
          border-bottom: 1px solid rgba(0,0,0,0.4);">
          ${g.name} <span style="margin-left:auto; opacity:0.7;">${g.items.length} types · ${this.formatTotal(g.total, metric)}</span>
        </div>
      `;
      // Cells
      const cellRects = this.squarify(
        g.items.map(t => ({ ref: t, value: Math.max(0.5, t._val) })),
        inner
      );
      cellRects.forEach(cr => {
        const t = cr.ref;
        const sev = this.severityClass(t, metric);
        const valueText = this.metricLabel(t, metric);
        const small = cr.w < 60 || cr.h < 38;
        const tiny  = cr.w < 38 || cr.h < 26;
        html += `
          <a class="hm-cell ${sev}" href="groups.html#${t.id}"
             data-type="${t.id}"
             style="position:absolute; left:${cr.x}px; top:${cr.y}px;
                    width:${cr.w - 1}px; height:${cr.h - 1}px;"
             title="${t.name} — ${valueText}">
            <div class="hm-code">${t.code || t.id}</div>
            ${tiny ? '' : `<div class="hm-val">${valueText}</div>`}
            ${small || tiny ? '' : `<div class="hm-sub">${t.name}</div>`}
          </a>
        `;
      });
    });

    html += '</div>';
    target.innerHTML = html;
  },

  // --------------- Squarified treemap algorithm ---------------

  squarify(items, rect) {
    const out = [];
    if (!items.length) return out;

    const total = items.reduce((s, i) => s + i.value, 0);
    if (total <= 0) return items.map(i => ({ x: rect.x, y: rect.y, w: 0, h: 0, ref: i.ref }));

    const area = rect.w * rect.h;
    const scaled = items.map(i => ({ ...i, area: (i.value / total) * area }));
    scaled.sort((a, b) => b.area - a.area);

    const layout = (list, r) => {
      if (!list.length) return;
      if (list.length === 1) {
        out.push({ x: r.x, y: r.y, w: r.w, h: r.h, ref: list[0].ref });
        return;
      }
      const horizontal = r.w >= r.h;
      const length = horizontal ? r.h : r.w;

      let row = [];
      let bestRatio = Infinity;
      let i = 0;
      while (i < list.length) {
        const candidate = [...row, list[i]];
        const sum = candidate.reduce((s, x) => s + x.area, 0);
        const rowSide = sum / length;
        const worst = candidate.reduce((w, x) => {
          const a = x.area;
          const ratio = Math.max(rowSide * rowSide / a, a / (rowSide * rowSide));
          return Math.max(w, ratio);
        }, 0);
        if (worst > bestRatio) break;
        bestRatio = worst;
        row = candidate;
        i++;
      }
      if (row.length === 0) row = [list[0]];

      const sumRow = row.reduce((s, x) => s + x.area, 0);
      const rowThickness = sumRow / length;
      let cursor = horizontal ? r.y : r.x;
      row.forEach(item => {
        const itemSide = item.area / rowThickness;
        if (horizontal) {
          out.push({ x: r.x, y: cursor, w: rowThickness, h: itemSide, ref: item.ref });
          cursor += itemSide;
        } else {
          out.push({ x: cursor, y: r.y, w: itemSide, h: rowThickness, ref: item.ref });
          cursor += itemSide;
        }
      });

      const remaining = list.slice(row.length);
      if (remaining.length) {
        const rest = horizontal
          ? { x: r.x + rowThickness, y: r.y, w: r.w - rowThickness, h: r.h }
          : { x: r.x, y: r.y + rowThickness, w: r.w, h: r.h - rowThickness };
        layout(remaining, rest);
      }
    };

    layout(scaled, rect);
    return out.map(o => ({
      x: Math.round(o.x), y: Math.round(o.y),
      w: Math.max(1, Math.round(o.w)), h: Math.max(1, Math.round(o.h)),
      ref: o.ref
    }));
  },

  // --------------- Metric helpers ---------------

  TRIAL_COUNTS: { AD: 847, MIX: 142, DLB: 94, FTD: 76, VAD: 68, PDD: 54, PCA: 21, PPA: 38, NPH: 12, HD: 63, CJD: 8, WK: 4 },

  metricValue(type, metric) {
    if (metric === 'prevalence') return type.prevalencePct || 0.5;
    if (metric === 'severity')   return (type.stage || 0) + 1;
    if (metric === 'trials')     return this.TRIAL_COUNTS[type.id] || 1;
    return 1;
  },

  metricLabel(type, metric) {
    if (metric === 'prevalence') return `${type.prevalencePct}%`;
    if (metric === 'severity')   return `Stage ${type.stage}/5`;
    if (metric === 'trials')     return `${this.TRIAL_COUNTS[type.id] || 0} trials`;
    return '';
  },

  formatTotal(t, metric) {
    if (metric === 'prevalence') return `${Math.round(t)}% of cases`;
    if (metric === 'trials')     return `${Math.round(t)} trials`;
    if (metric === 'severity')   return '';
    return '';
  },

  severityClass(type, metric) {
    if (metric === 'severity') return `sev-${type.stage}`;
    if (metric === 'prevalence') {
      const p = type.prevalencePct;
      if (p >= 50) return 'sev-5';
      if (p >= 10) return 'sev-4';
      if (p >= 5)  return 'sev-3';
      if (p >= 2)  return 'sev-2';
      if (p >= 1)  return 'sev-1';
      return 'sev-0';
    }
    if (metric === 'trials') {
      const intensity = { AD: 5, MIX: 4, DLB: 3, FTD: 3, VAD: 3, PDD: 3, PCA: 2, PPA: 2, NPH: 1, HD: 2, CJD: 1, WK: 0 };
      return `sev-${intensity[type.id] || 0}`;
    }
    return 'sev-2';
  }
};

if (typeof window !== 'undefined') window.NV_HEATMAP = NV_HEATMAP;
