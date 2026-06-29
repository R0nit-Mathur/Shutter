---
title: "Creating a Comprehensive llms.txt File for Your Product"
summary: "The llms.txt standard provides an easy way for developer agents to read your site documentation. Learn how to configure and serve a structured markdown map."
date: "May 08, 2026"
readingTime: "5 min read"
category: "LLMs"
---

The `/llms.txt` file is a new proposal to serve clean, lightweight, machine-readable information at a standard path. RAG systems, developer agents, and LLMs query `/llms.txt` to quickly read about your product structure, APIs, and guidelines without having to parse complex HTML styles.

## Structuring Your llms.txt

A standard `llms.txt` uses plain markdown and contains:
- Primary header introducing the platform.
- Short descriptions of product capability.
- List of URLs pointing to deeper document sections.

> [!TIP]
> Keep the layout clean, list links in plain markdown format, and write direct descriptions of every document path.
