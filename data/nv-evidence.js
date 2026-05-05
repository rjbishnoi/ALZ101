/* ============================================
   NeuroViz — Evidence Knowledge Base
   ============================================
   Curated, citation-backed answers to common dementia questions.
   Each entry has:
     id        — short slug
     keywords  — terms that match this answer (lowercased substrings)
     question  — canonical phrasing of the question
     answer    — concise paragraph answer (always paraphrased; never
                 verbatim from sources)
     citations — array of { source, url } for reader follow-up
     audience  — array of audiences this is calibrated for
                 ('phys' | 'pat' | 'care' | 'all')

   Sources are limited to peer-reviewed journals, FDA/CMS releases,
   society guidelines, and major non-profits. All answers are
   paraphrased in NeuroViz's own words; no source text is reproduced.
   ============================================ */

const NV_EVIDENCE = [

  // -------- DIAGNOSIS / BIOMARKERS --------
  {
    id: 'ptau217-vs-csf',
    keywords: ['p-tau217', 'ptau217', 'plasma p-tau', 'blood test alzheimer', 'csf vs blood', 'biomarker'],
    question: 'When should I order plasma p-tau217 vs CSF biomarkers in suspected AD?',
    audience: ['phys', 'all'],
    answer:
      'Plasma p-tau217 is now the recommended first-line biomarker test in patients with cognitive symptoms suggestive of Alzheimer disease. It has shown 90–94% concordance with amyloid PET and CSF Aβ42/40 in cognitively impaired adults, and it is far less invasive and far less costly. Reserve CSF biomarkers for cases where plasma p-tau217 is intermediate or discordant with the clinical picture, or when ruling out non-AD causes (e.g., suspicion of CJD with 14-3-3 / RT-QuIC, or autoimmune encephalitis). Amyloid PET is generally indicated only if it would change management — for instance, before initiating an anti-amyloid antibody.',
    citations: [
      { source: 'Alzheimer\'s Association 2024 revised criteria', url: 'https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/alz.13859' },
      { source: 'Mayo Clinic ALZpath plasma p-tau217 study (JAMA Neurol 2024)', url: 'https://jamanetwork.com/journals/jamaneurology/fullarticle/2814751' }
    ]
  },

  {
    id: 'lecanemab-eligibility',
    keywords: ['lecanemab', 'leqembi', 'who can take lecanemab', 'anti-amyloid eligibility', 'aria'],
    question: 'Who is a candidate for lecanemab, and what monitoring is required?',
    audience: ['phys', 'pat', 'all'],
    answer:
      'Lecanemab (Leqembi) is FDA-approved for early symptomatic Alzheimer disease — defined as MCI or mild-stage AD with biomarker-confirmed amyloid (PET or CSF). Eligible patients should have an MMSE ≥22, no contraindications to MRI, and not be on therapeutic anticoagulation (apixaban, warfarin, etc.) because of bleeding risk. APOE ε4 homozygotes have substantially higher ARIA risk and require pre-treatment counseling — many guidelines now recommend genotyping before initiation. Required MRI surveillance: baseline, then before infusion #5, #7, and #14, plus any time symptoms suggest ARIA (headache, confusion, visual changes, focal neuro signs). Symptomatic ARIA requires immediate suspension and neurology consult.',
    citations: [
      { source: 'FDA prescribing information (Leqembi)', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/761269s000lbl.pdf' },
      { source: 'CLARITY-AD trial (NEJM 2023)', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2212948' },
      { source: 'AAN Quality Improvement Workgroup ARIA guidance', url: 'https://www.alzforum.org/news/community-news/anti-amyloid-monoclonal-antibody-prescribing-guidelines-released' }
    ]
  },

  {
    id: 'aria-monitoring',
    keywords: ['aria', 'aria-e', 'aria-h', 'amyloid related imaging', 'monitoring lecanemab'],
    question: 'What is ARIA and how do I recognize and manage it?',
    audience: ['phys', 'all'],
    answer:
      'ARIA stands for amyloid-related imaging abnormalities and is a class effect of anti-amyloid antibodies. ARIA-E is vasogenic edema/effusion (T2/FLAIR hyperintensity, sulcal effacement); ARIA-H is microhemorrhage or superficial siderosis (susceptibility-weighted MRI). With lecanemab, ARIA-E occurs in ~13% (most asymptomatic), ARIA-H in ~17%; with donanemab, ARIA-E in ~24%. APOE ε4 homozygotes carry the highest risk. Mild asymptomatic radiographic ARIA usually allows continued dosing with closer surveillance; moderate or symptomatic ARIA requires holding the drug and repeating MRI in 4–8 weeks. Severe ARIA (mass effect, large hemorrhage, neurologic deterioration) generally means permanent discontinuation.',
    citations: [
      { source: 'AAN Quality Improvement Workgroup', url: 'https://www.alzforum.org/news/community-news/anti-amyloid-monoclonal-antibody-prescribing-guidelines-released' },
      { source: 'TRAILBLAZER-ALZ 2 (JAMA 2023)', url: 'https://jamanetwork.com/journals/jama/fullarticle/2807533' }
    ]
  },

  // -------- TREATMENT / PHARMACOLOGY --------
  {
    id: 'agitation-pharm',
    keywords: ['agitation', 'sundowning', 'behavioral symptoms', 'bpsd', 'aggression dementia'],
    question: 'How should agitation in dementia be managed?',
    audience: ['phys', 'care', 'all'],
    answer:
      'Non-pharmacological strategies should always be tried first. The DICE framework (Describe, Investigate, Create, Evaluate) is the gold-standard structured approach: identify triggers (pain, infection, constipation, sleep, environment, caregiver burnout), then deploy targeted non-drug interventions (music, structured activity, validation therapy, pet therapy). When pharmacotherapy is needed, brexpiprazole (Rexulti) was FDA-approved in 2023 specifically for AD-related agitation and is the first labelled option. Citalopram has trial evidence (CitAD), with caution for QT prolongation at doses >20 mg in older adults. First-generation antipsychotics carry an FDA boxed warning for increased mortality (1.6–1.7×) and should be avoided. Benzodiazepines worsen confusion and falls.',
    citations: [
      { source: 'Brexpiprazole approval (FDA 2023)', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-drug-treat-agitation-symptoms-associated-dementia-due-alzheimers-disease' },
      { source: 'Kales et al. — DICE framework (JAGS 2014)', url: 'https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.12730' },
      { source: 'CitAD trial (JAMA 2014)', url: 'https://jamanetwork.com/journals/jama/fullarticle/1828497' }
    ]
  },

  {
    id: 'cognitive-symptoms-tx',
    keywords: ['cognitive symptoms', 'memory drugs', 'donepezil', 'rivastigmine', 'galantamine', 'memantine', 'cholinesterase'],
    question: 'What is the standard pharmacologic management of cognitive symptoms?',
    audience: ['phys', 'pat', 'all'],
    answer:
      'Cholinesterase inhibitors (donepezil, rivastigmine, galantamine) are first-line for cognitive symptoms in mild-to-moderate AD, DLB, and PDD. They produce modest symptomatic improvement (3–6 months of cognitive stabilization on average). Memantine (an NMDA antagonist) is approved for moderate-to-severe AD and is often added to a cholinesterase inhibitor in this stage. None of these slows underlying neurodegeneration. Anti-amyloid antibodies (lecanemab, donanemab) are the first agents shown to slow disease progression and are reserved for biomarker-confirmed early AD. Rivastigmine has the most evidence for DLB and is the only ChEI with PDD on label. Notably, ChEIs should be avoided in pure FTD — they may worsen behavioral symptoms.',
    citations: [
      { source: 'AAN Practice Guideline — MCI', url: 'https://www.aan.com/Guidelines/home/GuidelineDetail/881' },
      { source: 'Cochrane review of ChEIs in dementia', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD005593.pub3/full' }
    ]
  },

  // -------- PREVENTION / RISK --------
  {
    id: 'modifiable-risk',
    keywords: ['prevention', 'modifiable risk', 'lancet commission', 'reduce risk', 'lifestyle dementia'],
    question: 'What lifestyle changes have the strongest evidence to reduce dementia risk?',
    audience: ['pat', 'care', 'all'],
    answer:
      'The 2024 Lancet Commission identified 14 modifiable risk factors that together could prevent or delay up to 45% of dementia worldwide. The strongest single contributors are: hearing loss in midlife (treat with hearing aids — the ACHIEVE trial 2023 showed a 48% reduction in 3-year cognitive decline in high-risk older adults), high LDL cholesterol, fewer years of formal education, social isolation, and depression. Other strong levers: regular aerobic and resistance exercise (≥150 minutes per week), adherence to the Mediterranean or MIND diet, treating high blood pressure and diabetes, avoiding head injury and excessive alcohol, addressing visual impairment, and treating obstructive sleep apnea.',
    citations: [
      { source: 'Lancet Commission 2024', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)01296-0/fulltext' },
      { source: 'ACHIEVE trial (Lancet 2023)', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01406-X/fulltext' },
      { source: 'FINGER trial (Lancet 2015)', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(15)60461-5/fulltext' }
    ]
  },

  {
    id: 'apoe-testing',
    keywords: ['apoe', 'apoe4', 'apoe e4', 'genetic testing alzheimer', 'genes dementia'],
    question: 'Should I get APOE ε4 genetic testing? What are the pros and cons?',
    audience: ['pat', 'all'],
    answer:
      'APOE ε4 status is the strongest known genetic risk factor for late-onset Alzheimer disease — one copy approximately triples lifetime risk, and two copies (homozygotes) raise it 10–15 fold. Reasons to consider testing: if you are being evaluated for an anti-amyloid antibody (homozygotes have much higher ARIA risk and most prescribers now genotype before initiating), if you are enrolling in a prevention trial, or if a strong family history is causing distress that a result would help resolve. Reasons to think twice: APOE testing is probabilistic (not deterministic — many ε4/ε4 carriers never develop dementia, and many people with no ε4 do), the result has no current clinical preventive intervention beyond standard lifestyle modification, and it may carry implications for life and long-term-care insurance (federal GINA does not cover those). Genetic counseling before and after testing is strongly recommended.',
    citations: [
      { source: 'NIA Genetics & AD overview', url: 'https://www.nia.nih.gov/health/alzheimers-causes-and-risk-factors/alzheimers-disease-genetics-fact-sheet' },
      { source: 'Liu et al. (Nature 2013)', url: 'https://www.nature.com/articles/nrneurol.2012.263' }
    ]
  },

  // -------- DIFFERENTIAL DIAGNOSIS --------
  {
    id: 'dlb-vs-pdd',
    keywords: ['dlb vs pdd', 'lewy body parkinson', 'differentiate dlb', 'parkinson dementia'],
    question: 'How do I differentiate DLB from Parkinson disease dementia clinically?',
    audience: ['phys', 'all'],
    answer:
      'The differentiator is timing — both are α-synucleinopathies sharing core features (Parkinsonism, REM sleep behavior disorder, fluctuating cognition, visual hallucinations, autonomic dysfunction). By convention, if cognitive impairment precedes Parkinsonism — or appears within 1 year of motor onset — the diagnosis is DLB. If cognitive impairment appears more than 1 year after well-established PD, it is PDD. Clinically, DLB tends to present with prominent visuospatial and attentional deficits and earlier hallucinations; PDD is typically more dysexecutive. Both respond to rivastigmine (the only FDA-approved ChEI for PDD); avoid first-generation antipsychotics — they can precipitate severe neuroleptic sensitivity reactions. Pimavanserin (Nuplazid) is FDA-approved for PD-related psychosis and is widely used off-label for DLB.',
    citations: [
      { source: '2017 DLB Consortium consensus criteria', url: 'https://www.neurology.org/doi/10.1212/WNL.0000000000004058' },
      { source: 'MDS Task Force PDD criteria', url: 'https://onlinelibrary.wiley.com/doi/10.1002/mds.21507' }
    ]
  },

  {
    id: 'reversible-causes',
    keywords: ['reversible dementia', 'mimics', 'rule out', 'workup dementia', 'b12 thyroid'],
    question: 'What reversible causes of cognitive impairment should be ruled out?',
    audience: ['phys', 'all'],
    answer:
      'A standard cognitive impairment workup should screen for treatable contributors: hypothyroidism (TSH); vitamin B12 deficiency (serum B12, with methylmalonic acid if borderline); folate deficiency; depression (PHQ-9 or GDS); obstructive sleep apnea (STOP-BANG); medication side effects, particularly anticholinergics, benzodiazepines, opioids, and z-drugs (review with the Beers Criteria); chronic alcohol use and Wernicke-Korsakoff (consider thiamine empirically); normal-pressure hydrocephalus (gait apraxia + urinary incontinence + cognitive change → MRI looking for ventriculomegaly out of proportion to atrophy); HIV, syphilis (RPR/VDRL); Lyme in endemic areas; chronic subdural hematoma; structural lesions (MRI brain). Approximately 5% of dementia-like presentations have a reversible cause — and this rises in younger patients.',
    citations: [
      { source: 'AAN evidence-based guideline on dementia evaluation', url: 'https://www.aan.com/Guidelines/home/GuidelineDetail/55' },
      { source: 'AGS Beers Criteria', url: 'https://geriatricscareonline.org/ProductAbstract/american-geriatrics-society-beers-criteria-for-potentially-inappropriate-medication-use-in-older-adults/CL001' }
    ]
  },

  {
    id: 'rapidly-progressive',
    keywords: ['rapidly progressive', 'fast decline', 'cjd', 'autoimmune encephalitis', 'creutzfeldt'],
    question: 'How do I work up rapidly progressive dementia?',
    audience: ['phys', 'all'],
    answer:
      'Rapidly progressive dementia (RPD) is decline to dementia within roughly 2 years (often months). It is a neurologic urgency. The differential is dominated by potentially treatable causes: autoimmune encephalitis (limbic, NMDA-R, LGI1, CASPR2, GAD65 — order autoimmune panel), CJD (RT-QuIC and 14-3-3 in CSF, characteristic DWI cortical/striatal hyperintensity), CNS infection (HIV, syphilis, Whipple, fungal, viral), CNS lymphoma or paraneoplastic disease, vasculitis, toxic-metabolic (heavy metals, vitamin deficiencies), and rapidly progressive AD or DLB. Workup: MRI with DWI, EEG, full CSF panel including RT-QuIC and autoimmune antibodies, body imaging for occult malignancy. Empiric immunotherapy is reasonable when autoimmune encephalitis is plausible while awaiting antibody results.',
    citations: [
      { source: 'Geschwind RPD review (Continuum 2016)', url: 'https://journals.lww.com/continuum/Abstract/2016/04000/Rapidly_Progressive_Dementia.13.aspx' },
      { source: 'Graus et al. autoimmune encephalitis criteria (Lancet Neurol 2016)', url: 'https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(15)00401-9/fulltext' }
    ]
  },

  // -------- CAREGIVER --------
  {
    id: 'sundowning-nondrug',
    keywords: ['sundowning', 'evening agitation', 'nondrug agitation', 'non-pharmacologic'],
    question: 'How do I manage sundowning without medications?',
    audience: ['care', 'pat', 'all'],
    answer:
      'Sundowning — increased confusion, restlessness, or agitation in late afternoon and evening — affects roughly 1 in 5 people with dementia. The first step is detective work, not a pill. Common triggers: late-day fatigue, pain or hunger that the person cannot communicate, constipation, urinary tract infection, dehydration, low ambient light, sensory overload from a busy household, daytime napping, and disrupted sleep schedules. Practical steps with evidence: open curtains in the morning and use a bright light box (10,000 lux for 30 minutes after waking) to anchor the circadian rhythm; keep daytime activity steady but limit naps to under 30 minutes before 2 PM; serve a calming early dinner; turn on every light in the late afternoon to head off shadow-driven misperceptions; play familiar music from the person\'s teenage and young-adult years; speak slowly and one task at a time. Avoid caffeine after noon. If sundowning has come on suddenly over hours or a day or two, consider it a possible delirium and have the person seen — UTI is a frequent culprit.',
    citations: [
      { source: 'Cochrane review — bright light therapy in dementia', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003946.pub5/full' },
      { source: 'Alzheimer\'s Association — sundowning guidance', url: 'https://www.alz.org/help-support/caregiving/stages-behaviors/sleep-issues-sundowning' }
    ]
  },

  {
    id: 'memory-care-decision',
    keywords: ['memory care', 'nursing home', 'placement', 'when to move', 'long term care'],
    question: 'When is it time to consider memory care for my parent?',
    audience: ['care', 'all'],
    answer:
      'There is no single right moment, but there are signals that home care is no longer safe or sustainable. Safety triggers: wandering away from home, unsafe driving, leaving the stove on, repeated falls, medication errors, or inability to recognize danger (e.g., letting strangers in). Health triggers: incontinence outpacing what the family can manage; weight loss because meals are forgotten; aggression that puts the person or caregiver at risk; disrupted nighttime that is exhausting the primary caregiver. Caregiver triggers: signs of caregiver burnout (depression, illness, social isolation), or a single caregiver doing it alone without respite. Practical preparation: start touring memory care communities before you need them — the best ones have waitlists. Look for low antipsychotic prescribing rates (under 14%), a high staff-to-resident ratio, secured outdoor space, and engagement programming throughout the day. Many states have Medicaid HCBS waivers that can fund memory care; the new CMS GUIDE program (2024) also provides care coordination + respite benefits.',
    citations: [
      { source: 'Alzheimer\'s Association — residential care guidance', url: 'https://www.alz.org/help-support/caregiving/care-options/long-term-care' },
      { source: 'CMS GUIDE Model overview', url: 'https://www.cms.gov/priorities/innovation/innovation-models/guide' }
    ]
  },

  {
    id: 'caregiver-burnout',
    keywords: ['caregiver burnout', 'caregiver stress', 'support', 'respite', 'caring for caregiver'],
    question: 'What support resources help with caregiver burnout?',
    audience: ['care', 'all'],
    answer:
      'Caregiver burnout is real, common (affecting an estimated 40–70% of dementia caregivers), and treatable. Free immediate help: the Alzheimer\'s Association 24/7 Helpline (1-800-272-3900) provides care consultations in over 200 languages and can connect you to local support groups. The REACH II program — translated into multiple community settings — is the best-validated psychosocial intervention, reducing caregiver depression and delaying nursing home placement by an average of 18 months. Adult day programs (typically $80–150 a day, often Medicaid-covered) provide structured engagement and a daytime break. The CMS GUIDE Model launched in mid-2024 provides up to $2,500 per year of respite benefits through participating practices. The VA offers Caregiver Support Line (1-855-260-3274) and the comprehensive PCAFC program for veterans. If you have a primary care visit coming up: ask your own clinician to screen you with the PHQ-9 and discuss it as a clinical issue — your health matters to your loved one\'s care.',
    citations: [
      { source: 'REACH II (Belle et al., Annals Intern Med 2006)', url: 'https://www.acpjournals.org/doi/10.7326/0003-4819-145-10-200611210-00005' },
      { source: 'CMS GUIDE Model overview', url: 'https://www.cms.gov/priorities/innovation/innovation-models/guide' },
      { source: 'Alzheimer\'s Association 24/7 Helpline', url: 'https://www.alz.org/help-support/resources/helpline' }
    ]
  },

  // -------- PATIENT-LEVEL --------
  {
    id: 'mci-vs-dementia',
    keywords: ['mci', 'mild cognitive impairment', 'mci vs dementia', 'normal aging vs dementia'],
    question: 'How is mild cognitive impairment different from dementia?',
    audience: ['pat', 'all'],
    answer:
      'The line between MCI and dementia is functional, not cognitive. In MCI, there is objective cognitive change (you and the people around you notice it; testing confirms it), but you are still independent in your daily life — you handle your own bills, medications, transportation, and household tasks. In dementia, those instrumental activities of daily living are now meaningfully affected: someone else helps with finances, manages medications, drives, or organizes appointments. About 10–15% of people with MCI progress to dementia each year, but not everyone does — some remain stable for years, and some revert to normal cognition (often when a treatable contributor like depression, sleep apnea, or a medication side effect is addressed). The MCI stage is the best window for: a thorough reversible-cause workup, planning for the future while capacity is intact (advance directives, power of attorney), and — if the cause is biomarker-confirmed early Alzheimer disease — considering anti-amyloid therapy, which is approved only for MCI and mild-stage AD.',
    citations: [
      { source: 'AAN MCI Practice Guideline 2018', url: 'https://www.aan.com/Guidelines/home/GuidelineDetail/881' },
      { source: 'Alzheimer\'s Association MCI overview', url: 'https://www.alz.org/alzheimers-dementia/what-is-dementia/related_conditions/mild-cognitive-impairment' }
    ]
  },

  {
    id: 'driving-conversation',
    keywords: ['driving', 'driving dementia', 'when to stop driving', 'license dementia'],
    question: 'How do I talk to a person with dementia about driving?',
    audience: ['care', 'all'],
    answer:
      'Driving is often the most emotional conversation — losing the keys feels like losing independence. Start it earlier than you think you should, in MCI rather than after a near-miss. Frame it as a clinical issue, not a family fight: ask the primary care clinician or neurologist to bring it up at a visit ("there are some new safety guidelines we follow"). Use objective tools: a formal on-road driving evaluation by an occupational therapist with a driver-rehabilitation specialty (DRS) gives a fact-based answer, and you can split the cost across the family. Some states allow anonymous physician reporting to the DMV; check yours at IIHS.org. If a hard stop is needed, a few practical tactics families have used: removing the keys without explanation often backfires — better to "have the car in the shop" while gradually building alternatives (rides from grandchildren, a regular Lyft pattern, a senior shuttle). Plan for the day after stopping driving: social isolation worsens cognition, so make sure there is an active replacement plan for getting to the things they enjoy.',
    citations: [
      { source: 'AMA — Physician\'s Guide to Assessing and Counseling Older Drivers', url: 'https://www.nhtsa.gov/older-drivers/physicians-guide-assessing-and-counseling-older-drivers' },
      { source: 'Alzheimer\'s Association — driving and dementia', url: 'https://www.alz.org/help-support/caregiving/safety/dementia-driving' }
    ]
  },

  {
    id: 'moca-meaning',
    keywords: ['moca', 'mmse', 'mini cog', 'cognitive score', 'screening test', 'what does score mean'],
    question: 'What does my MoCA score mean and what should I do next?',
    audience: ['pat', 'all'],
    answer:
      'The MoCA (Montreal Cognitive Assessment) is a 30-point screening test, not a diagnosis. Conventional cutpoints used by clinicians: 26 and above is generally normal, 18–25 suggests mild cognitive impairment, 10–17 suggests moderate cognitive impairment, and below 10 suggests severe impairment. A few important nuances: education matters — adjusters and norms differ if you have fewer than 12 years of formal schooling, and there are language-specific versions (translated forms have been validated in over 100 languages); a single low score is not a diagnosis — it could reflect a bad day, an acute illness, depression, sleep deprivation, or untreated hearing or vision loss; you should always have low scores re-tested over months and combined with a clinician\'s evaluation, blood work to exclude reversible causes, and (where indicated) imaging or biomarker testing. If your MoCA was low, the next step is a clinical evaluation with a neurologist, geriatrician, or memory clinic — not panic.',
    citations: [
      { source: 'Nasreddine et al. — original MoCA validation (JAGS 2005)', url: 'https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/j.1532-5415.2005.53221.x' },
      { source: 'Alzheimer\'s Association — cognitive screening', url: 'https://www.alz.org/professionals/health-systems-medical-professionals/cognitive-assessment' }
    ]
  }
];

if (typeof window !== 'undefined') window.NV_EVIDENCE = NV_EVIDENCE;
