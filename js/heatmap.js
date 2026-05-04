/* ============================================
   NeuroViz — Heatmap (Finviz-style treemap)
   Renders dementia types as scaled cells colored
   by selected metric (severity / prevalence / trial activity).
   ============================================ */

const NV_HEATMAP = {

  /**
   * Renders the heatmap into a target element.
   * @param {HTMLElement} target
   * @param {Object} opts { metric: 'severity' | 'prevalence' | 'trials' }
   */
  render(target, opts = {}) {
    const metric = opts.metric || 'prevalence';
    const types = window.NV_DATA.dementiaTypes;

    // Sort by prevalence so the biggest cells anchor visually
    const sorted = [...types].sort((a,b) => b.prevalencePct - a.prevalencePct);

    // Group into "AD spectrum", "Synuclein/Lewy", "Vascular & Mixed", "Other"
    const groups = {
      'AD Spectrum':            sorted.filter(t => ['AD','PCA'].includes(t.id)),
      'Synucleinopathies':      sorted.filter(t => ['DLB','PDD'].includes(t.id)),
      'Vascular & Mixed':       sorted.filter(t => ['VAD','MIX'].includes(t.id)),
      'FTD Spectrum':           sorted.filter(t => ['FTD','PPA'].includes(t.id)),
      'Other Dementias':        sorted.filter(t => ['CJD','NPH','HD','WK'].includes(t.id))
    };

    // Build groups grid: AD spectrum gets 2 cols, others vary
    const groupSizes = {
      'AD Spectrum':       { cols: 2, weight: 5 },
      'Synucleinopathies': { cols: 2, weight: 2 },
      'Vascular & Mixed':  { cols: 2, weight: 3 },
      'FTD Spectrum':      { cols: 2, weight: 2 },
      'Other Dementias':   { cols: 2, weight: 2 }
    };

    const totalWeight = Object.values(groupSizes).reduce((s,g) => s + g.weight, 0);

    let html = `<div class="heatmap" style="grid-template-columns: ${
      Object.values(groupSizes).map(g => `${(g.weight/totalWeight*100).toFixed(2)}fr`).join(' ')
    }">`;

    Object.entries(groups).forEach(([groupName, items]) => {
      const cols = groupSizes[groupName].cols;
      html += `<div class="heatmap-group" data-label="${groupName}" style="grid-template-columns: repeat(${cols}, 1fr);">`;

      items.forEach(t => {
        const sev = this.severityClass(t, metric);
        const valueText = this.metricValue(t, metric);
        const span = this.cellSpan(t, items);
        html += `
          <div class="heatmap-cell ${sev} ${span < 1.5 ? 'sm' : ''}"
               data-type="${t.id}"
               style="grid-column: span ${span > 1 ? 2 : 1};"
               title="${t.name} • ${valueText}">
            <div class="cell-name">${t.code}</div>
            <div class="cell-value">${valueText}</div>
          </div>
        `;
      });
      html += '</div>';
    });

    html += '</div>';
    target.innerHTML = html;
  },

  severityClass(type, metric) {
    if (metric === 'severity') {
      return `sev-${type.stage}`;
    } else if (metric === 'prevalence') {
      // map prevalence percentage to sev classes
      if (type.prevalencePct >= 50) return 'sev-5';
      if (type.prevalencePct >= 10) return 'sev-4';
      if (type.prevalencePct >= 5)  return 'sev-3';
      if (type.prevalencePct >= 2)  return 'sev-2';
      if (type.prevalencePct >= 1)  return 'sev-1';
      return 'sev-0';
    } else if (metric === 'trials') {
      // pseudo: AD highest, etc.
      const trialIntensity = { AD: 5, MIX: 4, DLB: 3, FTD: 3, VAD: 3, PDD: 3, PCA: 2, PPA: 2, NPH: 1, HD: 2, CJD: 1, WK: 0 };
      return `sev-${trialIntensity[type.id] || 0}`;
    }
    return 'sev-2';
  },

  metricValue(type, metric) {
    if (metric === 'prevalence') return `${type.prevalencePct}%`;
    if (metric === 'severity')   return `Stage ${type.stage}/5`;
    if (metric === 'trials') {
      const counts = { AD: '847', MIX: '142', DLB: '94', FTD: '76', VAD: '68', PDD: '54', PCA: '21', PPA: '38', NPH: '12', HD: '63', CJD: '8', WK: '4' };
      return `${counts[type.id] || '—'} trials`;
    }
    return '';
  },

  cellSpan(type, items) {
    // bigger types take 2 cols if first-in-group
    if (items[0].id === type.id && type.prevalencePct >= 5) return 2;
    return 1;
  }
};

if (typeof window !== 'undefined') window.NV_HEATMAP = NV_HEATMAP;
