# I APPLY FOR JOBS FOR YOU

> **The name IS the product.**
> "Give me your resume. I'll handle the annoying shit."

---

## 1. Brand Voice & Philosophy

- **Strict first-person grammar:** The product is **"I"**, the user is **"you"**.
- **No "we" language:** Never use *"We help"*, *"Our platform"*, or *"Our AI copilot"*.
- **Literal copy:**
  - *"Jobs I found"*
  - *"Applications I submitted"*
  - *"I need one thing from you"*
  - *"I couldn't submit this one"*
  - *"I won't make shit up about you"*

---

## 2. Architecture Overview

### Frontend (`/frontend`)
- **Next.js (App Router) + TypeScript + Tailwind CSS**
- Pages:
  - `/` — Homepage / Landing page
  - `/how-it-works` — Technical breakdown of the Truth Database and adapters
  - `/pricing` — Basic ($0), Pro ($29/mo), Custom ($79/mo) + Coffee donation
  - `/dashboard` — Applications sent, jobs found, and items requiring input
  - `/resume` — Resume intake & Truth Database parser

### Worker Engine (`/worker`)
- **Python + Google GenAI SDK (`gemini-3.8-flash`) + Playwright**
- **Truth Database Model (`models/truth_profile.py`):** Strictly enforces verified information. Never hallucinates qualifications.
- **Gemini Intelligence (`services/gemini_reasoner.py`):**
  - Parses raw resumes into structured truth profiles.
  - Answers open-ended application questions grounded exclusively in real candidate facts.
  - Identifies unknown questions and flags them for user review.
- **Modular Adapters (`adapters/`):**
  - Base class `BaseJobAdapter`
  - Platform implementations (`greenhouse_adapter.py`, `lever`, `ashby`, etc.)

---

## 3. Getting Started

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Running the Worker
```bash
cd worker
python -m venv venv
# Windows:
.\venv\Scripts\activate
pip install -r requirements.txt
playwright install
```

Set your Gemini API key:
```bash
set GEMINI_API_KEY="your-api-key"
```
