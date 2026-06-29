---
title: "Deploying the llms.txt Standard"
summary: "Understand the llms.txt standard proposal, how it assists developer agents, and how to serve it at your domain root."
---

The `/llms.txt` file is an emerging community standard to present site documentation in a highly readable format for Large Language Models. When developer agents or RAG systems land on your site, they check `/llms.txt` to retrieve a concise roadmap of your codebase and APIs.

## Implementation Guide

To implement the standard:

### 1. Create llms.txt

Create a plain text markdown file named `llms.txt`. Include your company overview, core features, and links to deeper sections.

```markdown
# Shutter: AI Search Optimization Platform

Enterprise Answer Engine Optimization and dynamic semantic tracking.

## Core Docs
- Get Started: https://www.getshutter.online/docs/getting-started
- AI Readiness: https://www.getshutter.online/docs/ai-readiness
```

### 2. Place in Public Directory

In Next.js, save this file under `/public/llms.txt`. The Vercel compiler makes this file available at the root URL immediately: `https://yourdomain.com/llms.txt`.

### 3. Verification

Test the endpoint in your browser. Ensure the content type is served as `text/plain` so LLM agents can parse it directly.
