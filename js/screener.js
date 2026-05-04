/* ============================================
   NeuroViz — Interactive Screener
   Demonstration screening tool combining risk
   factors and brief cognitive items. Educational only.
   ============================================ */

const NV_SCREENER = {

  questions: [
    { id: 'age', text: 'Age range', opts: [
      {label:'<60', val:0}, {label:'60–69', val:1}, {label:'70–79', val:2}, {label:'80+', val:3}
    ]},
    { id: 'famHx', text: 'First-degree family history of dementia?', opts: [
      {label:'No', val:0}, {label:'One relative', val:1}, {label:'Multiple', val:2}
    ]},
    { id: 'memory', text: 'Subjective memory concern (self or informant)?', opts: [
      {label:'None', val:0}, {label:'Mild', val:1}, {label:'Moderate', val:2}, {label:'Significant', val:3}
    ]},
    { id: 'function', text: 'Difficulty with daily activities (managing finances, medications, navigation)?', opts: [
      {label:'None', val:0}, {label:'Slight', val:1}, {label:'Some help needed', val:2}, {label:'Considerable help', val:3}
    ]},
    { id: 'mood', text: 'Persistent sadness, apathy, or loss of interest?', opts: [
      {label:'No', val:0}, {label:'Sometimes', val:1}, {label:'Often', val:2}
    ]},
    { id: 'sleep', text: 'Sleep issues (acting out dreams, insomnia, fragmented sleep)?', opts: [
      {label:'None', val:0}, {label:'Occasional', val:1}, {label:'Frequent', val:2}
    ]},
    { id: 'cardio', text: 'Cardiovascular risk factors (HTN, diabetes, high cholesterol, smoking)?', opts: [
      {label:'None', val:0}, {label:'1–2', val:1}, {label:'3+', val:2}
    ]},
    { id: 'hearing', text: 'Hearing loss (untreated)?', opts: [
      {label:'No / corrected', val:0}, {label:'Mild', val:1}, {label:'Moderate–severe', val:2}
    ]},
    { id: 'social', text: 'Social engagement / activity?', opts: [
      {label:'High', val:0}, {label:'Moderate', val:1}, {label:'Limited', val:2}, {label:'Isolated', val:3}
    ]},
    { id: 'parkinsons', text: 'Tremor, slowness, or rigidity?', opts: [
      {label:'No', val:0}, {label:'Mild / one side', val:1}, {label:'Notable', val:2}
    ]},
    { id: 'visual', text: 'Visual hallucinations (seeing things others don\'t)?', opts: [
      {label:'Never', val:0}, {label:'Occasional', val:1}, {label:'Frequent', val:2}
    ]},
    { id: 'personality', text: 'Personality or behavior changes (disinhibition, apathy, language)?', opts: [
      {label:'None', val:0}, {label:'Subtle', val:1}, {label:'Pronounced', val:2}
    ]}
  ],

  state: {},

  render(target) {
    target.innerHTML = `
      <div class="screener-form" id="screenerForm">
        ${this.questions.map((q, i) => `
          <div class="screener-q" data-q="${q.id}">
            <div class="q-num">Q${String(i+1).padStart(2,'0')} / ${this.questions.length}</div>
            <div class="q-text">${q.text}</div>
            <div class="q-options">
              ${q.opts.map(o => `<div class="q-opt" data-q="${q.id}" data-val="${o.val}">${o.label}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex; gap:10px; margin-top:14px; align-items:center;">
        <button class="btn btn-accent" id="screenerCalc">Calculate Risk Profile</button>
        <button class="btn btn-ghost" id="screenerReset">Reset</button>
        <span class="mono tiny muted" id="screenerProgress">0 / ${this.questions.length} answered</span>
      </div>
      <div id="screenerResultPanel" style="margin-top:14px;"></div>
    `;

    this.attachHandlers();
  },

  attachHandlers() {
    document.querySelectorAll('.q-opt').forEach(el => {
      el.addEventListener('click', () => {
        const q = el.dataset.q;
        const v = +el.dataset.val;
        document.querySelectorAll(`.q-opt[data-q="${q}"]`).forEach(x => x.classList.remove('is-selected'));
        el.classList.add('is-selected');
        this.state[q] = v;
        this.updateProgress();
      });
    });
    document.getElementById('screenerCalc').addEventListener('click', () => this.calculate());
    document.getElementById('screenerReset').addEventListener('click', () => this.reset());
  },

  updateProgress() {
    const answered = Object.keys(this.state).length;
    document.getElementById('screenerProgress').textContent = `${answered} / ${this.questions.length} answered`;
  },

  calculate() {
    const answered = Object.keys(this.state).length;
    if (answered < this.questions.length) {
      alert(`Please complete all questions. ${this.questions.length - answered} remaining.`);
      return;
    }

    const s = this.state;
    const total = Object.values(s).reduce((a,b) => a+b, 0);
    const max = this.questions.reduce((sum, q) => sum + Math.max(...q.opts.map(o => o.val)), 0);
    const pct = Math.round((total / max) * 100);

    // Pattern recognition for differential
    let signals = [];
    let recommend = [];
    let urgency = 'Routine';
    let urgencyClass = 'pill-pos';

    // AD signal
    if (s.memory >= 2 && s.function >= 1 && s.age >= 1) {
      signals.push({ type: 'AD signal', strength: 'Moderate', desc: 'Memory + functional decline pattern with age risk' });
    }

    // Vascular signal
    if (s.cardio >= 1 && (s.memory >= 1 || s.function >= 1)) {
      signals.push({ type: 'Vascular contribution', strength: 'Possible', desc: 'Cardiovascular risk factors with cognitive concern' });
    }

    // Lewy body signal
    if (s.visual >= 1 && (s.parkinsons >= 1 || s.sleep >= 1)) {
      signals.push({ type: 'Lewy body / DLB signal', strength: 'Notable', desc: 'Visual hallucinations + parkinsonism/REM features' });
      urgency = 'Specialty referral'; urgencyClass = 'pill-watch';
    }

    // FTD signal
    if (s.personality >= 1 && s.memory < 2 && s.age <= 2) {
      signals.push({ type: 'FTD signal', strength: 'Possible', desc: 'Behavior change with relatively preserved memory, younger onset' });
    }

    // Depression signal
    if (s.mood >= 2 && s.memory >= 1) {
      signals.push({ type: 'Mood-related cognitive symptoms', strength: 'Important', desc: 'Mood symptoms must be addressed; consider pseudodementia' });
    }

    // Modifiable risk
    let modifiable = [];
    if (s.hearing >= 1) modifiable.push('hearing assessment + correction');
    if (s.cardio >= 1) modifiable.push('cardiovascular risk optimization');
    if (s.social >= 2) modifiable.push('social engagement programs');
    if (s.sleep >= 1) modifiable.push('sleep evaluation');

    // Urgency tiering
    if (pct >= 50 || s.function >= 2) { urgency = 'Prompt evaluation'; urgencyClass = 'pill-conc'; }
    else if (pct >= 25 || signals.length > 0) { urgency = 'Specialty referral'; urgencyClass = 'pill-watch'; }
    else { urgency = 'Routine monitoring'; urgencyClass = 'pill-pos'; }

    // Recommendations
    if (s.memory >= 1 || s.function >= 1) {
      recommend.push('Formal cognitive screening (MoCA preferred for MCI sensitivity)');
      recommend.push('Informant interview (AD8 or IQCODE)');
    }
    if (pct >= 25) {
      recommend.push('Basic labs: CBC, CMP, TSH, B12, folate, RPR');
      recommend.push('Brain imaging (MRI preferred; CT acceptable)');
    }
    if (signals.find(s => s.type.includes('Lewy')) || s.parkinsons >= 1) {
      recommend.push('Consider DaT-SPECT and movement disorder consult');
    }
    if (signals.find(s => s.type.includes('AD signal'))) {
      recommend.push('Consider plasma p-tau217 or amyloid PET if symptomatic');
    }
    if (modifiable.length) {
      recommend.push('Address modifiable risks: ' + modifiable.join(', '));
    }
    if (recommend.length === 0) {
      recommend.push('Continue lifestyle prevention (Mediterranean/MIND diet, exercise, social engagement)');
      recommend.push('Re-screen annually after age 65');
    }

    // Render result
    const panel = document.getElementById('screenerResultPanel');
    panel.innerHTML = `
      <div class="screener-result">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px;">
          <div>
            <div class="result-label">Composite Risk Score</div>
            <div class="result-score">${pct}<span style="font-size:18px; opacity:0.6;">/100</span></div>
            <div style="margin-top:6px;"><span class="pill ${urgencyClass}" style="background:rgba(255,255,255,0.05);">${urgency}</span></div>
          </div>
          <div style="flex:1; max-width:360px;">
            <div class="result-label" style="margin-bottom:6px;">Risk Distribution</div>
            <div class="gauge">
              <div class="gauge-needle" style="left:${pct}%;"></div>
            </div>
            <div class="gauge-labels">
              <span>Low</span><span>Mild</span><span>Mod</span><span>High</span><span>Very high</span>
            </div>
          </div>
        </div>

        <div style="margin-top:18px; display:grid; grid-template-columns: 1fr 1fr; gap:18px;">
          <div>
            <div class="result-label" style="margin-bottom:8px;">Pattern Signals</div>
            ${signals.length ? signals.map(s => `
              <div style="padding:8px 10px; background:rgba(255,255,255,0.04); border-left:2px solid var(--accent); margin-bottom:6px;">
                <div style="font-family:var(--font-mono); font-size:11px; letter-spacing:0.04em; color:var(--accent);">${s.type} — ${s.strength}</div>
                <div style="font-size:12px; line-height:1.4; margin-top:2px;">${s.desc}</div>
              </div>
            `).join('') : '<div class="tiny muted">No specific pattern detected.</div>'}
          </div>
          <div>
            <div class="result-label" style="margin-bottom:8px;">Recommended Next Steps</div>
            <ul style="font-size:12px; line-height:1.55; list-style:none;">
              ${recommend.map((r,i) => `
                <li style="padding:5px 0; border-bottom:1px dashed rgba(255,255,255,0.08);">
                  <span style="font-family:var(--font-mono); color:var(--accent); font-size:10px;">${String(i+1).padStart(2,'0')}</span> ${r}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div style="margin-top:18px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.1); font-family:var(--font-mono); font-size:10px; line-height:1.6; color:var(--ink-faint);">
          ⚠ EDUCATIONAL TOOL ONLY. Not validated as a diagnostic instrument. Real screening requires standardized tools (MoCA, MMSE) administered by qualified clinicians, with appropriate workup for differential diagnosis.
        </div>
      </div>
    `;
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  reset() {
    this.state = {};
    document.querySelectorAll('.q-opt').forEach(x => x.classList.remove('is-selected'));
    document.getElementById('screenerResultPanel').innerHTML = '';
    this.updateProgress();
  }
};

if (typeof window !== 'undefined') window.NV_SCREENER = NV_SCREENER;
