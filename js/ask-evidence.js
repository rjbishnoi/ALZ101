/* ============================================
   NeuroViz — Ask the Evidence (OpenEvidence integration)

   OpenEvidence (https://www.openevidence.com) is a free, peer-reviewed
   medical-AI Q&A service for verified U.S. healthcare professionals,
   developed with Mayo Clinic Platform Accelerate. We deep-link to it.

   For physicians: questions go straight to OpenEvidence, which returns
   evidence-based answers with linked citations.
   For patients & caregivers: we suggest using PubMed Health and Mayo
   Clinic alongside OpenEvidence (which requires HCP verification).

   This module is purely educational — it sends ONLY the user's typed
   query to a search URL; nothing is stored, posted, or transmitted
   anywhere else.
   ============================================ */

const NV_ASK = {

  /** Suggested questions, organized by audience and topic. */
  suggestions: {
    phys: [
      'When should I order plasma p-tau217 vs CSF biomarkers in suspected AD?',
      'What are absolute contraindications to lecanemab? How do I monitor for ARIA?',
      'First-line pharmacologic management of agitation in dementia after non-pharm fails?',
      'How to differentiate DLB from Parkinson disease dementia clinically?',
      'Diagnostic workup for rapidly progressive dementia in 60-year-old?'
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

  /**
   * Mount the panel into a target element.
   * @param {HTMLElement} target
   * @param {Object} opts { defaultQuery?: string, audience?: 'phys'|'pat'|'care' }
   */
  mount(target, opts = {}) {
    if (!target) return;
    const audience = opts.audience || document.body.dataset.audience || 'phys';

    target.innerHTML = `
      <h3>Ask the Evidence</h3>
      <div class="ask-sub">
        Type a clinical question and we will hand it to <a href="https://www.openevidence.com" target="_blank" rel="noopener">OpenEvidence</a> —
        a Mayo Clinic-affiliated medical-AI service used by 40%+ of U.S. physicians.
        It returns peer-reviewed, citation-linked answers in seconds.
      </div>

      <textarea id="askInput" rows="3" placeholder="e.g. How does plasma p-tau217 compare to amyloid PET for diagnosing early Alzheimer's disease?">${opts.defaultQuery || ''}</textarea>

      <div class="ask-actions">
        <span class="muted" style="font-size:11px;" id="askCharCount">0 characters</span>
        <a href="#" class="ask-btn" id="askSubmit" target="_blank" rel="noopener">
          Ask OpenEvidence <span class="arrow">→</span>
        </a>
      </div>

      <div class="ask-suggestions" id="askSuggestions"></div>

      <div class="ask-disclaimer" id="askDisclaimer"></div>
    `;

    this._renderSuggestions(target, audience);
    this._wire(target, audience);
    this._renderDisclaimer(target, audience);

    // Update suggestions and disclaimer when audience changes
    window.addEventListener('nv-audience-change', e => {
      const a = e.detail || 'phys';
      this._renderSuggestions(target, a);
      this._renderDisclaimer(target, a);
    });
  },

  _renderSuggestions(root, audience) {
    const list = this.suggestions[audience] || this.suggestions.phys;
    const wrap = root.querySelector('#askSuggestions');
    wrap.innerHTML = list.map(q =>
      `<button type="button" class="ask-suggestion" data-q="${q.replace(/"/g, '&quot;')}">${q}</button>`
    ).join('');
    wrap.querySelectorAll('.ask-suggestion').forEach(b => {
      b.addEventListener('click', () => {
        const ta = root.querySelector('#askInput');
        ta.value = b.dataset.q;
        ta.focus();
        ta.dispatchEvent(new Event('input'));
      });
    });
  },

  _renderDisclaimer(root, audience) {
    const el = root.querySelector('#askDisclaimer');
    if (audience === 'phys') {
      el.innerHTML = '⚠ OpenEvidence is intended for verified U.S. healthcare professionals. Free sign-up at openevidence.com.';
    } else {
      el.innerHTML = '⚠ OpenEvidence is designed for clinicians. As a patient or caregiver, you may also want to try <a href="https://medlineplus.gov" target="_blank" rel="noopener">MedlinePlus</a> or the <a href="https://www.alz.org/alzheimers-dementia/24-7-helpline" target="_blank" rel="noopener">Alzheimer\'s Association 24/7 helpline (1-800-272-3900)</a>. None of this replaces medical advice from your clinician.';
    }
  },

  _wire(root, audience) {
    const ta  = root.querySelector('#askInput');
    const btn = root.querySelector('#askSubmit');
    const cc  = root.querySelector('#askCharCount');

    const update = () => {
      const q = ta.value.trim();
      cc.textContent = q.length + ' character' + (q.length === 1 ? '' : 's');
      if (!q) {
        btn.setAttribute('disabled', '');
        btn.removeAttribute('href');
      } else {
        btn.removeAttribute('disabled');
        // OpenEvidence search-by-query deep link
        btn.href = 'https://www.openevidence.com/search?q=' + encodeURIComponent(q);
      }
    };
    ta.addEventListener('input', update);
    update();

    // Cmd/Ctrl+Enter submits
    ta.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (!btn.hasAttribute('disabled')) btn.click();
      }
    });
  }
};

if (typeof window !== 'undefined') window.NV_ASK = NV_ASK;
