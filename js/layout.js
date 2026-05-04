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
            <input type="text" placeholder="Search trials, drugs, biomarkers..." aria-label="Search" />
            <button>GO</button>
          </div>
          <nav class="user-rail">
            <a href="#">Sign In</a>
            <a href="#">Watchlist</a>
            <a href="#">Help</a>
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
    document.body.insertAdjacentHTML('beforeend', this.renderFooter());
    this.attachAudienceToggle();
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
