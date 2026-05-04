/* ============================================
   NeuroViz — Shared Layout Components
   Masthead, ticker, primary nav, footer
   ============================================ */

const NV_LAYOUT = {

  renderTicker() {
    if (!window.NV_DATA) return '';
    const items = window.NV_DATA.ticker;
    const itemHtml = items.map(t => `
      <span class="ticker-item">
        <span class="label">${t.label}</span>
        <span class="value">${t.value}</span>
        <span class="delta-${t.dir}">${t.dir === 'up' ? '▲' : '▼'} ${t.delta}</span>
      </span>
    `).join('');
    // Duplicate for seamless scroll loop
    return `<div class="ticker"><div class="ticker-track">${itemHtml}${itemHtml}</div></div>`;
  },

  renderMasthead() {
    return `
      <header class="masthead">
        <div class="masthead-row">
          <a class="brand" href="index.html">
            <span class="brand-mark">Neuro<span class="accent">Viz</span></span>
            <span class="brand-tag">Cognitive Health Terminal</span>
          </a>
          <div class="search-box">
            <div class="search-input-wrap">
              <input id="nvSearch" type="text" placeholder="Search drugs, biomarkers, trials, types — press / to focus" aria-label="Search" autocomplete="off" />
              <div id="nvSearchResults" class="search-results" role="listbox"></div>
            </div>
            <button id="nvSearchBtn">GO</button>
          </div>
          <nav class="user-rail">
            <a href="#" id="nvHelpBtn" title="Keyboard shortcuts">? Help</a>
            <a href="news.html">News</a>
            <a href="caregivers.html">Caregivers</a>
          </nav>
        </div>
      </header>
    `;
  },

  renderPrimaryNav(active) {
    const items = [
      { href: 'index.html',       key: 'home',       label: 'Dashboard' },
      { href: 'maps.html',        key: 'maps',       label: 'Maps' },
      { href: 'groups.html',      key: 'groups',     label: 'Groups' },
      { href: 'screener.html',    key: 'screener',   label: 'Screener' },
      { href: 'diagnosis.html',   key: 'diagnosis',  label: 'Diagnostics' },
      { href: 'treatments.html',  key: 'treatments', label: 'Treatments' },
      { href: 'trials.html',      key: 'trials',     label: 'Clinical Trials' },
      { href: 'caregivers.html',  key: 'caregivers', label: 'Caregivers' },
      { href: 'community.html',   key: 'community',  label: 'Community Care' },
      { href: 'news.html',        key: 'news',       label: 'News' }
    ];
    const links = items.map(i =>
      `<a href="${i.href}" class="${i.key === active ? 'is-active' : ''}">${i.label}</a>`
    ).join('');
    return `
      <nav class="primary-nav">
        <div class="primary-nav-inner">
          ${links}
          <div class="audience-toggle" role="group" aria-label="View as">
            <button data-aud="phys" class="is-active">Physician</button>
            <button data-aud="pat">Patient</button>
            <button data-aud="care">Caregiver</button>
          </div>
        </div>
      </nav>
    `;
  },

  renderFooter() {
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div>
            <h4>NeuroViz</h4>
            <p style="line-height:1.6;color:var(--ink-faint)">
              An open data-visualization platform for neurocognitive disorders.
              Built for clinicians, patients, and caregivers — modeled after
              financial terminal interfaces, applied to brain health.
            </p>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              <li><a href="groups.html">Dementia Types</a></li>
              <li><a href="screener.html">Screening Tools</a></li>
              <li><a href="diagnosis.html">Diagnostics</a></li>
              <li><a href="treatments.html">Treatments</a></li>
              <li><a href="trials.html">Clinical Trials</a></li>
            </ul>
          </div>
          <div>
            <h4>Audiences</h4>
            <ul>
              <li><a href="#">For Physicians</a></li>
              <li><a href="#">For Patients</a></li>
              <li><a href="caregivers.html">For Caregivers</a></li>
              <li><a href="community.html">Community Services</a></li>
            </ul>
          </div>
          <div>
            <h4>Sources</h4>
            <ul>
              <li><a href="https://www.alz.org">Alzheimer's Association</a></li>
              <li><a href="https://clinicaltrials.gov">ClinicalTrials.gov</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov">PubMed</a></li>
              <li><a href="https://www.nia.nih.gov">NIA</a></li>
              <li><a href="https://www.lewybodyassociation.org">LBDA</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-disclaimer">
          ⚠ Educational reference only. Not a substitute for medical advice. Diagnostic and treatment decisions require qualified clinical evaluation.
          Data compiled from public sources including NIA-AA, Lancet Commission (2024), Cochrane Reviews, FDA, CMS, and clinical trial registries. Last updated: ${new Date().toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'})}.
        </div>
      </footer>
    `;
  },

  // Mount everything for a given page
  mount(active) {
    document.body.insertAdjacentHTML('afterbegin',
      this.renderTicker() +
      this.renderMasthead() +
      this.renderPrimaryNav(active)
    );
    document.body.insertAdjacentHTML('beforeend', this.renderFooter() + this.renderHelpOverlay());
    this.attachAudienceToggle();
    this.attachSearch();
    this.attachKeyboard();
  },

  renderHelpOverlay() {
    return `
      <div id="nvKbdOverlay" class="kbd-overlay" role="dialog" aria-modal="true">
        <div class="kbd-card">
          <h3>Keyboard shortcuts</h3>
          <div class="kbd-row"><div><kbd>/</kbd></div><div>Focus search</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>h</kbd></div><div>Go to dashboard</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>m</kbd></div><div>Go to maps</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>g</kbd></div><div>Go to groups</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>s</kbd></div><div>Go to screener</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>d</kbd></div><div>Go to diagnostics</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>t</kbd></div><div>Go to treatments</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>c</kbd></div><div>Go to clinical trials</div></div>
          <div class="kbd-row"><div><kbd>g</kbd> <kbd>n</kbd></div><div>Go to news</div></div>
          <div class="kbd-row"><div><kbd>?</kbd></div><div>Toggle this help</div></div>
          <div class="kbd-row"><div><kbd>Esc</kbd></div><div>Close / clear search</div></div>
          <div class="muted" style="font-size:11px; margin-top:14px; text-align:center;">Click outside or press Esc to close</div>
        </div>
      </div>
    `;
  },

  attachSearch() {
    const input = document.getElementById('nvSearch');
    const dropdown = document.getElementById('nvSearchResults');
    const btn = document.getElementById('nvSearchBtn');
    if (!input || !dropdown || !window.NV_DATA) return;

    // Build search index from all data
    const idx = [];
    NV_DATA.dementiaTypes.forEach(d => idx.push({ tag: 'TYPE', title: d.name, sub: d.code, url: 'groups.html#' + d.id }));
    NV_DATA.screeningTools.forEach(s => idx.push({ tag: 'SCREEN', title: s.name, sub: s.code, url: 'screener.html#screens' }));
    NV_DATA.diagnostics.forEach(d => idx.push({ tag: 'DX', title: d.name, sub: d.tier, url: 'diagnosis.html#methods' }));
    NV_DATA.treatmentsPharm.forEach(t => idx.push({ tag: 'DRUG', title: t.name, sub: t.class, url: 'treatments.html#pharm' }));
    NV_DATA.treatmentsNonPharm.forEach(t => idx.push({ tag: 'CARE', title: t.name, sub: t.category, url: 'treatments.html#nonpharm' }));
    NV_DATA.trials.forEach(t => idx.push({ tag: 'TRIAL', title: t.title, sub: t.sponsor + ' · ' + t.nct, url: 'trials.html' }));
    NV_DATA.caregiverResources.forEach(r => idx.push({ tag: 'RESC', title: r.name, sub: r.type, url: 'caregivers.html#resources' }));
    NV_DATA.communityServices.forEach(c => idx.push({ tag: 'CARE', title: c.type, sub: c.costRange, url: 'community.html#services' }));
    NV_DATA.news.forEach(n => idx.push({ tag: 'NEWS', title: n.title, sub: n.source, url: 'news.html' }));

    const renderResults = (q) => {
      if (!q || q.length < 2) { dropdown.classList.remove('is-open'); return; }
      const ql = q.toLowerCase();
      const hits = idx
        .map(it => {
          const inT = it.title.toLowerCase().includes(ql);
          const inS = (it.sub || '').toLowerCase().includes(ql);
          if (!inT && !inS) return null;
          // small ranking: title match wins
          return { ...it, score: inT ? 2 : 1 };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);

      if (!hits.length) {
        dropdown.innerHTML = `<div class="search-result" style="cursor:default;"><div class="sr-tag">—</div><div class="sr-title">No matches for "${q}"</div><div class="sr-source"></div></div>`;
      } else {
        dropdown.innerHTML = hits.map(h => `
          <a class="search-result" href="${h.url}">
            <div class="sr-tag">${h.tag}</div>
            <div><div class="sr-title">${h.title}</div><div class="muted" style="font-size:10px;">${h.sub || ''}</div></div>
            <div class="sr-source">↗</div>
          </a>
        `).join('');
      }
      dropdown.classList.add('is-open');
    };

    input.addEventListener('input', e => renderResults(e.target.value));
    input.addEventListener('focus', e => { if (e.target.value) renderResults(e.target.value); });
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target) && e.target !== input) dropdown.classList.remove('is-open');
    });
    if (btn) btn.addEventListener('click', () => {
      const first = dropdown.querySelector('a.search-result');
      if (first) window.location.href = first.getAttribute('href');
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const first = dropdown.querySelector('a.search-result');
        if (first) window.location.href = first.getAttribute('href');
      } else if (e.key === 'Escape') {
        input.value = '';
        dropdown.classList.remove('is-open');
        input.blur();
      }
    });
  },

  attachKeyboard() {
    let pendingG = false;
    let pendingTimer = null;
    const input = document.getElementById('nvSearch');
    const overlay = document.getElementById('nvKbdOverlay');
    const helpBtn = document.getElementById('nvHelpBtn');

    const goto = (key) => {
      const map = {
        h: 'index.html', m: 'maps.html', g: 'groups.html', s: 'screener.html',
        d: 'diagnosis.html', t: 'treatments.html', c: 'trials.html',
        a: 'caregivers.html', y: 'community.html', n: 'news.html'
      };
      if (map[key]) window.location.href = map[key];
    };

    document.addEventListener('keydown', e => {
      // ignore when typing in inputs
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) {
        if (e.key === 'Escape' && e.target === input) input.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === '/') {
        e.preventDefault();
        if (input) input.focus();
        return;
      }
      if (e.key === '?') {
        e.preventDefault();
        overlay.classList.toggle('is-open');
        return;
      }
      if (e.key === 'Escape') {
        overlay.classList.remove('is-open');
        return;
      }
      if (e.key === 'g') {
        pendingG = true;
        clearTimeout(pendingTimer);
        pendingTimer = setTimeout(() => { pendingG = false; }, 1200);
        return;
      }
      if (pendingG) {
        pendingG = false;
        clearTimeout(pendingTimer);
        goto(e.key.toLowerCase());
      }
    });

    if (helpBtn) helpBtn.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.toggle('is-open');
    });
    if (overlay) overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
  },

  attachAudienceToggle() {
    const buttons = document.querySelectorAll('.audience-toggle button');
    const saved = localStorage.getItem('nv-audience') || 'phys';
    buttons.forEach(b => {
      b.classList.toggle('is-active', b.dataset.aud === saved);
      b.addEventListener('click', () => {
        buttons.forEach(x => x.classList.remove('is-active'));
        b.classList.add('is-active');
        localStorage.setItem('nv-audience', b.dataset.aud);
        document.body.dataset.audience = b.dataset.aud;
        // dispatch event for pages that respond to audience changes
        window.dispatchEvent(new CustomEvent('nv-audience-change', { detail: b.dataset.aud }));
      });
    });
    document.body.dataset.audience = saved;
  }
};

if (typeof window !== 'undefined') window.NV_LAYOUT = NV_LAYOUT;
