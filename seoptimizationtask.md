You are a Senior Staff Software Engineer, Technical SEO Expert, AEO (Answer Engine Optimization) Expert, GEO (Generative Engine Optimization) Expert, and Next.js 15 App Router specialist.

Your task is to transform the existing Shutter codebase into a production-grade SEO and AEO optimized SaaS website.

The website is deployed on Vercel at:

https://www.getshutter.online

DO NOT redesign the UI unless necessary.

DO NOT change branding.

DO NOT remove animations.

Your job is to improve discoverability, crawlability, indexing, metadata, structured data, accessibility, performance and AI search optimization.

====================================================

OBJECTIVES

Shutter should become one of the most technically optimized websites for:

* Answer Engine Optimization
* AI Search Optimization
* Generative Engine Optimization
* AI Visibility
* ChatGPT SEO
* Claude SEO
* Gemini SEO
* Perplexity SEO
* Google AI Overviews
* AI Search Analytics

The implementation must follow Google's Search Essentials and modern best practices.

====================================================

1. METADATA

Replace every metadata implementation.

Implement dynamic metadata using Next.js Metadata API.

Every page must contain:

* title
* description
* canonical
* robots
* keywords
* authors
* creator
* publisher
* openGraph
* twitter
* alternates
* metadataBase

Homepage title should be approximately:

Shutter — AI Search & Answer Engine Optimization Platform

Homepage description:

Improve your visibility across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews using Shutter.

Generate optimized OG images.

====================================================

2. STRUCTURED DATA

Implement JSON-LD.

Add:

Organization

SoftwareApplication

WebSite

WebPage

BreadcrumbList

FAQPage

Product

Offer

Review (if applicable)

Person (for founders if appropriate)

SearchAction

====================================================

3. TECHNICAL SEO

Generate automatically:

robots.txt

sitemap.xml

manifest.json

security.txt

humans.txt

browserconfig.xml

rss.xml

llms.txt

Automatically update sitemap whenever pages change.

====================================================

4. AEO / GEO OPTIMIZATION

Optimize the entire website for LLM retrieval.

Create semantic HTML.

Use:

article

section

header

main

nav

aside

footer

Avoid div soup.

Improve heading hierarchy.

One H1 only.

Logical H2 and H3 hierarchy.

Implement FAQ sections.

Implement HowTo sections where relevant.

Implement comparison sections.

Implement definition sections.

Implement glossary-ready formatting.

====================================================

5. PERFORMANCE

Target:

100 Performance

100 SEO

100 Best Practices

100 Accessibility

according to Lighthouse.

Implement:

lazy loading

image optimization

font optimization

route prefetching

metadata optimization

code splitting

bundle reduction

remove unused JS

compress assets

====================================================

6. ACCESSIBILITY

Every image:

alt text

Every button:

aria-label

Every input:

accessible labels

Keyboard navigation.

Proper focus states.

====================================================

7. INTERNAL LINKING

Create logical internal linking.

Features

Pricing

Blog

Docs

About

Contact

Privacy

Terms

API

Changelog

Compare

Every page should link to relevant pages.

====================================================

8. BLOG FOUNDATION

Generate blog architecture.

Categories:

AEO

SEO

AI Search

ChatGPT

Gemini

Claude

Perplexity

Google AI

Schema

LLMs

Create reusable MDX blog components.

Generate RSS automatically.

====================================================

9. DOCUMENTATION

Create documentation routing.

Examples:

/docs

/docs/getting-started

/docs/ai-readiness

/docs/llms-txt

/docs/schema

/docs/api

====================================================

10. SCHEMA UTILITIES

Automatically support:

FAQ Schema

Organization Schema

Product Schema

Software Schema

Breadcrumb Schema

Article Schema

====================================================

11. CANONICALIZATION

Force canonical URLs.

Redirect duplicate URLs.

Redirect trailing slash inconsistencies.

Support www and non-www correctly according to deployment.

====================================================

12. INDEXING

Ensure no page accidentally contains:

noindex

nofollow

unless explicitly intended.

Generate proper robots directives.

====================================================

13. SOCIAL

Generate OpenGraph.

Twitter Cards.

LinkedIn preview.

Discord preview.

Slack preview.

====================================================

14. AI SEARCH READINESS

Create:

/llms.txt

Machine-readable documentation.

Well-structured markdown documentation.

Semantic page structure.

Strong entity descriptions.

Consistent terminology.

====================================================

15. CONTENT

Rewrite homepage copy where needed to naturally include relevant concepts without keyword stuffing.

Focus on:

Answer Engine Optimization

AI Search Optimization

AI Visibility

Google AI Overviews

ChatGPT

Claude

Gemini

Perplexity

Generative Engine Optimization

AI Search Analytics

Do not overuse keywords.

Write naturally.

====================================================

16. NEXT.JS

Follow App Router best practices.

Use Server Components where possible.

Streaming where appropriate.

Avoid unnecessary client components.

====================================================

17. DELIVERABLE

Apply every change directly to the codebase.

Refactor files where needed.

Do not leave TODO comments.

After completion, provide:

* list of files changed
* Lighthouse improvements
* SEO improvements
* AEO improvements
* performance improvements
* remaining recommendations
* estimated impact

Do not merely explain the changes—implement them completely.
