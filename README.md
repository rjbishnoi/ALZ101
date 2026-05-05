# NeuroViz — Cognitive Health Atlas

A data-visualization atlas for **neurocognitive disorders** (Alzheimer's disease and other dementias) — a single, dense, information-rich workspace built for clinicians, patients, and caregivers.

NeuroViz is built for three audiences — **physicians, patients, and caregivers** — with a toggle in the top nav that lets each audience tune the language and emphasis of what they see. Every page emphasizes visualization: heatmaps, sensitivity/specificity scatter plots, brain-region atlases, treatment efficacy comparisons, prevalence maps, risk-factor bars, and trial timelines.

> ⚠ **Educational reference only.** Not a substitute for medical advice, diagnosis, or treatment. All clinical content is curated from public sources (Lancet Commission 2024, NIA-AA framework, FDA approvals, ClinicalTrials.gov, Cochrane reviews) and may be out of date. Always consult a qualified clinician.

---

## What's inside

Ten primary tabs across the cognitive-health workspace:

| Tab | Page | What it shows |
|---|---|---|
| **Dashboard** | `index.html` | Stat strip, dementia-type heatmap, daily signals, Lancet 14 risk factors, news, trials, 5-stage timeline |
| **Maps** | `maps.html` | Interactive lateral-view brain SVG, US state prevalence bars, global region rates, risk-factor map |
| **Groups** | `groups.html` | All 12 dementia subtypes with severity gradients, filterable by category / age / prevalence |
| **Screener** | `screener.html` | Interactive 12-question risk assessment with pattern recognition + 10 validated screening instruments |
| **Diagnosis** | `diagnosis.html` | All 12 diagnostic methods, ATN(I) framework, full diagnostic-pathway flowchart, sens/spec scatter |
| **Treatments** | `treatments.html` | 10 pharmacological + 12 non-pharmacological, head-to-head efficacy compare, BPSD stepped-care |
| **Clinical Trials** | `trials.html` | 12 representative late-stage trials with phase/sponsor/mechanism filters and Gantt timeline |
| **Caregivers** | `caregivers.html` | 12 caregiver resources, 9-card daily-life toolkit, stage-by-stage guide, Zarit burden assessment |
| **Community Care** | `community.html` | 10 service types with cost ranges, payor matrix, decision aid, facility tour checklist |
| **News** | `news.html` | 14 news items filterable by category and tag, sourced from peer-reviewed and regulatory outlets |

### Data sources baked in

- **Dementia Types** — Alzheimer's, Vascular, DLB, FTD spectrum, Mixed, PDD, CJD, NPH, Huntington's, Wernicke-Korsakoff, PCA, PPA
- **Screening tools** — MoCA, MMSE, Mini-Cog, AD8, GPCOG, SLUMS, CDR, ACE-III, GDS-15, IQCODE
- **Diagnostics** — p-tau217 blood, GFAP, NfL, CSF biomarkers, amyloid PET, tau PET, FDG-PET, MRI, DaT, APOE, PSEN, EEG
- **Pharmacological** — donepezil, rivastigmine, galantamine, memantine, lecanemab, donanemab, brexpiprazole, citalopram, pimavanserin, trazodone
- **Non-pharmacological** — CST, reminiscence, music, exercise, MIND diet, OT, doll/pet, Snoezelen, BLT, FINGER, sleep hygiene, caregiver CBT
- **Trials** — trontinemab, remternetug, AADvac1, semaglutide (EVOKE), GSK4527226, blarcamesine, AGB101, AHEAD 3-45, edaravone, allopregnanolone, masitinib, neflamapimod
- **Risk factors** — full Lancet Commission 2024 list of 14 modifiable factors with PAR%
- **Stages** — Preclinical → MCI → Mild → Moderate → Severe with CDR, MMSE, duration, features

---

## Running locally

NeuroViz is **plain HTML, CSS, and JavaScript** with no build step and no dependencies.

### Option 1 — Just open the file
Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).

### Option 2 — Local server (recommended)
A simple static server avoids any browser cache or file-protocol quirks:

```bash
# With Python 3 (built in on most systems)
cd neuroviz
python -m http.server 8000

# With Node.js
npx serve .

# With PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

---

## Project structure

```
neuroviz/
├── index.html              # Dashboard
├── maps.html               # Brain & prevalence maps
├── groups.html             # Dementia type catalog
├── screener.html           # Risk assessment + screening tools
├── diagnosis.html          # Diagnostic methods + ATN(I) + pathway
├── treatments.html         # Pharm + non-pharm + BPSD
├── trials.html             # Clinical trials browser
├── caregivers.html         # Caregiver hub
├── community.html          # Community care services
├── news.html               # News feed
│
├── css/
│   └── styles.css          # Full design system (tokens, components, layouts)
│
├── js/
│   ├── layout.js           # Top fact bar, masthead, nav, footer, audience toggle
│   ├── heatmap.js          # Squarified-treemap dementia heatmap
│   └── screener.js         # Interactive risk assessment with pattern recognition
│
├── data/
│   └── nv-data.js          # All clinical data (dementia types, drugs, trials, etc.)
│
├── assets/                 # Static assets (currently empty)
│
├── README.md               # This file
└── .gitignore
```

---

## Design language

**Reference points:** dense data dashboards × NEJM editorial typography × clean clinical UI.

- **Display:** Fraunces (serif, headlines)
- **Body:** IBM Plex Sans
- **Mono:** JetBrains Mono (data, codes, NCT numbers, MoCA scores)
- **Palette:** Clinical teal (`#0e2a2a`) + cream paper (`#f5f2ec`) + terracotta accent (`#c75a3c`)
- **Severity gradient:** 6 steps from `#e8e0d2` (minimal) to `#6b1f1a` (end-stage)
- **Type chips:** `#a04848` AD, `#5d4a73` Lewy, `#3a5a78` FTD, plus VAS/MIX/PARK/OTH variants

The audience toggle (Physician / Patient / Caregiver) is stored in `localStorage` and persists across sessions. Pages can read `document.body.dataset.audience` and listen for the `nv-audience-change` event to adapt content.

---

## Customization

Almost all data is in **`data/nv-data.js`** — a single `NV_DATA` object. Edit, add, or remove entries to update what's displayed. No rebuild needed; just refresh.

Common customizations:

- **Add a drug** → append to `NV_DATA.treatmentsPharm`
- **Add a trial** → append to `NV_DATA.trials`; the trials page picks it up automatically
- **Add a news item** → prepend to `NV_DATA.news` for it to appear at the top
- **Change colors / spacing** → edit CSS variables at the top of `css/styles.css`
- **Add a new tab** → add a page, then add an entry to `renderPrimaryNav()` in `js/layout.js`

---

## Versioning

This repository is intended to be a **starting point** for a more comprehensive clinical-data workspace. The data included is representative — for production use, every clinical claim should be re-verified against current literature, and prevalence/cost figures should be tied to live data sources.

---

## License

The code is provided as-is for educational use. Clinical content is summarized from publicly available sources, and references should be consulted directly for clinical decision-making.

— Built with care for patients, families, and the clinicians who serve them.
