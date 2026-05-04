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

  // ===== TICKER ITEMS =====
  ticker: [
    { label: 'AD prevalence US', value: '6.9M', delta: '+200K YoY', dir: 'down' },
    { label: 'Lecanemab uptake', value: '+18%', delta: 'Q4', dir: 'up' },
    { label: 'Active trials', value: '1,247', delta: '+34', dir: 'up' },
    { label: 'Caregivers US', value: '11.5M', delta: '18B hrs', dir: 'down' },
    { label: 'p-tau217 sens.', value: '94%', delta: 'Mayo', dir: 'up' },
    { label: 'Global cost', value: '$1.3T', delta: '2030 proj', dir: 'down' },
    { label: 'MoCA cutoff', value: '<26', delta: 'MCI', dir: 'up' },
    { label: 'Donanemab Δ', value: '-35%', delta: 'CDR-SB', dir: 'up' },
    { label: 'APOE ε4 hetero', value: '3×', delta: 'risk', dir: 'down' },
    { label: 'Onset early', value: '<65', delta: '5-6%', dir: 'up' },
    { label: 'Modifiable risk', value: '45%', delta: 'Lancet 2024', dir: 'up' }
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
  news: [
    { time: '08:42', title: 'Phase 3 readout: experimental anti-tau antibody shows 27% slowing on CDR-SB at 18 months', source: 'NEJM', cat: 'Trials', tag: 'AD' },
    { time: '08:15', title: 'FDA expands p-tau217 blood test approval for primary care screening pathway', source: 'FDA', cat: 'Regulatory', tag: 'Diagnostics' },
    { time: '07:58', title: 'CMS finalizes coverage decision for amyloid PET imaging in dementia workup', source: 'CMS', cat: 'Policy', tag: 'Imaging' },
    { time: '07:30', title: 'Lancet Commission updates: 14 modifiable risk factors now identified, vision and cholesterol added', source: 'The Lancet', cat: 'Research', tag: 'Prevention' },
    { time: '06:45', title: 'Donanemab real-world data: 6-month cognitive stabilization in 41% of mild AD cohort', source: 'JAMA Neurology', cat: 'Treatment', tag: 'AD' },
    { time: 'Yesterday', title: 'NIA-AA biomarker framework revision: ATN(I) now includes inflammation marker GFAP', source: 'Alz & Dementia', cat: 'Research', tag: 'Biomarkers' },
    { time: 'Yesterday', title: 'Memory care unit shortage: 35% of US counties lack dedicated facilities, new HRSA report', source: 'HRSA', cat: 'Care', tag: 'Access' },
    { time: 'Yesterday', title: 'GLP-1 receptor agonists associated with 12% lower dementia risk in T2DM cohort', source: 'BMJ', cat: 'Research', tag: 'Prevention' },
    { time: '2d ago', title: 'Music-based intervention reduces agitation in moderate AD: meta-analysis of 22 RCTs', source: 'Cochrane', cat: 'Care', tag: 'Non-Pharm' },
    { time: '2d ago', title: 'Genetic counseling demand surges 40% after at-home APOE testing kit launches', source: 'Nature', cat: 'Genetics', tag: 'APOE' },
    { time: '3d ago', title: 'Lewy body diagnostic skin biopsy receives CE mark for European clinical use', source: 'Reuters Health', cat: 'Diagnostics', tag: 'DLB' },
    { time: '3d ago', title: 'Aducanumab fully discontinued by Biogen; surviving trial participants transitioned', source: 'STAT', cat: 'Treatment', tag: 'AD' },
    { time: '4d ago', title: 'Sleep duration <6 hrs in midlife linked to 30% higher dementia risk: 25-year cohort', source: 'Nature Aging', cat: 'Research', tag: 'Sleep' },
    { time: '4d ago', title: 'Caregiver burnout intervention: respite vouchers cut nursing home placement 22%', source: 'JAGS', cat: 'Caregiving', tag: 'Policy' }
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

  // ===== CLINICAL TRIALS (representative; based on public trial registries) =====
  trials: [
    {
      nct: 'NCT05108922', phase: 'III', status: 'Recruiting',
      title: 'Trontinemab in Early Alzheimer\'s Disease',
      sponsor: 'Roche/Genentech', target: 'Brain shuttle anti-Aβ',
      population: 'Early symptomatic AD, Aβ+', n: 1800,
      countries: 25, completion: '2027'
    },
    {
      nct: 'NCT05483868', phase: 'III', status: 'Recruiting',
      title: 'Remternetug in Early Symptomatic AD',
      sponsor: 'Eli Lilly', target: 'Anti-amyloid mAb (next-gen)',
      population: 'MCI–mild AD with Aβ', n: 700,
      countries: 14, completion: '2026'
    },
    {
      nct: 'NCT04437511', phase: 'II', status: 'Active, not recruiting',
      title: 'AADvac1 Active Tau Vaccine',
      sponsor: 'Axon Neuroscience', target: 'Anti-tau active immunization',
      population: 'Mild AD', n: 208,
      countries: 7, completion: '2025'
    },
    {
      nct: 'NCT04619420', phase: 'III', status: 'Recruiting',
      title: 'Semaglutide in AD (EVOKE / EVOKE+)',
      sponsor: 'Novo Nordisk', target: 'GLP-1 receptor agonist',
      population: 'Early AD', n: 3680,
      countries: 38, completion: '2025'
    },
    {
      nct: 'NCT05696483', phase: 'II', status: 'Recruiting',
      title: 'GSK4527226 (anti-Aβ vaccine)',
      sponsor: 'GSK', target: 'Aβ active immunization',
      population: 'Early AD', n: 220,
      countries: 6, completion: '2026'
    },
    {
      nct: 'NCT04777396', phase: 'III', status: 'Recruiting',
      title: 'Blarcamesine (ANAVEX 2-73)',
      sponsor: 'Anavex Life Sciences', target: 'Sigma-1 receptor agonist',
      population: 'Early AD', n: 450,
      countries: 12, completion: '2026'
    },
    {
      nct: 'NCT05130957', phase: 'II', status: 'Recruiting',
      title: 'Ion Channel Modulator AGB101',
      sponsor: 'AgeneBio', target: 'Levetiracetam low-dose',
      population: 'MCI', n: 830,
      countries: 8, completion: '2025'
    },
    {
      nct: 'NCT05552157', phase: 'III', status: 'Active',
      title: 'AHEAD 3-45: Lecanemab in Preclinical AD',
      sponsor: 'Eisai/NIA', target: 'Anti-amyloid prevention',
      population: 'Cognitively normal, elevated Aβ', n: 1400,
      countries: 9, completion: '2027'
    },
    {
      nct: 'NCT04619420', phase: 'III', status: 'Recruiting',
      title: 'Edaravone in Mild AD',
      sponsor: 'MT Pharma', target: 'Free radical scavenger',
      population: 'Mild AD', n: 480,
      countries: 4, completion: '2026'
    },
    {
      nct: 'NCT05328453', phase: 'II', status: 'Recruiting',
      title: 'Allopregnanolone for AD',
      sponsor: 'USC', target: 'Neurosteroid; neurogenesis',
      population: 'Mild–moderate AD', n: 200,
      countries: 1, completion: '2025'
    },
    {
      nct: 'NCT04693520', phase: 'III', status: 'Active',
      title: 'Masitinib in Mild–Moderate AD',
      sponsor: 'AB Science', target: 'Tyrosine kinase inhibitor',
      population: 'Mild–moderate AD', n: 600,
      countries: 14, completion: '2025'
    },
    {
      nct: 'NCT05399746', phase: 'III', status: 'Recruiting',
      title: 'Neflamapimod in DLB',
      sponsor: 'CervoMed', target: 'p38α MAPK inhibitor',
      population: 'Dementia with Lewy Bodies', n: 160,
      countries: 6, completion: '2025'
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
