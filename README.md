# Shutter

Shutter is an Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) platform designed to help brands monitor, benchmark, and optimize their visibility within AI-generated search answers and large language models (LLMs).

By treating AI search systems as queryable semantic databases, Shutter audits brand perception, citation frequency, and recommendation rankings across OpenAI, Gemini, Claude, and Perplexity.

---

## Core Concepts

### Traditional SEO vs. AEO vs. GEO
* **Traditional SEO**: Optimized for search engine crawlers, indexing HTML markup, keywords, and link equity to rank static page links. Focuses on matching queries to directory URLs.
* **Answer Engine Optimization (AEO)**: Optimized for securing direct citations, footnotes, and recommendations within LLM syntheses and RAG (Retrieval-Augmented Generation) responses.
* **Generative Engine Optimization (GEO)**: Optimized for latent associations and vector proximity, shaping how model weights group and compare your brand entity against competitors.

---

## Technical Architecture

The platform coordinates a decoupled, asynchronous diagnostics pipeline:

1. **Parallel Execution**: Diagnostic scans coordinate requests across four LLM API endpoints simultaneously using server-side asynchronous resolution.
2. **Normalized DBMS Calculations**: To ensure consistent, factual calculations, models output only raw, atomic metrics (frequency, confidence, pros/cons lists, competitor entries). Shutter then calculates derived ratings programmatically on the server:
   * **Visibility Index**: Calculated mathematically using the reference frequency mapping and factual confidence score.
   * **Sentiment Label**: Classified based on numerical raw score ranges.
   * **Compound AEO Index**: The average of the visibility index and sentiment ratings across all successfully audited models.
   * **SWOT Analysis & Roadmap**: Synthesized from the raw pros, cons, and recommendations lists.
3. **Local Credentials Drawer**: Users can supply their own API keys via the web interface. These keys are cached locally in browser storage and passed securely via request headers, bypassing host rate-limit boundaries.
4. **Cinematic Hero Preloading**: The landing page hero uses a preloaded image sequence (192 WebP frames) rendered on a Canvas container linked to browser scrolling.

---

## Repository Structure

```
├── app/
│   ├── api/
│   │   └── aeo/
│   │       └── route.ts         # Asynchronous multi-model API router
│   ├── dashboard/
│   │   └── page.tsx             # Authenticated workspace dashboard
│   ├── layout.tsx               # Root layout loader for Inter and Instrument Serif
│   └── page.tsx                 # Scroll-linked product landing page
├── components/
│   ├── dashboard/
│   │   ├── AeoDashboard.tsx     # Coordinator wrapper for inputs & outputs
│   │   ├── ApiKeysPanel.tsx     # Slide-out key drawer using Framer Motion
│   │   ├── AuditReportView.tsx  # Dynamic report inspector with SVG charts
│   │   ├── LoadingProgress.tsx  # Simulated parallel progress bar shell
│   │   └── ScanInputForm.tsx    # Brand input fields and quick presets
│   ├── InteractiveDemo.tsx      # Terminal-chat hybrid visualizer
│   ├── MetricSection.tsx        # Viewport intersection stats counters
│   ├── Navbar.tsx               # Glassmorphic header with auth states
│   └── ScrollVideoHero.tsx      # Canvas-scrubbed image sequence preloader
├── scripts/
│   └── test-aeo.js              # Command-line testing client
└── next.config.ts               # Allowed image domains and configs
```

---

## Getting Started

### 1. Configure Environment Variables
Create a `.env` file in the root directory and add the following keys to enable fallback server scans:
```env
AUTH_SECRET="your-auth-secret"
Google_ClientId="your-google-client-id"
Google_ClientSecret="your-google-client-secret"

# Optional LLM API Keys (Falls back to high-fidelity local simulations if empty)
OPENAI_API_KEY="your-openai-api-key"
GEMINI_API_KEY="your-gemini-api-key"
ANTHROPIC_API_KEY="your-anthropic-key"
PERPLEXITY_API_KEY="your-perplexity-key"
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Local Development Server
```bash
pnpm run dev
```
Open http://localhost:3000 to view the homepage and http://localhost:3000/dashboard to access the diagnostics workspace.

### 4. Run CLI Audit Test
You can trigger diagnostic scans directly from your terminal using the helper client:
```bash
node scripts/test-aeo.js "Brand Name" "Category" "Description"
```

Example:
```bash
node scripts/test-aeo.js "Supabase" "Developer Database Platform" "An open source Firebase alternative"
```
