---
title: "Inside the Perplexity Search Index: How RAG Drives Citations"
summary: "Perplexity AI has changed real-time answer engines using RAG. Discover how their index crawler parses webpages and what metrics decide which site gets cited in answers."
date: "May 28, 2026"
readingTime: "6 min read"
category: "Perplexity"
---

Perplexity AI operates as a Retrieval-Augmented Generation (RAG) system. Unlike ChatGPT which relies mostly on offline weights (or Bing indexes for search), Perplexity performs multi-step live queries, scrapes relevant websites, and compiles a comprehensive citation report.

## The Scraping Lifecycle of PerplexityBot

When a user triggers a Perplexity search:
1. The engine rewrites the user query into search terms.
2. It fetches organic index listings from Bing and Google.
3. PerplexityBot crawls the top 10-20 landing pages.
4. An LLM parses the crawled page contents to synthesize the answer.

> [!TIP]
> Make your content scannable. Using logical headings, summary paragraphs, and bullet points ensures PerplexityBot reads your core specs correctly.
