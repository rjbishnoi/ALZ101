/* ============================================
   NeuroViz — Medical Terminology Tooltips
   ============================================
   Wraps recognized medical/neurological terms with a hover-able
   underline that reveals a plain-language definition.

   Usage:
     <span>${ NV_TERMS.annotate("Patient has chorea and bradyphrenia") }</span>
   produces:
     "Patient has <span class='nv-term' data-term='chorea'>chorea</span>
        and <span class='nv-term' data-term='bradyphrenia'>bradyphrenia</span>"
   with hover behavior wired up automatically.

   Add new terms by adding to the GLOSSARY map. Both 'aliases' and the
   canonical key are matched (case-insensitive).
   ============================================ */

const NV_TERMS = (function () {

  const GLOSSARY = {
    // --- Movement / motor ---
    'chorea': {
      defn: 'Brief, rapid, irregular, involuntary "dance-like" movements that flow from one body part to another. Hallmark of Huntington disease.',
      examples: 'Sudden grimaces, finger flicks, or shoulder shrugs that the person cannot fully suppress.',
      aliases: ['choreiform']
    },
    'bradyphrenia': {
      defn: 'Slowness of thinking — taking longer to respond to questions, follow conversations, or process new information. Distinct from forgetfulness.',
      examples: 'A person who eventually answers correctly but with a long pause; common in Parkinson disease dementia.',
      aliases: []
    },
    'bradykinesia': {
      defn: 'Slowness of movement — a core feature of Parkinsonism. Movements become smaller and slower; tasks like buttoning a shirt take longer.',
      examples: 'Decreased arm swing while walking; a "masked" facial expression.'
    },
    'parkinsonism': {
      defn: 'A constellation of motor symptoms (slowness, rigidity, tremor, postural instability) that may be caused by Parkinson disease or by other conditions including DLB, vascular disease, and certain medications.',
      examples: 'Stooped posture, shuffling gait, "pill-rolling" tremor at rest.',
      aliases: ['parkinsonian']
    },
    'myoclonus': {
      defn: 'Sudden, brief, shock-like muscle jerks. Can be normal (a "sleep start") or pathological (CJD, late-stage Alzheimer disease, metabolic encephalopathy).',
      examples: 'A startle-like jerk of an arm or the whole body, often triggered by sound or touch.'
    },
    'gait apraxia': {
      defn: 'Difficulty initiating or sustaining walking despite normal motor strength — feet feel "stuck to the floor". Classic sign of normal pressure hydrocephalus (NPH).',
      examples: 'Magnetic gait, short shuffling steps, tendency to freeze in doorways.',
      aliases: ['gait freezing']
    },
    'rigidity': {
      defn: 'Stiffness in the limbs that resists passive movement; a Parkinsonian sign. May feel "lead-pipe" (smooth) or "cogwheel" (ratchet-like).',
      examples: 'Examiner moving the patient\'s wrist feels jerky resistance throughout the range.'
    },

    // --- Cognitive / language ---
    'aphasia': {
      defn: 'Impaired ability to use or understand language, typically from damage to language centers in the dominant (usually left) hemisphere.',
      examples: 'Difficulty finding words ("anomia"), speaking in short fragments, or trouble understanding speech.'
    },
    'anomia': {
      defn: 'Difficulty naming objects or finding the right word, even when meaning is preserved. Very common early in Alzheimer disease.',
      examples: 'Calling a watch a "thing for time" because the word "watch" is unavailable.'
    },
    'agnosia': {
      defn: 'Inability to recognize familiar objects, faces, sounds, or places despite intact senses. Visual agnosia is common in posterior cortical atrophy.',
      examples: 'Seeing a comb but unable to identify it, although vision and intelligence are intact.'
    },
    'apraxia': {
      defn: 'Loss of ability to perform learned, purposeful movements, despite normal strength. The person knows what to do but cannot make the body do it.',
      examples: 'Inability to demonstrate how to use a toothbrush despite knowing what it is.'
    },
    'dysexecutive': {
      defn: 'A pattern of cognitive impairment in planning, organizing, sequencing, and judgment — controlled by the frontal lobes.',
      examples: 'Difficulty managing finances, getting overwhelmed by multi-step tasks, poor impulse control.',
      aliases: ['executive dysfunction']
    },
    'visuospatial': {
      defn: 'The ability to perceive objects in space and their relationships. Impairment causes getting lost, trouble with stairs, and poor depth perception.',
      examples: 'Difficulty parking the car, copying a clock face, or reaching for an object.'
    },
    'confabulation': {
      defn: 'Producing fabricated memories without the intent to deceive — the person believes them to be true. Hallmark of Wernicke-Korsakoff syndrome.',
      examples: 'Vividly describing a fictitious recent event when asked what they did yesterday.'
    },
    'anterograde amnesia': {
      defn: 'Inability to form new memories after the onset of illness. Old memories may remain intact.',
      examples: 'Repeating the same question every few minutes; not remembering a doctor\'s visit hours later.'
    },

    // --- Behavioral / psychiatric ---
    'disinhibition': {
      defn: 'Loss of social and behavioral filters — saying or doing things the person normally would not. Hallmark of behavioral-variant frontotemporal dementia.',
      examples: 'Inappropriate comments to strangers, impulsive spending, eating from others\' plates.'
    },
    'apathy': {
      defn: 'Loss of motivation, interest, and initiative. Distinct from depression — the person is not sad, just disengaged. Very common across dementia types.',
      examples: 'Sitting in a chair all day without picking up favorite hobbies; reduced spontaneous speech.'
    },
    'sundowning': {
      defn: 'Increased confusion, agitation, or restlessness in the late afternoon and evening. Affects roughly 1 in 5 people with dementia.',
      examples: 'Calm in the morning, increasingly irritable and pacing as the sun sets.'
    },
    'visual hallucinations': {
      defn: 'Seeing things that are not there. Highly characteristic of dementia with Lewy bodies; can also occur in PDD, delirium, and very late AD.',
      examples: 'Seeing children, animals, or unknown people in the home; often vivid and detailed.'
    },
    'rem sleep behavior disorder': {
      defn: 'Acting out dreams during REM sleep — talking, kicking, punching. May precede a synucleinopathy (DLB, Parkinson) by years to decades.',
      examples: 'A bed partner reports being kicked or hit during sleep; the person has no memory of it.',
      aliases: ['rbd']
    },
    'fluctuating cognition': {
      defn: 'Unpredictable swings in alertness and attention from one hour or day to the next. Core feature of dementia with Lewy bodies.',
      examples: 'Lucid conversation in the morning, staring blankly and unresponsive in the afternoon.'
    },
    'autonomic dysfunction': {
      defn: 'Impairment of involuntary body functions — blood pressure, heart rate, digestion, bladder, temperature regulation. Common in DLB and PDD.',
      examples: 'Lightheadedness on standing (orthostatic hypotension), constipation, urinary urgency.'
    },

    // --- Brain / pathology ---
    'amyloid': {
      defn: 'A misfolded protein (Aβ) that accumulates as plaques in the brain in Alzheimer disease, beginning 15–20 years before symptoms.',
      examples: 'Detected by CSF Aβ42, plasma p-tau217, or amyloid PET imaging.',
      aliases: ['amyloid plaques', 'aβ', 'a-beta']
    },
    'tau': {
      defn: 'A protein that, when abnormally phosphorylated, forms neurofibrillary tangles inside neurons in AD and other tauopathies.',
      examples: 'Plasma p-tau217 and tau PET imaging measure tau pathology.',
      aliases: ['tauopathy', 'p-tau']
    },
    'alpha-synuclein': {
      defn: 'Protein that misfolds and forms Lewy bodies in DLB and Parkinson disease. New skin biopsy and CSF assays can detect it.',
      aliases: ['α-synuclein', 'synucleinopathy']
    },
    'neurofibrillary tangles': {
      defn: 'Abnormal twisted fibers of tau protein inside dying neurons — one of the two pathological hallmarks of Alzheimer disease.',
      aliases: ['nft']
    },
    'cortical atrophy': {
      defn: 'Visible shrinkage of the brain\'s outer layer (cortex) on MRI, caused by neuronal loss.',
      examples: 'Hippocampal atrophy in AD; frontotemporal atrophy in FTD; posterior atrophy in PCA.'
    },
    'hippocampal': {
      defn: 'Pertaining to the hippocampus — the brain region central to forming new memories. First and worst affected in typical AD.',
      examples: 'Hippocampal atrophy on MRI is an early AD imaging marker.',
      aliases: ['hippocampus']
    },

    // --- Diagnostic / lab ---
    'csf': {
      defn: 'Cerebrospinal fluid — the clear liquid surrounding the brain and spinal cord. Sampled by lumbar puncture for biomarker testing.',
      aliases: ['cerebrospinal fluid']
    },
    'rt-quic': {
      defn: 'Real-time quaking-induced conversion — an ultra-sensitive test that detects misfolded prion proteins (CJD) in CSF or skin.',
      examples: '>95% sensitivity and specificity for CJD; available at NPDPSC and a growing number of labs.'
    },
    'apoe ε4': {
      defn: 'A genetic variant of the apolipoprotein E gene. The strongest known genetic risk factor for late-onset Alzheimer disease — one copy roughly triples risk; two copies raise it 10–15 fold.',
      aliases: ['apoe e4', 'apoe-e4', 'apoe4', 'apoe ε4 carriers']
    },
    'cdr-sb': {
      defn: 'Clinical Dementia Rating – Sum of Boxes — a 0-to-18 scale combining 6 domains. The primary outcome measure in most modern AD trials.',
      aliases: ['cdr', 'cdr sum of boxes']
    },
    'mmse': {
      defn: 'Mini-Mental State Examination — a 30-point cognitive screening test covering orientation, memory, attention, language, and visuospatial skills.'
    },
    'moca': {
      defn: 'Montreal Cognitive Assessment — a 30-point screening test more sensitive than MMSE for MCI. ≥26 is generally considered normal.'
    },

    // --- Other ---
    'reversible cause': {
      defn: 'A treatable contributor to cognitive impairment that, if corrected, can fully or partially restore cognition. About 5% of dementia presentations have a reversible cause.',
      examples: 'B12 deficiency, hypothyroidism, depression, medication side effects, normal pressure hydrocephalus.',
      aliases: ['reversible causes']
    },
    'aria': {
      defn: 'Amyloid-Related Imaging Abnormalities — brain edema (ARIA-E) or microhemorrhage (ARIA-H) seen on MRI in patients on anti-amyloid antibodies. Highest risk in APOE ε4 homozygotes.'
    },
    'ariae': {
      defn: 'ARIA-E (edema) — the swelling/effusion form of ARIA. Seen as T2/FLAIR hyperintensity on MRI in patients on anti-amyloid antibodies.',
      aliases: ['aria-e', 'aria e']
    },
    'ariah': {
      defn: 'ARIA-H (hemorrhage) — small bleeds or superficial siderosis on MRI in patients on anti-amyloid antibodies.',
      aliases: ['aria-h', 'aria h']
    },
    'ftd': {
      defn: 'Frontotemporal dementia — a group of disorders affecting the frontal and temporal lobes; the most common cause of dementia under age 60. Behavioral or language variants.',
      aliases: ['frontotemporal dementia']
    },
    'dlb': {
      defn: 'Dementia with Lewy bodies — second most common neurodegenerative dementia. Core features: fluctuating cognition, visual hallucinations, parkinsonism, REM sleep behavior disorder.',
      aliases: ['dementia with lewy bodies', 'lewy body dementia']
    },
    'pdd': {
      defn: 'Parkinson disease dementia — cognitive impairment that develops at least 1 year after well-established Parkinson disease.',
      aliases: ['parkinson disease dementia']
    },
    'cjd': {
      defn: 'Creutzfeldt-Jakob disease — a rare, rapidly fatal prion disease. Most cases are sporadic; rare familial and acquired forms exist.',
      aliases: ['creutzfeldt-jakob', 'creutzfeldt-jakob disease']
    },
    'nph': {
      defn: 'Normal pressure hydrocephalus — a potentially reversible cause of dementia. Classic triad: gait apraxia, urinary incontinence, cognitive change. Treated with shunt placement.',
      aliases: ['normal pressure hydrocephalus']
    },
    'mci': {
      defn: 'Mild Cognitive Impairment — objective cognitive change beyond normal aging, but daily activities are still independent. ~10–15% per year progress to dementia.',
      aliases: ['mild cognitive impairment']
    }
  };

  // Build a flat lookup including aliases, sorted by length (longer first)
  // so multi-word terms match before single-word substrings.
  const ENTRIES = [];
  for (const key of Object.keys(GLOSSARY)) {
    const e = GLOSSARY[key];
    ENTRIES.push({ term: key, key, defn: e.defn, examples: e.examples });
    if (e.aliases) {
      for (const a of e.aliases) ENTRIES.push({ term: a, key, defn: e.defn, examples: e.examples });
    }
  }
  ENTRIES.sort((a, b) => b.term.length - a.term.length);

  function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /**
   * Wrap recognized terms in HTML with a hoverable span. Skips terms
   * that are inside an <a>, <code>, or already-wrapped <span class="nv-term">.
   */
  function annotate(text) {
    if (!text || typeof text !== 'string') return text;

    // Track positions already covered to prevent overlapping replacements
    const replacements = [];
    const lower = text.toLowerCase();

    for (const e of ENTRIES) {
      const pattern = new RegExp('\\b' + escapeReg(e.term) + '\\b', 'gi');
      let m;
      while ((m = pattern.exec(lower)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        // Skip if overlapping prior replacement
        if (replacements.some(r => !(end <= r.start || start >= r.end))) continue;
        replacements.push({
          start, end,
          original: text.slice(start, end),
          key: e.key,
          defn: e.defn,
          examples: e.examples
        });
      }
    }

    if (!replacements.length) return text;
    replacements.sort((a, b) => a.start - b.start);

    let out = '';
    let cursor = 0;
    for (const r of replacements) {
      out += text.slice(cursor, r.start);
      const tooltip = r.examples
        ? `${r.defn}\n\nExample: ${r.examples}`
        : r.defn;
      out += `<span class="nv-term" data-term="${r.key}" data-tooltip="${tooltip.replace(/"/g, '&quot;')}">${r.original}</span>`;
      cursor = r.end;
    }
    out += text.slice(cursor);
    return out;
  }

  // Wire up the global tooltip element on first call
  let tooltipEl = null;
  function ensureTooltip() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'nv-term-tooltip';
    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  function showTooltip(termEl) {
    const tip = ensureTooltip();
    const raw = termEl.dataset.tooltip || '';
    const parts = raw.split('\n\nExample: ');
    const defn = parts[0];
    const ex = parts[1];
    tip.innerHTML = `
      <div class="nvt-defn">${defn}</div>
      ${ex ? `<div class="nvt-ex"><span class="nvt-ex-label">Example:</span> ${ex}</div>` : ''}
    `;
    const rect = termEl.getBoundingClientRect();
    const tipW = 320; // we'll constrain width via CSS
    let x = rect.left + (rect.width / 2) - (tipW / 2);
    let y = rect.bottom + 8;
    if (x < 8) x = 8;
    if (x + tipW > window.innerWidth - 8) x = window.innerWidth - tipW - 8;
    tip.style.left = x + 'px';
    tip.style.top  = (y + window.scrollY) + 'px';
    tip.classList.add('is-visible');
  }
  function hideTooltip() {
    if (tooltipEl) tooltipEl.classList.remove('is-visible');
  }

  // Delegate hover events at the document root
  if (typeof document !== 'undefined') {
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('.nv-term');
      if (t) showTooltip(t);
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('.nv-term')) hideTooltip();
    });
    // For touch / focus
    document.addEventListener('focusin', e => {
      const t = e.target.closest('.nv-term');
      if (t) showTooltip(t);
    });
    document.addEventListener('focusout', e => {
      if (e.target.closest('.nv-term')) hideTooltip();
    });
  }

  return { annotate, GLOSSARY };
})();

if (typeof window !== 'undefined') window.NV_TERMS = NV_TERMS;
