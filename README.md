# CyberShield AI 2.0 — Phase 1 Frontend Prototype

Premium, responsive SOC investigation experience built with Next.js App Router, React, TypeScript, Tailwind CSS v4, Motion, and Lucide icons.

> IMPORTANT: This release is the **frontend foundation**, not the completed cybersecurity platform. Dashboard metrics, case records, and threat graph data are **explicitly illustrative**. The browser email inspection runs actual local structural rules but **does not run your trained Python ML model**, store data in SQLite, contact reputation APIs, or make verified phishing determinations. Those features are planned for later phases.

## Windows setup (VS Code)

1. Install Node.js 22 LTS (or any supported Node.js release >=20.9), then reopen VS Code.
2. Extract the project folder somewhere convenient, e.g. `C:\CyberShield_AI_2.0` (do not overwrite `C:\CyberShield_AI`).
3. In VS Code use **File > Open Folder** and choose `C:\CyberShield_AI_2.0`.
4. In the VS Code terminal run:

   ```powershell
   node -v
   npm -v
   npm install
   npm run dev
   ```

5. Open `http://localhost:3000`.

Use `Ctrl+C` to stop. Other checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## Routes

- `/` cinematic product introduction
- `/workspace` responsive analyst command center with demo chart and case preview
- `/workspace/scanner` browser-only email text inspection (.eml and .txt support, simple text parsing)
- `/workspace/cases` searchable demo case queue with session-only notes and editable status
- `/workspace/intelligence` clickable, demo IOC relationship graph

## Structure

```
app/                       Next.js route pages + global design system
components/                Navigation, branding, and activity chart
lib/demo-data.ts            Sample cases and reserved-domain indicators
lib/email-inspection.ts     Real browser-side structural inspection (not ML)
public/                     Static brand assets
```

## Security notes

- No backend, authentication, persistence, or real ML integration in this phase.
- Scanner input stays in browser memory; no external requests or automatic link visits.
- The simple `.eml` reader supports typical plain-text examples; it is not a full MIME parser.
- Avoid submitting private messages or secrets to external tools while demonstrating the app.
- Future backend: reuse the existing trusted Python ML pipeline via FastAPI, use PostgreSQL migrations, isolate uploaded files, and store secrets in environment variables.
- Only load trusted `.joblib` artifacts on the server. Do not store API secrets in `NEXT_PUBLIC_*` variables.

## Roadmap

1. Phase 1 (this package): Premium frontend, real local structural inspection, interactive demo workflows.
2. Phase 2: FastAPI endpoints linked to your **existing** Python phishing model; real analysis in frontend.
3. Phase 3: Safe MIME parsing, IOC extraction, optional threat intel enrichment.
4. Phase 4: PostgreSQL-backed case management, authentication, provenance and audit events.
5. Phase 5: Tests, accessibility, metrics, Docker, GitHub Actions, production hardening.
