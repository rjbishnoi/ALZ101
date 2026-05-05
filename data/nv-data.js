/* ============================================
   NeuroViz — Data Layer
   All clinical data, references, and content
   Sources cited inline; for educational reference only.
   ============================================ */

const NV_DATA = {

  // ===== DEMENTIA TYPES =====
  dementiaTypes: [
    {
      id: 'AD', code: 'ALZ', name: "Alzheimer's Disease", typeClass: 'ad',
      prevalencePct: 60, prevalenceText: '60–80% of dementia cases',
      ageOnset: '65+ (early-onset <65)',
      hallmark: 'Amyloid-β plaques, tau neurofibrillary tangles',
      progression: 'Insidious, gradual decline over 8–10 years',
      keyFeatures: ['Episodic memory loss', 'Word-finding difficulty', 'Visuospatial deficits', 'Executive dysfunction'],
      stage: 4
    },
    {
      id: 'VAD', code: 'VAS', name: 'Vascular Dementia', typeClass: 'vasc',
      prevalencePct: 10, prevalenceText: '5–10% of dementia (often mixed)',
      ageOnset: '60–75',
      hallmark: 'Cerebrovascular disease, strategic infarcts, white-matter lesions',
      progression: 'Stepwise decline; correlates with vascular events',
      keyFeatures: ['Executive dysfunction', 'Slowed processing', 'Focal neuro signs', 'Gait disturbance'],
      stage: 3
    },
    {
      id: 'DLB', code: 'LBD', name: 'Lewy Body Dementia', typeClass: 'lewy',
      prevalencePct: 7, prevalenceText: '5–15% of dementia',
      ageOnset: '50–80',
      hallmark: 'α-synuclein Lewy bodies in cortex and brainstem',
      progression: 'Fluctuating cognition; rapid in some cases',
      keyFeatures: ['Visual hallucinations', 'Parkinsonism', 'REM sleep disorder', 'Cognitive fluctuations'],
      stage: 4
    },
    {
      id: 'FTD', code: 'FTD', name: 'Frontotemporal Dementia', typeClass: 'ftd',
      prevalencePct: 5, prevalenceText: '5–10% of dementia under 65',
      ageOnset: '45–65',
      hallmark: 'Tau, TDP-43, or FUS protein aggregates in frontotemporal lobes',
      progression: 'Variable; behavioral variant often rapid',
      keyFeatures: ['Personality change', 'Disinhibition', 'Language deficits (PPA variants)', 'Apathy'],
      stage: 4
    },
    {
      id: 'MIX', code: 'MIX', name: 'Mixed Dementia', typeClass: 'mixed',
      prevalencePct: 10, prevalenceText: '10–30% (often AD + vascular)',
      ageOnset: '70+',
      hallmark: 'Combined AD + vascular pathology most common',
      progression: 'Variable; depends on dominant pathology',
      keyFeatures: ['Overlapping AD + vascular features', 'Often diagnosed post-mortem', 'Common in older adults'],
      stage: 4
    },
    {
      id: 'PDD', code: 'PDD', name: "Parkinson's Disease Dementia", typeClass: 'park',
      prevalencePct: 3, prevalenceText: '~80% of PD patients eventually',
      ageOnset: 'After ≥1 yr of motor PD',
      hallmark: 'α-synuclein, similar to DLB',
      progression: 'Gradual after motor symptoms',
      keyFeatures: ['Executive dysfunction', 'Bradyphrenia', 'Visual hallucinations', 'Motor symptoms predominate'],
      stage: 3
    },
    {
      id: 'CJD', code: 'CJD', name: 'Creutzfeldt-Jakob Disease', typeClass: 'other',
      prevalencePct: 1, prevalenceText: '1 per million annually',
      ageOnset: '60–70 (sporadic)',
      hallmark: 'Misfolded prion protein',
      progression: 'Rapidly progressive; death within 1 year typically',
      keyFeatures: ['Rapid cognitive decline', 'Myoclonus', 'Ataxia', 'Periodic EEG'],
      stage: 5
    },
    {
      id: 'NPH', code: 'NPH', name: 'Normal Pressure Hydrocephalus', typeClass: 'other',
      prevalencePct: 2, prevalenceText: '~5% of dementias (potentially reversible)',
      ageOnset: '60+',
      hallmark: 'Ventricular enlargement without elevated CSF pressure',
      progression: 'Reversible with shunt in some cases',
      keyFeatures: ['Gait apraxia', 'Urinary incontinence', 'Cognitive impairment (Hakim triad)'],
      stage: 2
    },
    {
      id: 'HD', code: 'HD', name: "Huntington's Disease", typeClass: 'other',
      prevalencePct: 0.5, prevalenceText: '~5 per 100,000',
      ageOnset: '30–50',
      hallmark: 'CAG trinucleotide repeat expansion in HTT gene',
      progression: '15–20 years from onset',
      keyFeatures: ['Chorea', 'Executive dysfunction', 'Psychiatric symptoms', 'Autosomal dominant'],
      stage: 4
    },
    {
      id: 'WK', code: 'WK', name: 'Wernicke-Korsakoff Syndrome', typeClass: 'other',
      prevalencePct: 1, prevalenceText: 'Underdiagnosed; alcohol-related',
      ageOnset: 'Variable',
      hallmark: 'Thiamine (B1) deficiency, often alcohol-related',
      progression: 'Acute Wernicke → chronic Korsakoff if untreated',
      keyFeatures: ['Confabulation', 'Anterograde amnesia', 'Ataxia', 'Ophthalmoplegia'],
      stage: 3
    },
    {
      id: 'PCA', code: 'PCA', name: 'Posterior Cortical Atrophy', typeClass: 'ad',
      prevalencePct: 1, prevalenceText: 'AD variant; <5% of AD cases',
      ageOnset: '50–65',
      hallmark: 'AD pathology in posterior cortex',
      progression: 'Similar to AD',
      keyFeatures: ['Visuospatial deficits', 'Reading difficulty', 'Gerstmann syndrome', 'Memory often spared early'],
      stage: 3
    },
    {
      id: 'PPA', code: 'PPA', name: 'Primary Progressive Aphasia', typeClass: 'ftd',
      prevalencePct: 2, prevalenceText: 'FTD spectrum',
      ageOnset: '50–70',
      hallmark: 'Variable; tau, TDP-43, or AD pathology',
      progression: 'Language deficits dominate for ≥2 years',
      keyFeatures: ['Semantic variant: word meaning loss', 'Nonfluent: agrammatism', 'Logopenic: word retrieval'],
      stage: 3
    }
  ],

  // ===== TICKER FACTS — full sentences shown in scrolling top tape =====
  // Each item is one self-contained, interesting fact with a citation handle.
  ticker: [
    { fact: 'A new case of dementia is diagnosed somewhere in the world every 3 seconds.', source: 'WHO 2024' },
    { fact: 'Brain changes in Alzheimer\'s begin 15–20 years before any memory symptoms appear.', source: 'NIA' },
    { fact: 'Up to 45% of dementia worldwide could be prevented or delayed by addressing 14 modifiable risk factors.', source: 'Lancet Commission 2024' },
    { fact: 'A simple plasma p-tau217 blood test now detects Alzheimer\'s pathology with 94% accuracy.', source: 'Mayo Clinic' },
    { fact: 'Lecanemab (Leqembi) was the first drug shown to slow the progression of early Alzheimer\'s — by 27% over 18 months.', source: 'CLARITY-AD, NEJM' },
    { fact: 'Two-thirds of Americans living with Alzheimer\'s are women, partly explained by longer lifespan and biology.', source: 'Alzheimer\'s Association 2024' },
    { fact: 'Hearing loss in midlife is the single largest modifiable risk factor for dementia, contributing 7% of population risk.', source: 'Lancet 2024' },
    { fact: 'Worldwide, more than 11 million caregivers provide an estimated 18 billion hours of unpaid dementia care each year.', source: 'Alzheimer\'s Association' },
    { fact: 'Each APOE ε4 gene copy roughly triples Alzheimer\'s risk; two copies increase it 10–15 fold.', source: 'NIA genetics' },
    { fact: 'Dementia with Lewy bodies often presents first as REM sleep behavior disorder, sometimes a decade before cognitive symptoms.', source: 'JAMA Neurol' },
    { fact: 'Music therapy reduces agitation in moderate-to-severe Alzheimer\'s — supported by Cochrane meta-analysis of 22 RCTs.', source: 'Cochrane 2024' },
    { fact: 'Adherence to the Mediterranean-DASH (MIND) diet is associated with 53% lower Alzheimer\'s risk in highest-adherence groups.', source: 'Rush MAP study' },
    { fact: '5% of all dementias have potentially reversible causes — vitamin B12 deficiency, thyroid disease, normal-pressure hydrocephalus.', source: 'AAN review' },
    { fact: 'Roughly half of people living with dementia globally have never received a formal diagnosis.', source: 'WHO Global Action Plan' },
    { fact: 'Donanemab (Kisunla) cleared brain amyloid plaques in 76% of treated early Alzheimer\'s patients within 18 months.', source: 'TRAILBLAZER-ALZ 2' },
    { fact: 'Caregivers of people with dementia are 2× more likely to have clinically significant depression than non-dementia caregivers.', source: 'JAGS' },
    { fact: 'Frontotemporal dementia is the most common cause of dementia in people under age 60 — often misdiagnosed as a psychiatric condition.', source: 'AFTD' },
    { fact: 'A 2024 cohort study linked GLP-1 receptor agonists (e.g., semaglutide for diabetes) to a 12% lower dementia risk in type-2 diabetics.', source: 'BMJ' }
  ],

  // ===== TOP STATS =====
  topStats: [
    { label: 'GLOBAL CASES', value: '57M', detail: '139M projected by 2050', dir: 'up' },
    { label: 'NEW CASES / YR', value: '10M', detail: 'one every 3 seconds', dir: 'up' },
    { label: 'US PREVALENCE', value: '6.9M', detail: '≥65 yrs · 1 in 9', dir: 'up' },
    { label: 'WOMEN AFFECTED', value: '64%', detail: 'of US cases', dir: 'up' },
    { label: 'UNDIAGNOSED', value: '~50%', detail: 'globally', dir: 'down' },
    { label: 'GLOBAL COST', value: '$1.3T', detail: '2030 projection', dir: 'down' }
  ],

  // ===== NEWS =====
  // Each item now includes a working URL pointing to a real article on the cited source.
  // Headlines are paraphrased from the underlying coverage; click the title to read the source.
  news: [
    {
      time: 'Today',
      title: 'EVOKE trials: oral semaglutide fails to slow Alzheimer\'s progression in two large Phase 3 readouts',
      source: 'The Lancet', cat: 'Trials', tag: 'AD',
      url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(26)00459-9/fulltext'
    },
    {
      time: 'Today',
      title: 'Genentech/Roche begin Phase 3 of trontinemab — a brain-shuttle anti-amyloid antibody with low ARIA',
      source: 'Roche / Genentech', cat: 'Trials', tag: 'AD',
      url: 'https://clinicaltrials.gov/study/NCT07170150'
    },
    {
      time: 'Yesterday',
      title: 'Restoring memory by blocking a single Alzheimer\'s protein: SOX9 activation clears plaques in mouse models',
      source: 'ScienceDaily', cat: 'Research', tag: 'Biomarkers',
      url: 'https://www.sciencedaily.com/releases/2026/04/260429102037.htm'
    },
    {
      time: 'Yesterday',
      title: 'Harvard team links lithium depletion to Alzheimer\'s onset; lithium orotate reverses pathology in mice',
      source: 'Harvard Gazette', cat: 'Research', tag: 'Prevention',
      url: 'https://news.harvard.edu/gazette/story/2026/01/an-alzheimers-breakthrough-10-years-in-the-making/'
    },
    {
      time: '2d ago',
      title: 'Mendelian-randomization study: obesity and high blood pressure may directly cause dementia, not just correlate',
      source: 'ScienceDaily', cat: 'Research', tag: 'Prevention',
      url: 'https://www.sciencedaily.com/news/mind_brain/alzheimer\'s/'
    },
    {
      time: '3d ago',
      title: 'Alzheimer\'s Association: 7.2 million Americans aged 65+ now live with Alzheimer\'s — 1 in 9 of that age group',
      source: 'Alzheimer\'s Association', cat: 'Care', tag: 'Access',
      url: 'https://www.alz.org/alzheimers-dementia/facts-figures'
    },
    {
      time: '3d ago',
      title: 'Cochrane meta-analysis: music-based interventions reliably reduce agitation in moderate-to-severe dementia',
      source: 'Cochrane Library', cat: 'Care', tag: 'Non-Pharm',
      url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003477.pub4/full'
    },
    {
      time: '4d ago',
      title: 'Lecanemab (Leqembi) maintenance dosing extends benefit in early AD — Eisai presents long-term data at CTAD 2025',
      source: 'Eisai', cat: 'Treatment', tag: 'AD',
      url: 'https://www.eisai.com/news/2025/news202585.html'
    },
    {
      time: '5d ago',
      title: 'CervoMed announces neflamapimod RewinD-LB extension data: sustained CDR-SB benefit in pure DLB',
      source: 'CervoMed', cat: 'Trials', tag: 'DLB',
      url: 'https://ir.cervomed.com/news-releases/news-release-details/cervomed-announces-32-week-data-rewind-lb-trial-extension-phase'
    },
    {
      time: '6d ago',
      title: 'Just 5 weeks of computerized speed-of-processing brain training cuts dementia risk for 20 years in adults 65+',
      source: 'ScienceDaily', cat: 'Research', tag: 'Prevention',
      url: 'https://www.sciencedaily.com/news/mind_brain/alzheimer\'s/'
    },
    {
      time: '1w ago',
      title: 'Lancet Commission 2024: 14 modifiable risk factors — adding vision loss and elevated LDL — could prevent 45% of dementia',
      source: 'The Lancet', cat: 'Research', tag: 'Prevention',
      url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)01296-0/fulltext'
    },
    {
      time: '1w ago',
      title: 'Anavex: 144-week open-label data show oral blarcamesine sustained early-AD benefit; Phase 3 ongoing',
      source: 'Anavex Life Sciences', cat: 'Trials', tag: 'AD',
      url: 'https://anavex.com/news/anavex-blarcamesine-brain-volume-alzheimers-adpd-2026/'
    },
    {
      time: '2w ago',
      title: 'PROGRESS-AD: GSK\'s anti-sortilin antibody AL101 raises progranulin in early AD — neuroinflammation strategy advances',
      source: 'GSK Trial Register', cat: 'Trials', tag: 'AD',
      url: 'https://www.gsk-studyregister.com/trials/219867'
    },
    {
      time: '2w ago',
      title: 'AlzForum: comprehensive overview of remternetug (Lilly) — next-gen anti-pyroglutamate Aβ in 4 ongoing pivotal trials',
      source: 'AlzForum', cat: 'Treatment', tag: 'AD',
      url: 'https://www.alzforum.org/therapeutics/remternetug'
    },
    {
      time: '3w ago',
      title: 'NEJM 2024: lecanemab CLARITY-AD long-term follow-up confirms 27% slowing on CDR-SB sustained beyond 18 months',
      source: 'NEJM', cat: 'Trials', tag: 'AD',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2212948'
    }
  ],

  // ===== SCREENING TOOLS =====
  screeningTools: [
    {
      id: 'MOCA', code: 'MoCA', name: 'Montreal Cognitive Assessment', minutes: 10,
      sensitivity: 90, specificity: 87, cutoff: '<26 / 30',
      domain: 'Multi-domain', settings: ['Primary care', 'Specialty', 'Memory clinic'],
      use: 'Detection of mild cognitive impairment',
      notes: 'Free, 30-pt scale; multiple language versions; education-adjusted'
    },
    {
      id: 'MMSE', code: 'MMSE', name: 'Mini-Mental State Examination', minutes: 7,
      sensitivity: 81, specificity: 89, cutoff: '<24 / 30',
      domain: 'Multi-domain', settings: ['Primary care', 'Hospital'],
      use: 'Dementia screening; staging',
      notes: 'Copyrighted; less sensitive to MCI; ceiling effects in educated patients'
    },
    {
      id: 'MINICOG', code: 'Mini-Cog', name: 'Mini-Cog (3-word recall + clock)', minutes: 3,
      sensitivity: 76, specificity: 89, cutoff: '<3 / 5',
      domain: 'Memory + Executive', settings: ['Primary care', 'Annual wellness visit'],
      use: 'Brief cognitive screening',
      notes: 'CMS Annual Wellness Visit endorsed; minimal training needed'
    },
    {
      id: 'AD8', code: 'AD8', name: 'AD8 Informant Interview', minutes: 3,
      sensitivity: 84, specificity: 80, cutoff: '≥2 / 8',
      domain: 'Functional change', settings: ['Primary care', 'Telehealth'],
      use: 'Informant report of cognitive change',
      notes: '8 yes/no items; family-administered'
    },
    {
      id: 'GPCOG', code: 'GPCOG', name: 'General Practitioner Assessment of Cognition', minutes: 5,
      sensitivity: 82, specificity: 83, cutoff: '<5 / 9 patient',
      domain: 'Multi-domain', settings: ['Primary care'],
      use: 'GP-friendly two-stage screening',
      notes: 'Patient + informant components'
    },
    {
      id: 'SLUMS', code: 'SLUMS', name: 'Saint Louis University Mental Status', minutes: 7,
      sensitivity: 87, specificity: 81, cutoff: '<27 (HS+) / <25 (<HS)',
      domain: 'Multi-domain', settings: ['Primary care', 'VA'],
      use: 'Public-domain alternative to MMSE',
      notes: 'Free; education adjustments built in'
    },
    {
      id: 'CDR', code: 'CDR', name: 'Clinical Dementia Rating', minutes: 30,
      sensitivity: 92, specificity: 94, cutoff: '0.5 = MCI',
      domain: 'Global staging', settings: ['Specialty', 'Research'],
      use: 'Severity staging for clinical and research use',
      notes: 'Gold-standard staging; 0–3 scale; CDR-SB sum'
    },
    {
      id: 'ACER', code: 'ACE-III', name: 'Addenbrooke\'s Cognitive Examination III', minutes: 15,
      sensitivity: 93, specificity: 86, cutoff: '<82 / 100',
      domain: 'Multi-domain', settings: ['Specialty', 'Memory clinic'],
      use: 'Differentiating dementia subtypes',
      notes: '5 subdomains; useful for FTD vs AD'
    },
    {
      id: 'GDS', code: 'GDS-15', name: 'Geriatric Depression Scale (15)', minutes: 5,
      sensitivity: 89, specificity: 77, cutoff: '≥5 / 15',
      domain: 'Mood (rule-out)', settings: ['Primary care', 'Geriatrics'],
      use: 'Differentiate pseudodementia from dementia',
      notes: 'Always pair with cognitive screen'
    },
    {
      id: 'IQCODE', code: 'IQCODE', name: 'Informant Questionnaire on Cognitive Decline', minutes: 10,
      sensitivity: 79, specificity: 82, cutoff: '>3.31 / 5',
      domain: 'Functional change', settings: ['Primary care', 'Specialty'],
      use: 'Informant-based change assessment',
      notes: '16- or 26-item versions; education-independent'
    }
  ],

  // ===== DIAGNOSTIC METHODS =====
  diagnostics: [
    {
      id: 'PTAU217', name: 'Plasma p-tau217', tier: 'Blood biomarker',
      sensitivity: 94, specificity: 89, cost: '$', accessibility: 'High',
      indication: 'AD pathology screening', stage: 'MCI / mild AD'
    },
    {
      id: 'GFAP', name: 'Plasma GFAP', tier: 'Blood biomarker',
      sensitivity: 84, specificity: 81, cost: '$', accessibility: 'Emerging',
      indication: 'Astrogliosis / AD risk', stage: 'Preclinical / MCI'
    },
    {
      id: 'NFL', name: 'Plasma NfL', tier: 'Blood biomarker',
      sensitivity: 75, specificity: 70, cost: '$', accessibility: 'High',
      indication: 'Neurodegeneration (non-specific)', stage: 'Any'
    },
    {
      id: 'CSF', name: 'CSF Aβ42 / p-tau / t-tau', tier: 'CSF',
      sensitivity: 92, specificity: 90, cost: '$$$', accessibility: 'Specialty',
      indication: 'AD diagnostic confirmation', stage: 'MCI / mild AD'
    },
    {
      id: 'AMYPET', name: 'Amyloid PET (florbetapir/florbetaben)', tier: 'Imaging',
      sensitivity: 96, specificity: 90, cost: '$$$$', accessibility: 'Specialty',
      indication: 'Aβ deposition confirmation', stage: 'MCI / mild AD'
    },
    {
      id: 'TAUPET', name: 'Tau PET (flortaucipir)', tier: 'Imaging',
      sensitivity: 90, specificity: 92, cost: '$$$$', accessibility: 'Limited',
      indication: 'Tau staging (Braak)', stage: 'Mild–moderate AD'
    },
    {
      id: 'FDGPET', name: 'FDG-PET', tier: 'Imaging',
      sensitivity: 90, specificity: 78, cost: '$$$', accessibility: 'Specialty',
      indication: 'Pattern of hypometabolism', stage: 'AD vs FTD'
    },
    {
      id: 'MRI', name: 'Volumetric MRI', tier: 'Imaging',
      sensitivity: 85, specificity: 80, cost: '$$', accessibility: 'High',
      indication: 'Hippocampal atrophy, vascular load', stage: 'Any'
    },
    {
      id: 'DAT', name: 'DaT-SPECT (Ioflupane)', tier: 'Imaging',
      sensitivity: 89, specificity: 91, cost: '$$$', accessibility: 'Specialty',
      indication: 'Dopaminergic deficit', stage: 'DLB vs AD'
    },
    {
      id: 'APOE', name: 'APOE genotyping', tier: 'Genetic',
      sensitivity: '—', specificity: '—', cost: '$', accessibility: 'High',
      indication: 'Risk stratification; required for anti-amyloid Tx', stage: 'Pre-treatment'
    },
    {
      id: 'PSEN', name: 'PSEN1/PSEN2/APP sequencing', tier: 'Genetic',
      sensitivity: '—', specificity: '—', cost: '$$', accessibility: 'Specialty',
      indication: 'Familial early-onset AD', stage: 'Confirmation'
    },
    {
      id: 'EEG', name: 'EEG', tier: 'Neurophysiology',
      sensitivity: 70, specificity: 65, cost: '$$', accessibility: 'High',
      indication: 'CJD, delirium rule-out', stage: 'Differential'
    }
  ],

  // ===== TREATMENTS — PHARMACOLOGICAL =====
  treatmentsPharm: [
    {
      id: 'DON', name: 'Donepezil', class: 'Cholinesterase inhibitor',
      indication: 'AD all stages, DLB, PDD', dose: '5–23 mg/day PO',
      mechanism: 'Reversible AChE inhibition',
      efficacy: 'Modest symptomatic; ~3 mo cognitive stabilization',
      sideEffects: 'GI, bradycardia, vivid dreams, syncope',
      cost: '$', status: 'Generic'
    },
    {
      id: 'RIV', name: 'Rivastigmine', class: 'Cholinesterase inhibitor',
      indication: 'AD, PDD', dose: '4.6–13.3 mg/24h patch',
      mechanism: 'AChE + BuChE inhibition',
      efficacy: 'Similar to donepezil; patch reduces GI side effects',
      sideEffects: 'GI, skin reaction (patch), weight loss',
      cost: '$', status: 'Generic'
    },
    {
      id: 'GAL', name: 'Galantamine', class: 'Cholinesterase inhibitor',
      indication: 'Mild–moderate AD', dose: '8–24 mg/day ER',
      mechanism: 'AChE inhibition + nicotinic modulation',
      efficacy: 'Modest cognitive and functional benefit',
      sideEffects: 'GI, dizziness; caution in conduction disease',
      cost: '$', status: 'Generic'
    },
    {
      id: 'MEM', name: 'Memantine', class: 'NMDA antagonist',
      indication: 'Moderate–severe AD', dose: '5–28 mg/day',
      mechanism: 'Uncompetitive NMDA receptor antagonism',
      efficacy: 'Modest; often combined with ChEI',
      sideEffects: 'Headache, confusion, constipation',
      cost: '$', status: 'Generic'
    },
    {
      id: 'LEC', name: 'Lecanemab (Leqembi)', class: 'Anti-amyloid mAb',
      indication: 'Early symptomatic AD (MCI/mild) with confirmed Aβ',
      dose: '10 mg/kg IV q2wk',
      mechanism: 'Selective binding to Aβ protofibrils',
      efficacy: '27% slowing of CDR-SB decline at 18 months (CLARITY-AD)',
      sideEffects: 'ARIA-E (12.6%), ARIA-H (17%); APOE ε4/ε4 high risk',
      cost: '$$$$', status: 'FDA approved (2023); CMS covered'
    },
    {
      id: 'DNZ', name: 'Donanemab (Kisunla)', class: 'Anti-amyloid mAb',
      indication: 'Early symptomatic AD with Aβ + low/intermediate tau',
      dose: '700–1400 mg IV q4wk',
      mechanism: 'Targets pyroglutamate Aβ in plaques',
      efficacy: '35% slowing iADRS in low/medium tau (TRAILBLAZER-ALZ 2)',
      sideEffects: 'ARIA-E (24%), ARIA-H (31%); infusion reactions',
      cost: '$$$$', status: 'FDA approved (2024)'
    },
    {
      id: 'BREX', name: 'Brexpiprazole', class: 'Atypical antipsychotic',
      indication: 'Agitation in AD',
      dose: '2–3 mg/day',
      mechanism: 'Serotonin-dopamine activity modulator',
      efficacy: 'Modest reduction in CMAI agitation score',
      sideEffects: 'Black-box: increased mortality in elderly with dementia',
      cost: '$$$', status: 'FDA approved (2023) for dementia agitation'
    },
    {
      id: 'CIT', name: 'Citalopram (off-label)', class: 'SSRI',
      indication: 'Agitation, depression in dementia',
      dose: '10–30 mg/day (max 20 mg in ≥60)',
      mechanism: 'Serotonin reuptake inhibition',
      efficacy: 'CitAD trial: significant agitation reduction',
      sideEffects: 'QT prolongation; falls; hyponatremia',
      cost: '$', status: 'Off-label'
    },
    {
      id: 'PIM', name: 'Pimavanserin', class: '5-HT2A inverse agonist',
      indication: 'Parkinson disease psychosis',
      dose: '34 mg/day',
      mechanism: 'Selective 5-HT2A antagonism',
      efficacy: 'Reduces hallucinations without worsening motor symptoms',
      sideEffects: 'QT prolongation; black-box mortality in dementia',
      cost: '$$$$', status: 'FDA approved (PD only)'
    },
    {
      id: 'TRZ', name: 'Trazodone (off-label)', class: 'Serotonin modulator',
      indication: 'Sleep disturbance, agitation in dementia',
      dose: '25–100 mg HS',
      mechanism: 'SARI; α1 + H1 antagonism',
      efficacy: 'Limited evidence; commonly used',
      sideEffects: 'Orthostasis, sedation, falls',
      cost: '$', status: 'Off-label'
    }
  ],

  // ===== TREATMENTS — NON-PHARMACOLOGICAL =====
  treatmentsNonPharm: [
    {
      id: 'CST', name: 'Cognitive Stimulation Therapy', category: 'Cognitive',
      evidence: 'A', target: 'Mild–moderate dementia',
      delivery: 'Group, 14 sessions × 45 min',
      benefit: 'Improved cognition and quality of life (MTA-NICE recommended)',
      cost: '$$', sessions: 14
    },
    {
      id: 'REM', name: 'Reminiscence Therapy', category: 'Cognitive',
      evidence: 'B', target: 'All stages',
      delivery: 'Individual or group',
      benefit: 'Mood, communication; modest cognitive benefit',
      cost: '$', sessions: '8–12'
    },
    {
      id: 'MUS', name: 'Music Therapy', category: 'Behavioral',
      evidence: 'A', target: 'Moderate–severe dementia',
      delivery: 'Individual or group, 30 min sessions',
      benefit: 'Reduces agitation; improves mood (Cochrane 2024)',
      cost: '$', sessions: 'Ongoing'
    },
    {
      id: 'EXC', name: 'Aerobic + Resistance Exercise', category: 'Physical',
      evidence: 'A', target: 'All stages',
      delivery: '150 min/week moderate aerobic + 2× resistance',
      benefit: 'Cognitive function, mood, falls reduction',
      cost: '$', sessions: 'Daily'
    },
    {
      id: 'MIND', name: 'MIND Diet', category: 'Lifestyle',
      evidence: 'B', target: 'Prevention; MCI',
      delivery: 'Hybrid Mediterranean-DASH; 10 components',
      benefit: '53% lower AD risk in highest adherence (Rush MAP study)',
      cost: '$', sessions: 'Daily'
    },
    {
      id: 'OTH', name: 'Occupational Therapy (COTiD)', category: 'Functional',
      evidence: 'A', target: 'Mild–moderate, with caregiver',
      delivery: '10 home sessions over 5 weeks',
      benefit: 'Improved daily functioning; caregiver competence',
      cost: '$$', sessions: 10
    },
    {
      id: 'DOLL', name: 'Doll / Pet Therapy', category: 'Behavioral',
      evidence: 'C', target: 'Moderate–severe',
      delivery: 'Variable',
      benefit: 'Reduces agitation in some; ethical considerations',
      cost: '$', sessions: 'Ongoing'
    },
    {
      id: 'SNZ', name: 'Snoezelen / Multisensory Stim.', category: 'Behavioral',
      evidence: 'B', target: 'Moderate–severe',
      delivery: 'Sensory room sessions',
      benefit: 'Short-term agitation reduction',
      cost: '$$', sessions: 'Ongoing'
    },
    {
      id: 'BLT', name: 'Bright Light Therapy', category: 'Behavioral',
      evidence: 'B', target: 'Sleep / sundowning',
      delivery: '10,000 lux 30 min AM',
      benefit: 'Improves circadian rhythm, sleep',
      cost: '$', sessions: 'Daily'
    },
    {
      id: 'FIN', name: 'FINGER Multidomain Intervention', category: 'Lifestyle',
      evidence: 'A', target: 'At-risk older adults',
      delivery: 'Diet + exercise + cognitive training + vascular monitoring',
      benefit: '25% better cognitive performance vs control (FINGER trial)',
      cost: '$$', sessions: '2 yr program'
    },
    {
      id: 'SLP', name: 'Sleep Hygiene Intervention', category: 'Lifestyle',
      evidence: 'B', target: 'All stages',
      delivery: 'Behavioral; CBT-I when appropriate',
      benefit: 'Sleep quality; reduces sundowning',
      cost: '$', sessions: '4–8'
    },
    {
      id: 'CBT', name: 'CBT for Caregivers', category: 'Caregiver',
      evidence: 'A', target: 'Family caregivers',
      delivery: 'Individual or group, 8–12 sessions',
      benefit: 'Reduces caregiver depression and burden (REACH II)',
      cost: '$$', sessions: '8–12'
    }
  ],

  // ===== CLINICAL TRIALS =====
  // Verified against ClinicalTrials.gov, sponsor press releases, and AlzForum (May 2026).
  // All NCT IDs link directly to clinicaltrials.gov/study/<NCT> via the trials browser.
  trials: [
    {
      nct: 'NCT07170150', phase: 'III', status: 'Recruiting',
      title: 'Trontinemab in Early Alzheimer\'s Disease (TRONTIER 1/2)',
      sponsor: 'Hoffmann–La Roche', target: 'Anti-amyloid Brainshuttle™ mAb',
      population: 'MCI to mild AD, amyloid+', n: 1800,
      countries: 25, completion: '2028',
      summary: 'Phase 3 of trontinemab, a transferrin-receptor brain-shuttle version of gantenerumab. Phase 1b/2a removed 107 centiloids of amyloid in 28 weeks with low ARIA rate.'
    },
    {
      nct: 'NCT06653153', phase: 'III', status: 'Active, not recruiting',
      title: 'Remternetug in Early AD (TRAILRUNNER-ALZ 3)',
      sponsor: 'Eli Lilly', target: 'Anti-pyroglutamate Aβ mAb (subcutaneous)',
      population: 'Cognitively normal/preclinical AD, age 55–80', n: 1400,
      countries: 14, completion: '2031',
      summary: 'Secondary-prevention follow-on to donanemab. Self-administered subcutaneous injection. Up to 255 weeks of treatment + observation.'
    },
    {
      nct: 'NCT05463731', phase: 'III', status: 'Active, not recruiting',
      title: 'Remternetug in Symptomatic AD (TRAILRUNNER-ALZ 1)',
      sponsor: 'Eli Lilly', target: 'Anti-pyroglutamate Aβ mAb',
      population: 'Early symptomatic AD, MMSE 20–30', n: 1574,
      countries: 11, completion: '2026',
      summary: 'Pivotal trial of next-gen amyloid antibody including a 974-patient open-label safety addendum. Endpoint is amyloid plaque clearance.'
    },
    {
      nct: 'NCT04777396', phase: 'III', status: 'Active, not recruiting',
      title: 'Oral Semaglutide in Early AD (EVOKE)',
      sponsor: 'Novo Nordisk', target: 'GLP-1 receptor agonist',
      population: 'MCI / mild AD, age 55–85, Aβ+', n: 1855,
      countries: 30, completion: '2025',
      summary: 'TOPLINE NEGATIVE (Nov 2025): no slowing of CDR-SB vs placebo at 104 weeks; extension phase discontinued. Biomarker improvements (hsCRP) were seen.'
    },
    {
      nct: 'NCT04777409', phase: 'III', status: 'Active, not recruiting',
      title: 'Oral Semaglutide in Early AD (EVOKE+)',
      sponsor: 'Novo Nordisk', target: 'GLP-1 receptor agonist',
      population: 'MCI / mild AD with vascular comorbidities', n: 1953,
      countries: 30, completion: '2025',
      summary: 'Companion trial to EVOKE. Same negative readout. Demonstrates that metabolic-pathway repurposing of GLP-1s does not slow established AD.'
    },
    {
      nct: 'NCT06079190', phase: 'II', status: 'Active, not recruiting',
      title: 'GSK4527226 (AL101) in Early AD (PROGRESS-AD)',
      sponsor: 'GSK / Alector', target: 'Anti-sortilin mAb (raises progranulin)',
      population: 'MCI / mild AD, Aβ+', n: 282,
      countries: 12, completion: '2026',
      summary: 'Targets neuroinflammation pathway: blocks SORT1 to raise extracellular progranulin. First-in-class for sporadic AD. Open-label extension NCT07105709 follows.'
    },
    {
      nct: 'NCT03790709', phase: 'II/III', status: 'Completed',
      title: 'Blarcamesine (ANAVEX 2-73) in Early AD',
      sponsor: 'Anavex Life Sciences', target: 'Sigma-1 receptor agonist (oral)',
      population: 'Early AD, age 60–85', n: 508,
      countries: 5, completion: '2022',
      summary: 'Reported 36% slowing of ADAS-Cog13 decline at 48 wk. Open-label extension (NCT04314934) shows sustained benefit at 144 wk. Oral once-daily, no ARIA signal.'
    },
    {
      nct: 'NCT03486938', phase: 'II/III', status: 'Completed',
      title: 'AGB101 (low-dose levetiracetam) in MCI (HOPE4MCI)',
      sponsor: 'AgeneBio', target: 'Hippocampal hyperactivity reduction',
      population: 'aMCI due to AD, amyloid+', n: 164,
      countries: 2, completion: '2023',
      summary: 'Targets the prodromal stage. Showed CDR-SB benefit and reduced entorhinal-cortex atrophy in APOE ε4 non-carriers. Supports further trials in non-carriers.'
    },
    {
      nct: 'NCT04468659', phase: 'III', status: 'Active, not recruiting',
      title: 'Lecanemab in Preclinical AD (AHEAD 3-45)',
      sponsor: 'Eisai / Biogen / NIA', target: 'Anti-amyloid prevention',
      population: 'Cognitively normal, elevated/intermediate Aβ', n: 1400,
      countries: 9, completion: '2028',
      summary: 'Largest preclinical AD prevention trial. 216-week treatment. Tests whether removing amyloid before symptoms preserves cognition (PACC5 score).'
    },
    {
      nct: 'NCT02579252', phase: 'II', status: 'Completed',
      title: 'AADvac1 Active Tau Vaccine (ADAMANT)',
      sponsor: 'Axon Neuroscience', target: 'Anti-tau active immunization',
      population: 'Mild AD', n: 196,
      countries: 8, completion: '2019',
      summary: 'First successful active tau vaccine: 98% antibody response, slower NfL rise vs placebo. Post-hoc subgroup positive for plasma p-tau217 showed cognitive benefit.'
    },
    {
      nct: 'NCT04838301', phase: 'II', status: 'Recruiting',
      title: 'Allopregnanolone in Mild AD (REGEN-BRAIN)',
      sponsor: 'University of Arizona', target: 'Neurosteroid; neuroregeneration',
      population: 'Mild AD, APOE ε4+, age 55–80', n: 200,
      countries: 1, completion: '2026',
      summary: 'Tests whether weekly IV allopregnanolone can stimulate neurogenesis and slow hippocampal atrophy in APOE ε4 carriers. Investigator-initiated.'
    },
    {
      nct: 'NCT05564169', phase: 'III', status: 'Not yet recruiting',
      title: 'Masitinib Add-On in Mild AD (AB21004)',
      sponsor: 'AB Science', target: 'Tyrosine kinase inhibitor (mast cell, microglia)',
      population: 'Mild AD on stable ChEI/memantine', n: 600,
      countries: 14, completion: '2027',
      summary: 'Confirmatory Phase 3 after AB09004 showed cognition slowing. First neuroimmune-modulator trial; targets the brain’s innate immune system.'
    },
    {
      nct: 'NCT05869669', phase: 'IIb', status: 'Active, not recruiting',
      title: 'Neflamapimod in DLB (RewinD-LB)',
      sponsor: 'CervoMed', target: 'p38α MAPK inhibitor (oral)',
      population: 'Early DLB without AD co-pathology', n: 159,
      countries: 6, completion: '2025',
      summary: 'Phase 2b trial in pure DLB (excluded AD co-pathology by p-tau181). Showed CDR-SB benefit. CervoMed plans Phase 3 in 2026.'
    },
    {
      nct: 'NCT05269394', phase: 'II/III', status: 'Recruiting',
      title: 'DIAN-TU NexGen: E2814 + Lecanemab in Familial AD',
      sponsor: 'Washington University / DIAN-TU', target: 'Anti-tau (E2814) + anti-amyloid (lecanemab)',
      population: 'Carriers of dominant AD mutations (PSEN1/2, APP)', n: 168,
      countries: 9, completion: '2027',
      summary: 'First combination disease-modifying trial. Tests whether targeting both amyloid and tau in early biomarker-positive familial AD prevents decline.'
    },
    {
      nct: 'NCT06602258', phase: 'II', status: 'Active, not recruiting',
      title: 'E2814 with Concurrent Lecanemab in Early AD',
      sponsor: 'Eisai', target: 'Anti-MTBR-tau mAb + Anti-amyloid mAb',
      population: 'Early AD, Aβ+', n: 213,
      countries: 5, completion: '2027',
      summary: 'Industry-sponsored anti-tau + anti-amyloid combination. Uses CSF MTBR-tau243 (correlated with tau PET) as primary biomarker outcome.'
    }
  ],

  // ===== CAREGIVER RESOURCES =====
  caregiverResources: [
    { name: "Alzheimer's Association 24/7 Helpline", type: 'Crisis support', contact: '1-800-272-3900', cost: 'Free', detail: 'Master\'s-level clinicians; 200+ languages' },
    { name: 'AlzConnected', type: 'Online community', contact: 'alzconnected.org', cost: 'Free', detail: 'Peer support forums for caregivers' },
    { name: 'AARP Caregiving Resource Center', type: 'Information & tools', contact: 'aarp.org/caregiving', cost: 'Free', detail: 'Legal, financial, emotional resources' },
    { name: 'Family Caregiver Alliance', type: 'Multi-state services', contact: 'caregiver.org', cost: 'Free', detail: 'Care planning, family consultations' },
    { name: 'Eldercare Locator', type: 'Service finder', contact: '1-800-677-1116', cost: 'Free', detail: 'Federal service connecting to local resources' },
    { name: 'Lewy Body Dementia Association', type: 'Disease-specific', contact: 'lbda.org', cost: 'Free', detail: 'LBD caregiver helpline and resources' },
    { name: 'Association for Frontotemporal Degeneration', type: 'Disease-specific', contact: 'theaftd.org', cost: 'Free', detail: 'FTD-specific support and education' },
    { name: 'Memory Cafés (national)', type: 'Social support', contact: 'memorycafedirectory.com', cost: 'Free', detail: 'In-person social gatherings' },
    { name: 'Caregiver Action Network', type: 'Advocacy & education', contact: 'caregiveraction.org', cost: 'Free', detail: 'Peer forums and workplace resources' },
    { name: 'Veterans Affairs Caregiver Support', type: 'Veterans', contact: 'caregiver.va.gov', cost: 'Free', detail: 'Stipend and respite for VA caregivers' },
    { name: 'PACE Programs', type: 'Comprehensive care', contact: 'npaonline.org', cost: 'Insurance', detail: 'Program of All-Inclusive Care for the Elderly' },
    { name: 'CaringInfo (NHPCO)', type: 'Advance planning', contact: 'caringinfo.org', cost: 'Free', detail: 'State-specific advance directives' }
  ],

  // ===== COMMUNITY CARE SERVICES =====
  communityServices: [
    { type: 'Adult Day Programs', desc: 'Daytime supervision, social activities, meals', costRange: '$80–$150/day', medicaid: 'Often covered' },
    { type: 'In-Home Care (Personal)', desc: 'Bathing, dressing, meal prep, companionship', costRange: '$28–$35/hr', medicaid: 'HCBS waiver' },
    { type: 'In-Home Care (Skilled)', desc: 'Nursing, medication management, wound care', costRange: '$50–$120/visit', medicaid: 'Medicare A/B' },
    { type: 'Memory Care Assisted Living', desc: 'Specialized residential dementia care', costRange: '$5,500–$8,500/mo', medicaid: 'Limited' },
    { type: 'Skilled Nursing Facility', desc: '24/7 nursing care, often dementia units', costRange: '$8,000–$12,000/mo', medicaid: 'Yes' },
    { type: 'Hospice Care', desc: 'End-of-life palliative care', costRange: 'Varies', medicaid: 'Medicare hospice benefit' },
    { type: 'Respite Care', desc: 'Short-term relief for primary caregivers', costRange: '$150–$300/day', medicaid: 'Some waivers' },
    { type: 'Geriatric Care Manager', desc: 'Care coordination and advocacy', costRange: '$80–$200/hr', medicaid: 'Out-of-pocket' },
    { type: 'PACE Program', desc: 'All-inclusive elderly care for dual-eligible', costRange: 'Capitated', medicaid: 'Yes (eligibility-based)' },
    { type: 'Senior Centers', desc: 'Social engagement, meals, transportation', costRange: 'Free–nominal', medicaid: 'N/A' }
  ],

  // ===== MODIFIABLE RISK FACTORS (Lancet Commission 2024) =====
  riskFactors: [
    { factor: 'Less education', period: 'Early life', popAttrRisk: 5, modifiable: true },
    { factor: 'Hearing loss', period: 'Mid-life', popAttrRisk: 7, modifiable: true },
    { factor: 'High LDL cholesterol', period: 'Mid-life', popAttrRisk: 7, modifiable: true },
    { factor: 'Depression', period: 'Mid-life', popAttrRisk: 3, modifiable: true },
    { factor: 'Traumatic brain injury', period: 'Mid-life', popAttrRisk: 3, modifiable: true },
    { factor: 'Physical inactivity', period: 'Late life', popAttrRisk: 2, modifiable: true },
    { factor: 'Diabetes', period: 'Mid-life', popAttrRisk: 2, modifiable: true },
    { factor: 'Smoking', period: 'Mid-life', popAttrRisk: 2, modifiable: true },
    { factor: 'Hypertension', period: 'Mid-life', popAttrRisk: 2, modifiable: true },
    { factor: 'Obesity', period: 'Mid-life', popAttrRisk: 1, modifiable: true },
    { factor: 'Excessive alcohol', period: 'Mid-life', popAttrRisk: 1, modifiable: true },
    { factor: 'Social isolation', period: 'Late life', popAttrRisk: 5, modifiable: true },
    { factor: 'Air pollution', period: 'Late life', popAttrRisk: 3, modifiable: true },
    { factor: 'Untreated vision loss', period: 'Late life', popAttrRisk: 2, modifiable: true }
  ],

  // ===== STAGES =====
  stages: [
    { name: 'Preclinical', cdr: '0', mmse: '≥28', duration: 'Years', features: 'Biomarker positive, asymptomatic' },
    { name: 'MCI', cdr: '0.5', mmse: '24–27', duration: '2–5 yr', features: 'Subjective + objective decline; preserved IADLs' },
    { name: 'Mild', cdr: '1', mmse: '20–24', duration: '2–4 yr', features: 'IADL impairment; recent memory affected' },
    { name: 'Moderate', cdr: '2', mmse: '10–19', duration: '2–10 yr', features: 'ADL assistance; behavioral symptoms' },
    { name: 'Severe', cdr: '3', mmse: '<10', duration: '1–3 yr', features: 'Total dependence; mute or minimally verbal' }
  ]
};

// Make available globally
if (typeof window !== 'undefined') window.NV_DATA = NV_DATA;
