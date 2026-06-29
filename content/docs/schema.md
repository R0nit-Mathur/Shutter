---
title: "Structured Schema Integration"
summary: "Detailed reference code for setting up Organization, Product, FAQ, and Breadcrumb structured schemas on your landing pages."
---

Structured data helps models organize entity relationships inside their semantic databases. This guide covers how to write and inject schema templates.

## 1. Organization Schema

Deploy on your homepage layout to establish corporate attributes:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shutter",
  "url": "https://www.getshutter.online",
  "logo": "https://www.getshutter.online/logo.png",
  "sameAs": [
    "https://x.com/getshutter",
    "https://github.com/getshutter"
  ]
}
```

## 2. Product Schema

Enables LLM comparison agents to accurately pull your price tags and product details:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Shutter Professional",
  "description": "AI visibility monitoring subscription",
  "offers": {
    "@type": "Offer",
    "price": "99.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

## 3. FAQ Schema

Outlines clear answers to help Gemini/ChatGPT display accordions directly in search feeds:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Shutter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shutter is an Answer Engine Optimization platform."
      }
    }
  ]
}
```
