---
title: "Shutter Console API Reference"
summary: "API Endpoint parameters, request formats, and responses for triggering AEO scan diagnostics programmatically."
---

Developers can query the Shutter Visibility Engine using API endpoints. Ensure you supply custom API keys in headers to execute probes successfully.

## Scan Diagnostics Endpoint

Trigger parallel scanning across ChatGPT, Claude, Gemini, and Perplexity:

- **Endpoint:** `/api/aeo`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
  - `x-openai-key` (Optional: Custom OpenAI Key)
  - `x-gemini-key` (Optional: Custom Gemini Key)
  - `x-anthropic-key` (Optional: Custom Anthropic Key)
  - `x-perplexity-key` (Optional: Custom Perplexity Key)

### Request Parameters

```json
{
  "website": "https://supabase.com",
  "name": "Supabase",
  "description": "Open source Firebase alternative",
  "competitors": "Firebase, Postgres, PlanetScale"
}
```

### Response Format

Returns citation scores, perceived attributes, SWOT analysis, and comparison recommendation ranks.

```json
{
  "metadata": {
    "productName": "Supabase",
    "timestamp": 1780182700000
  },
  "overallScore": 86,
  "citationFrequency": "High",
  "perceivedAttributes": {
    "scalability": "Strong",
    "developer_experience": "Exceptional"
  }
}
```
