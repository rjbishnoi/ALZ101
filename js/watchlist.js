/* ============================================
   NeuroViz — Saved items (★ pin)
   localStorage-backed pin/star feature for any item type.
   Items are { tag, id, name, url } stored under 'nv-watchlist'.
   (Internal storage key kept for backward compatibility.)
   ============================================ */

const NV_WL = {
  KEY: 'nv-watchlist',

  read() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  write(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('nv-watchlist-change', { detail: items }));
  },

  has(tag, id) {
    return this.read().some(i => i.tag === tag && i.id === id);
  },

  toggle(item) {
    const items = this.read();
    const idx = items.findIndex(i => i.tag === item.tag && i.id === item.id);
    if (idx >= 0) items.splice(idx, 1);
    else items.unshift(item);
    this.write(items.slice(0, 30));   // cap at 30 items
    return this.has(item.tag, item.id);
  },

  remove(tag, id) {
    const items = this.read().filter(i => !(i.tag === tag && i.id === id));
    this.write(items);
  },

  clear() { this.write([]); },

  /**
   * Insert a pin button before any element. Call after rendering.
   * @param {Element} container - element where pins should be attached (uses [data-pin-tag][data-pin-id][data-pin-name][data-pin-url])
   */
  attachAll(container = document) {
    container.querySelectorAll('[data-pin-id]').forEach(el => {
      if (el.dataset.pinAttached) return;
      el.dataset.pinAttached = '1';
      const tag = el.dataset.pinTag || 'ITEM';
      const id  = el.dataset.pinId;
      const name = el.dataset.pinName || el.textContent.trim().slice(0, 80);
      const url = el.dataset.pinUrl || '';

      const btn = document.createElement('button');
      btn.className = 'pin-star';
      btn.title = 'Save this item';
      btn.setAttribute('aria-label', 'Save to my pinned items');
      if (this.has(tag, id)) btn.classList.add('is-pinned');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        const nowPinned = this.toggle({ tag, id, name, url });
        btn.classList.toggle('is-pinned', nowPinned);
      });
      el.insertBefore(btn, el.firstChild);
    });
  },

  /**
   * Render the saved-items list into a container. Pass an empty-state HTML string for empty.
   */
  renderInto(target, emptyHtml) {
    const items = this.read();
    if (!items.length) {
      target.innerHTML = emptyHtml || `
        <div class="watchlist-empty">
          <div style="font-size:18px; color:var(--ink-faint); margin-bottom:6px;">☆</div>
          <div>You haven't saved any items yet.</div>
          <div class="mono" style="font-size:10px; margin-top:6px;">Click ☆ next to any drug, trial, or biomarker to save it here.</div>
        </div>`;
      return;
    }
    target.innerHTML = items.map(i => `
      <div class="watchlist-row">
        <span class="wl-tag">${i.tag}</span>
        <a class="wl-name" href="${i.url || '#'}" title="${i.name}">${i.name}</a>
        <button class="wl-rm" data-tag="${i.tag}" data-id="${i.id}" title="Remove">×</button>
      </div>
    `).join('');
    target.querySelectorAll('.wl-rm').forEach(b => {
      b.addEventListener('click', e => {
        this.remove(b.dataset.tag, b.dataset.id);
        this.renderInto(target, emptyHtml);
      });
    });
  }
};

if (typeof window !== 'undefined') {
  window.NV_WL = NV_WL;
  document.addEventListener('DOMContentLoaded', () => NV_WL.attachAll());
  // Re-attach when content changes
  const mo = new MutationObserver(() => NV_WL.attachAll());
  document.addEventListener('DOMContentLoaded', () => {
    mo.observe(document.body, { childList: true, subtree: true });
  });
}
