---
title: "AI Readiness & GEO Checklist"
summary: "Essential technical configurations and copy adjustments to prepare your website for LLM scrapers and search bots."
---

Generative Engine Optimization (GEO) requires standard web parameters to be formatted for machine ingestion. This checklist covers the structural alignments needed to make your site AI-ready.

## Checklist for AI Readiness

- ** robots.txt Permissions:** Ensure you allow `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended` to access your public folders.
- ** JSON-LD Schemas:** Define Organization, Product, FAQ, and Breadcrumb list structures on all core pages.
- ** Semantic HTML Outlines:** Use tags like `<main>`, `<article>`, `<section>`, and `<header>` rather than nested `div` elements.
- ** Table Comparison Lists:** Serve competitor comparison lists in standard markdown/HTML tables.
- ** Servicing llms.txt:** Deploy an `/llms.txt` file at your domain root detailing index URLs.

## Factual Consensus Verification

Large Language Models look for factual consensus across multiple authority websites.
- Verify that your corporate details (headquarters, founder, category) are exactly consistent across Wikidata, Crunchbase, Github, and G2 directories.
- Avoid contradictory statements in product specs.
