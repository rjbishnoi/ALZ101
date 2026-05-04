/* ============================================
   NeuroViz — Sortable tables (Finviz-style)
   Auto-attaches to any .data-table on the page.
   - Click column header to sort asc/desc, alternating
   - Numeric detection from data-sort-type or content
   - Persistent indicator arrows
   - Works with rows added/replaced after init via observer
   ============================================ */

const NV_SORT = {

  init(scope = document) {
    const tables = scope.querySelectorAll('table.data-table');
    tables.forEach(t => this.attachTable(t));
  },

  attachTable(table) {
    if (table.dataset.sortAttached) return;
    table.dataset.sortAttached = '1';

    const ths = table.querySelectorAll('thead th');
    ths.forEach((th, idx) => {
      // Skip header if explicitly marked unsortable
      if (th.dataset.sort === 'off') return;
      th.classList.add('sortable');

      // Add arrow indicator if not present
      if (!th.querySelector('.sort-arrow')) {
        const a = document.createElement('span');
        a.className = 'sort-arrow';
        a.textContent = '↕';
        th.appendChild(a);
      }

      th.addEventListener('click', () => {
        const cur = th.dataset.sortDir;
        const dir = cur === 'asc' ? 'desc' : 'asc';
        // Reset siblings
        ths.forEach(s => {
          s.dataset.sortDir = '';
          const ar = s.querySelector('.sort-arrow');
          if (ar) ar.textContent = '↕';
          s.classList.remove('is-sorted');
        });
        th.dataset.sortDir = dir;
        th.classList.add('is-sorted');
        const ar = th.querySelector('.sort-arrow');
        if (ar) ar.textContent = dir === 'asc' ? '▲' : '▼';
        this.sortBy(table, idx, dir, th.dataset.sortType);
      });
    });
  },

  sortBy(table, colIdx, dir, type) {
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const sign = dir === 'asc' ? 1 : -1;

    const extract = (row) => {
      const cell = row.children[colIdx];
      if (!cell) return '';
      // explicit override
      if (cell.dataset.sortValue !== undefined) return cell.dataset.sortValue;
      return cell.textContent.trim();
    };

    const isNumeric = (s) => /^-?[\d,]+\.?\d*[%$kKmMbB]?$/.test(s.replace(/[$,\s]/g, ''));
    const parseNum = (s) => {
      const cleaned = s.replace(/[$,\s%]/g, '');
      let mult = 1;
      if (/k$/i.test(cleaned)) mult = 1e3;
      else if (/m$/i.test(cleaned)) mult = 1e6;
      else if (/b$/i.test(cleaned)) mult = 1e9;
      return parseFloat(cleaned) * mult;
    };

    rows.sort((a, b) => {
      const va = extract(a);
      const vb = extract(b);
      const t = type || (isNumeric(va) && isNumeric(vb) ? 'num' : 'str');
      if (t === 'num') return (parseNum(va) - parseNum(vb)) * sign;
      return va.localeCompare(vb) * sign;
    });
    rows.forEach(r => tbody.appendChild(r));
  },

  // Re-attach after rows are dynamically replaced
  refresh(scope = document) {
    scope.querySelectorAll('table.data-table').forEach(t => {
      delete t.dataset.sortAttached;
      this.attachTable(t);
    });
  }
};

if (typeof window !== 'undefined') {
  window.NV_SORT = NV_SORT;
  // Auto-init on DOM ready, and re-init periodically for dynamic content
  document.addEventListener('DOMContentLoaded', () => NV_SORT.init());
  // Mutation observer for dynamically added tables
  const mo = new MutationObserver(() => NV_SORT.init());
  document.addEventListener('DOMContentLoaded', () => {
    mo.observe(document.body, { childList: true, subtree: true });
  });
}
