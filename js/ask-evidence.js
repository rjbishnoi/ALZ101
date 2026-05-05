/* ============================================
   NeuroViz — Ask the Evidence (in-page assistant)
   ============================================
   Answers common dementia questions using a curated, citation-backed
   knowledge base. Runs entirely client-side. No API calls, no PHI risk.

   Behavior:
   - User types a question. We tokenize and score it against the keyword
     index in NV_EVIDENCE.
   - We return the best-matching answer, paraphrased with citations.
   - For questions we don't know, we say so honestly and offer a deep
     link to OpenEvidence.com (free for verified U.S. clinicians) and
     to MedlinePlus and the Alzheimer's Association helpline for
     non-clinicians.
   ============================================ */

const NV_ASK = {

  suggestions: {
    phys: [
      'When should I order plasma p-tau217 vs CSF biomarkers in suspected AD?',
      'What are absolute contraindications to lecanemab? How do I monitor for ARIA?',
      'First-line management of agitation in dementia after non-pharm fails?',
      'How to differentiate DLB from Parkinson disease dementia?',
      'Diagnostic workup for rapidly progressive dementia in a 60-year-old?'
    ],
    pat: [
      'What does my MoCA score mean and what should I do next?',
      'Is lecanemab right for me if I have a positive amyloid PET scan?',
      'What lifestyle changes have the best evidence to slow Alzheimer\'s?',
      'Should I get APOE ε4 genetic testing? What are the pros and cons?',
      'How is mild cognitive impairment different from dementia?'
    ],
    care: [
      'How do I manage sundowning in moderate Alzheimer\'s without medications?',
      'When is it time to consider memory care for my parent with dementia?',
      'What support resources help with caregiver burnout?',
      'How do I talk to a person with dementia about driving?',
      'Best non-drug strategies for repetitive questions and agitation?'
    ]
  },

  mount(target, opts = {}) {
    if (!target) return;
    const audience = opts.audience || document.body.dataset.audience || 'phys';

    target.innerHTML = `
      <h3>Ask the Evidence</h3>
      <div class="ask-sub">
        Type a question about dementia. We answer with paraphrased,
        citation-backed information drawn from peer-reviewed sources
        — entirely in-page, no redirect.
      </div>

      <textarea id="askInput" rows="3"
        placeholder="e.g. How does plasma p-tau217 compare to amyloid PET for diagnosing early Alzheimer's disease?">${opts.defaultQuery || ''}</textarea>

      <div class="ask-actions">
        <span class="muted" style="font-size:11px;" id="askCharCount">0 characters</span>
        <button type="button" class="ask-btn" id="askSubmit" disabled>
          Get answer <span class="arrow">→</span>
        </button>
      </div>

      <div class="ask-suggestions" id="askSuggestions"></div>

      <div class="ask-answer-zone" id="askAnswerZone" hidden></div>

      <div class="ask-disclaimer" id="askDisclaimer"></div>
    `;

    this._renderSuggestions(target, audience);
    this._wire(target, audience);
    this._renderDisclaimer(target, audience);

    window.addEventListener('nv-audience-change', e => {
      const a = e.detail || 'phys';
      this._renderSuggestions(target, a);
      this._renderDisclaimer(target, a);
    });
  },

  _renderSuggestions(root, audience) {
    const list = this.suggestions[audience] || this.suggestions.phys;
    const wrap = root.querySelector('#askSuggestions');
    if (!wrap) return;
    wrap.innerHTML = `
      <div class="ask-sugg-label">Try one of these:</div>
      <div class="ask-sugg-list">
        ${list.map(q =>
          `<button type="button" class="ask-suggestion" data-q="${q.replace(/"/g, '&quot;')}">${q}</button>`
        ).join('')}
      </div>
    `;
    wrap.querySelectorAll('.ask-suggestion').forEach(b => {
      b.addEventListener('click', () => {
        const ta = root.querySelector('#askInput');
        ta.value = b.dataset.q;
        ta.dispatchEvent(new Event('input'));
        root.querySelector('#askSubmit').click();
      });
    });
  },

  _renderDisclaimer(root, audience) {
    const el = root.querySelector('#askDisclaimer');
    if (!el) return;
    if (audience === 'phys') {
      el.innerHTML = '⚠ Educational reference only. Curated from peer-reviewed sources; verify with your local guidelines and patient context. Not a substitute for clinical judgment.';
    } else {
      el.innerHTML = '⚠ Educational reference only. None of this replaces medical advice from your clinician. For urgent help: <a href="https://www.alz.org/help-support/resources/helpline" target="_blank" rel="noopener">Alzheimer\'s Association 24/7 helpline (1-800-272-3900)</a>. For more medical reference: <a href="https://medlineplus.gov" target="_blank" rel="noopener">MedlinePlus</a>.';
    }
  },

  _wire(root, audience) {
    const ta  = root.querySelector('#askInput');
    const btn = root.querySelector('#askSubmit');
    const cc  = root.querySelector('#askCharCount');
    const zone = root.querySelector('#askAnswerZone');

    const update = () => {
      const q = ta.value.trim();
      cc.textContent = q.length + ' character' + (q.length === 1 ? '' : 's');
      btn.disabled = !q;
    };
    ta.addEventListener('input', update);
    update();

    const submit = () => {
      const q = ta.value.trim();
      if (!q) return;
      this._answer(zone, q, audience);
    };

    btn.addEventListener('click', submit);
    ta.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit();
    });
  },

  _search(query) {
    if (!window.NV_EVIDENCE) return [];
    const q = query.toLowerCase();
    const tokens = q.split(/[^a-zA-Z0-9-]+/).filter(t => t.length > 2);
    const scored = window.NV_EVIDENCE.map(entry => {
      let score = 0;
      for (const kw of entry.keywords) {
        if (q.includes(kw)) score += 5;
      }
      const qLower = entry.question.toLowerCase();
      for (const t of tokens) {
        if (qLower.includes(t)) score += 1;
        for (const kw of entry.keywords) {
          if (kw.includes(t) || t.includes(kw)) score += 1;
        }
      }
      return { entry, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.filter(s => s.score >= 3);
  },

  _answer(zone, query, audience) {
    if (!zone) return;
    zone.hidden = false;

    const matches = this._search(query);

    if (matches.length === 0) {
      const fallbackUrl = 'https://www.openevidence.com/search?q=' + encodeURIComponent(query);
      zone.innerHTML = `
        <div class="answer-card answer-fallback">
          <div class="answer-head">
            <span class="answer-tag">No curated answer</span>
          </div>
          <div class="answer-body">
            <p>We don't have a curated, citation-backed answer to that
            specific question in our knowledge base. We won't make one up.</p>
            <p>What we'd suggest:</p>
            <ul>
              <li>Try one of the suggested questions above — they're the topics we have direct evidence for.</li>
              <li>For a clinician-grade evidence answer:
                  <a href="${fallbackUrl}" target="_blank" rel="noopener">
                    search OpenEvidence.com</a>
                  (free for verified U.S. healthcare professionals;
                  Mayo Clinic Platform partner).</li>
              ${audience !== 'phys' ? `
              <li>For patient and family information:
                  <a href="https://medlineplus.gov/dementia.html" target="_blank" rel="noopener">MedlinePlus dementia overview</a>
                  or call the
                  <a href="https://www.alz.org/help-support/resources/helpline" target="_blank" rel="noopener">Alzheimer's Association 24/7 helpline (1-800-272-3900)</a>.</li>
              ` : ''}
            </ul>
          </div>
        </div>
      `;
      zone.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    const best = matches[0].entry;
    const others = matches.slice(1, 3);

    const citationsHtml = best.citations.map(c =>
      `<li><a href="${c.url}" target="_blank" rel="noopener">${c.source}</a> <span class="ext-mini">↗</span></li>`
    ).join('');

    const relatedHtml = others.length ? `
      <div class="answer-related">
        <div class="answer-related-label">Related questions in our knowledge base</div>
        <ul>
          ${others.map(o =>
            `<li><button type="button" class="answer-related-q" data-q="${o.entry.question.replace(/"/g, '&quot;')}">${o.entry.question}</button></li>`
          ).join('')}
        </ul>
      </div>
    ` : '';

    zone.innerHTML = `
      <div class="answer-card">
        <div class="answer-head">
          <span class="answer-tag">Evidence-based answer</span>
          <span class="answer-conf">match score ${matches[0].score}</span>
        </div>
        <div class="answer-q"><b>Q:</b> ${best.question}</div>
        <div class="answer-body">${this._formatAnswer(best.answer)}</div>
        <div class="answer-cites">
          <div class="answer-cites-label">Sources</div>
          <ul>${citationsHtml}</ul>
        </div>
        ${relatedHtml}
      </div>
    `;

    zone.querySelectorAll('.answer-related-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const root = zone.closest('.ask-evidence') || zone.parentElement;
        const ta = root.querySelector('#askInput');
        if (ta) {
          ta.value = btn.dataset.q;
          ta.dispatchEvent(new Event('input'));
          root.querySelector('#askSubmit').click();
        }
      });
    });

    zone.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  _formatAnswer(text) {
    return text.split(/\n\n+/).map(p => `<p>${p}</p>`).join('');
  }
};

if (typeof window !== 'undefined') window.NV_ASK = NV_ASK;
