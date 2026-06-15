import { NextResponse } from 'next/server';

// Types for the Atomic LLM Audits
interface LlmAeoAudit {
  visibility: {
    isKnown: boolean;
    referenceFrequency: 'none' | 'low' | 'medium' | 'high';
    factualAccuracyScore: number; // 0-100
  };
  sentiment: {
    rawScore: number; // 0-100
    pros: Array<{
      point: string;
      category: 'features' | 'pricing' | 'usability' | 'support' | 'reliability' | 'other';
    }>;
    cons: Array<{
      point: string;
      category: 'features' | 'pricing' | 'usability' | 'support' | 'reliability' | 'other';
    }>;
  };
  recommendations: {
    probabilityOfRecommendation: number; // 0-100
    typicalPlacementRank: number; // 0-5
    recommendationPrerequisites: string[];
  };
  attributes: Array<{
    name: string;
    perceptionScore: number; // 0-100
  }>;
  competitors: string[];
  aeoOptimizationSuggestions: Array<{
    area: 'documentation' | 'web-mentions' | 'reviews' | 'benchmarks' | 'other';
    details: string;
  }>;
}

interface ModelAuditResult {
  modelName: string;
  isSimulated: boolean;
  error: string | null;
  audit: LlmAeoAudit | null;
  citations?: string[]; // Perplexity only
}

// Map referenceFrequency to numeric value
const FREQUENCY_MAPPING = {
  none: 0,
  low: 30,
  medium: 70,
  high: 100
};

// System prompt instructing the models to return only the atomic JSON structure
const SYSTEM_PROMPT = `You are an expert AI Engine Optimization (AEO) Auditor.
Your job is to analyze the brand visibility, sentiment, recommendations, and characteristics of a specific business or product within its category from the perspective of your model.

Analyze the business/product honestly. Provide your analysis strictly as a JSON object matching this TypeScript structure, without markdown blocks, without conversational wrappers, and without pre-computed or derived fields (no averages, no compound scores, no classification labels like "Positive/Negative"):

interface LlmAeoAudit {
  visibility: {
    isKnown: boolean; // Set to true if the brand is recognized in your dataset, false otherwise
    referenceFrequency: 'none' | 'low' | 'medium' | 'high'; // Approximate presence frequency in training/web data
    factualAccuracyScore: number; // 0 to 100 rating of how factual/accurate your information on this brand is
  };
  sentiment: {
    rawScore: number; // 0 to 100 sentiment score (100 being extremely positive, 0 being highly critical)
    pros: Array<{
      point: string; // The specific strength
      category: 'features' | 'pricing' | 'usability' | 'support' | 'reliability' | 'other';
    }>;
    cons: Array<{
      point: string; // The specific complaint or weakness
      category: 'features' | 'pricing' | 'usability' | 'support' | 'reliability' | 'other';
    }>;
  };
  recommendations: {
    probabilityOfRecommendation: number; // 0 to 100 likelihood of recommending this brand when asked by a user for category options
    typicalPlacementRank: number; // 0 if not recommended, 1 to 5 for ranking order in typical recommendation lists
    recommendationPrerequisites: string[]; // Up to 3 user queries/contexts that would trigger recommending this product (e.g. "when cheap pricing is requested")
  };
  attributes: Array<{
    name: string; // Name of the attribute, e.g., "pricing", "performance", "features", "UX", "support"
    perceptionScore: number; // 0 to 100 perception rating for this attribute
  }>;
  competitors: string[]; // Up to 3 direct competitor brands in the same category
  aeoOptimizationSuggestions: Array<{
    area: 'documentation' | 'web-mentions' | 'reviews' | 'benchmarks' | 'other';
    details: string; // Description of what to change/optimize to improve model visibility/recommendations
  }>;
}

Provide raw metrics only. If the brand is completely unknown to you, fill the metrics as: visibility.isKnown=false, visibility.referenceFrequency='none', visibility.factualAccuracyScore=0, sentiment.rawScore=50, recommendations.probabilityOfRecommendation=0, and empty arrays for others.

Output ONLY valid JSON. Do not write anything else.`;

// Utility to clean LLM markdown strings if any are returned
function cleanJsonString(str: string): string {
  let clean = str.trim();
  if (clean.startsWith('```')) {
    clean = clean.replace(/^```(?:json)?\s*/i, '');
    clean = clean.replace(/\s*```$/, '');
  }
  return clean.trim();
}

// Generate realistic simulated audit data when API keys are absent
function generateSimulatedAudit(name: string, category: string, model: string): LlmAeoAudit {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Create variations based on brand name hash
  const visibilityScore = 40 + (hash % 55); // 40 - 95
  const sentimentScore = 50 + (hash % 45); // 50 - 95
  const isKnown = visibilityScore > 45;
  const referenceFrequency = visibilityScore > 80 ? 'high' : visibilityScore > 60 ? 'medium' : isKnown ? 'low' : 'none';
  const recProbability = Math.round(sentimentScore * 0.9);
  const rank = visibilityScore > 85 ? 1 : visibilityScore > 70 ? 2 : visibilityScore > 50 ? 3 : 0;

  // Set up mock category data
  const cat = (category || 'SaaS').toLowerCase();
  let defaultCompetitors = ['Competitor Alpha', 'Competitor Beta', 'Competitor Gamma'];
  let pros = ['Modern interface design', 'Reliable core functionality'];
  let cons = ['Slight learning curve for new users', 'Pricing tiers can be expensive for small teams'];
  
  if (cat.includes('project') || cat.includes('task') || cat.includes('linear') || cat.includes('jira') || cat.includes('asana')) {
    defaultCompetitors = ['Jira', 'Asana', 'Monday.com'];
    pros = ['Extremely fast keyboard-first navigation', 'Clean and minimalist UI design', 'Powerful command palette options'];
    cons = ['Can feel feature-light for large enterprise portfolios', 'No native time-tracking tools built-in'];
  } else if (cat.includes('crm') || cat.includes('sales') || cat.includes('hubspot')) {
    defaultCompetitors = ['HubSpot CRM', 'Salesforce', 'Pipedrive'];
    pros = ['Easy-to-use pipeline views', 'Affordable entry tiers', 'Strong email integrations'];
    cons = ['Reporting reports can lack customization depth', 'Contacts limit threshold caps'];
  } else if (cat.includes('db') || cat.includes('database') || cat.includes('postgres') || cat.includes('supabase')) {
    defaultCompetitors = ['Supabase', 'PostgreSQL', 'PlanetScale'];
    pros = ['High transactional throughput performance', 'Excellent developer experience & SDKs', 'Active open-source community support'];
    cons = ['Complexity in clustering configuration', 'High storage pricing overheads'];
  }

  // Model specific variations to make simulation feel realistic
  const modelVariations: Record<string, { accuracyMod: number, sentMod: number }> = {
    openai: { accuracyMod: 5, sentMod: 2 },
    gemini: { accuracyMod: -2, sentMod: -3 },
    claude: { accuracyMod: 8, sentMod: 4 },
    perplexity: { accuracyMod: 2, sentMod: 0 }
  };

  const variation = modelVariations[model] || { accuracyMod: 0, sentMod: 0 };
  const factualAccuracy = Math.min(100, Math.max(0, visibilityScore + variation.accuracyMod));
  const modelSentiment = Math.min(100, Math.max(0, sentimentScore + variation.sentMod));

  return {
    visibility: {
      isKnown,
      referenceFrequency: referenceFrequency as 'none' | 'low' | 'medium' | 'high',
      factualAccuracyScore: isKnown ? factualAccuracy : 0
    },
    sentiment: {
      rawScore: modelSentiment,
      pros: pros.map((p, i) => ({
        point: p,
        category: i === 0 ? 'usability' : 'features'
      })),
      cons: cons.map((c, i) => ({
        point: c,
        category: i === 0 ? 'usability' : 'pricing'
      }))
    },
    recommendations: {
      probabilityOfRecommendation: isKnown ? recProbability : 0,
      typicalPlacementRank: rank,
      recommendationPrerequisites: [
        `When asked for ${cat} with a modern interface`,
        `When users prioritize fast developer workflow efficiency`
      ]
    },
    attributes: [
      { name: 'pricing', perceptionScore: Math.max(20, modelSentiment - 15) },
      { name: 'performance', perceptionScore: Math.min(100, modelSentiment + 8) },
      { name: 'usability', perceptionScore: Math.min(100, modelSentiment + 12) }
    ],
    competitors: defaultCompetitors.slice(0, 3),
    aeoOptimizationSuggestions: [
      {
        area: 'documentation',
        details: `Publish detailed integration benchmarks to show how ${name} compares with ${defaultCompetitors[0]}.`
      },
      {
        area: 'web-mentions',
        details: `Increase brand mentions in developer comparison blogs to build more neural web associations.`
      }
    ]
  };
}

// Call OpenAI Chat API
async function fetchOpenAiAudit(name: string, category: string, description: string, apiKey: string): Promise<LlmAeoAudit> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Analyze the brand/product:\nName: "${name}"\nCategory: "${category}"\nDescription: "${description || 'None provided'}"` 
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.choices[0].message.content;
  return JSON.parse(cleanJsonString(rawText)) as LlmAeoAudit;
}

// Call Gemini Generate Content API
async function fetchGeminiAudit(name: string, category: string, description: string, apiKey: string): Promise<LlmAeoAudit> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nAnalyze the brand/product:\nName: "${name}"\nCategory: "${category}"\nDescription: "${description || 'None provided'}"`
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  return JSON.parse(cleanJsonString(rawText)) as LlmAeoAudit;
}

// Call Anthropic Claude API
async function fetchClaudeAudit(name: string, category: string, description: string, apiKey: string): Promise<LlmAeoAudit> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [
        { 
          role: 'user', 
          content: `Analyze the brand/product:\nName: "${name}"\nCategory: "${category}"\nDescription: "${description || 'None provided'}"` 
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.content[0].text;
  return JSON.parse(cleanJsonString(rawText)) as LlmAeoAudit;
}

// Call Perplexity Sonar API (with real-time web search capability)
async function fetchPerplexityAudit(
  name: string, 
  category: string, 
  description: string, 
  apiKey: string
): Promise<{ audit: LlmAeoAudit; citations?: string[] }> {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Analyze the brand/product:\nName: "${name}"\nCategory: "${category}"\nDescription: "${description || 'None provided'}"` 
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Perplexity API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.choices[0].message.content;
  const audit = JSON.parse(cleanJsonString(rawText)) as LlmAeoAudit;
  
  // Extract citations/sources from Perplexity response
  const citations = data.citations || [];

  return { audit, citations };
}

// Main handler for POST request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description } = body;

    // Validation
    if (!name) {
      return NextResponse.json({ error: "Missing required parameter 'name'" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "Missing required parameter 'category'" }, { status: 400 });
    }

    // Extract custom keys from headers if provided, falling back to server environment variables
    const headerOpenAiKey = request.headers.get('x-openai-key');
    const headerGeminiKey = request.headers.get('x-gemini-key');
    const headerClaudeKey = request.headers.get('x-anthropic-key');
    const headerPerplexityKey = request.headers.get('x-perplexity-key');

    const keys = {
      openai: headerOpenAiKey || process.env.OPENAI_API_KEY || null,
      gemini: headerGeminiKey || process.env.GEMINI_API_KEY || null,
      claude: headerClaudeKey || process.env.ANTHROPIC_API_KEY || null,
      perplexity: headerPerplexityKey || process.env.PERPLEXITY_API_KEY || null
    };

    // Run auditing requests in parallel using Promise.allSettled
    const modelPromises = [
      // 1. OpenAI
      (async (): Promise<ModelAuditResult> => {
        if (!keys.openai) {
          return { modelName: 'openai', isSimulated: true, error: null, audit: generateSimulatedAudit(name, category, 'openai') };
        }
        try {
          const audit = await fetchOpenAiAudit(name, category, description, keys.openai);
          return { modelName: 'openai', isSimulated: false, error: null, audit };
        } catch (err: any) {
          console.error("OpenAI audit error, falling back to simulation:", err);
          return { 
            modelName: 'openai', 
            isSimulated: true, 
            error: err.message || "Failed API call", 
            audit: generateSimulatedAudit(name, category, 'openai') 
          };
        }
      })(),

      // 2. Gemini
      (async (): Promise<ModelAuditResult> => {
        if (!keys.gemini) {
          return { modelName: 'gemini', isSimulated: true, error: null, audit: generateSimulatedAudit(name, category, 'gemini') };
        }
        try {
          const audit = await fetchGeminiAudit(name, category, description, keys.gemini);
          return { modelName: 'gemini', isSimulated: false, error: null, audit };
        } catch (err: any) {
          console.error("Gemini audit error, falling back to simulation:", err);
          return { 
            modelName: 'gemini', 
            isSimulated: true, 
            error: err.message || "Failed API call", 
            audit: generateSimulatedAudit(name, category, 'gemini') 
          };
        }
      })(),

      // 3. Claude
      (async (): Promise<ModelAuditResult> => {
        if (!keys.claude) {
          return { modelName: 'claude', isSimulated: true, error: null, audit: generateSimulatedAudit(name, category, 'claude') };
        }
        try {
          const audit = await fetchClaudeAudit(name, category, description, keys.claude);
          return { modelName: 'claude', isSimulated: false, error: null, audit };
        } catch (err: any) {
          console.error("Claude audit error, falling back to simulation:", err);
          return { 
            modelName: 'claude', 
            isSimulated: true, 
            error: err.message || "Failed API call", 
            audit: generateSimulatedAudit(name, category, 'claude') 
          };
        }
      })(),

      // 4. Perplexity
      (async (): Promise<ModelAuditResult> => {
        if (!keys.perplexity) {
          return { 
            modelName: 'perplexity', 
            isSimulated: true, 
            error: null, 
            audit: generateSimulatedAudit(name, category, 'perplexity'),
            citations: ["https://simulated-perplexity-web-index.ai/sources"]
          };
        }
        try {
          const { audit, citations } = await fetchPerplexityAudit(name, category, description, keys.perplexity);
          return { modelName: 'perplexity', isSimulated: false, error: null, audit, citations };
        } catch (err: any) {
          console.error("Perplexity audit error, falling back to simulation:", err);
          return { 
            modelName: 'perplexity', 
            isSimulated: true, 
            error: err.message || "Failed API call", 
            audit: generateSimulatedAudit(name, category, 'perplexity'),
            citations: ["https://simulated-perplexity-web-index.ai/sources"]
          };
        }
      })()
    ];

    const resultsArray = await Promise.all(modelPromises);
    const modelDetails: Record<string, ModelAuditResult> = {};
    resultsArray.forEach(res => {
      modelDetails[res.modelName] = res;
    });

    // -------------------------------------------------------------
    // SERVER-SIDE DERIVATIONS & AGGREGATIONS (DBMS-Style Processing)
    // -------------------------------------------------------------

    // Get active audit outputs
    const activeAudits = resultsArray
      .filter(res => res.audit !== null)
      .map(res => ({
        modelName: res.modelName,
        audit: res.audit as LlmAeoAudit
      }));

    if (activeAudits.length === 0) {
      return NextResponse.json({ error: "Failed to gather audits from any model." }, { status: 500 });
    }

    // 1. Model-Specific Calculated Columns
    const processedModelAudits = activeAudits.map(({ modelName, audit }) => {
      const freq = audit.visibility.referenceFrequency || 'none';
      const freqScore = FREQUENCY_MAPPING[freq] ?? 0;
      
      // Calculate visibilityIndex = (frequencyScore * 0.6) + (factualAccuracyScore * 0.4)
      const visibilityIndex = Math.round((freqScore * 0.6) + (audit.visibility.factualAccuracyScore * 0.4));
      
      // Map sentiment raw score to a classification label
      let sentimentLabel: 'positive' | 'neutral' | 'negative' = 'neutral';
      if (audit.sentiment.rawScore >= 70) sentimentLabel = 'positive';
      else if (audit.sentiment.rawScore < 40) sentimentLabel = 'negative';

      return {
        modelName,
        visibilityIndex,
        sentimentLabel,
        rawAudit: audit
      };
    });

    // 2. Global Aggregations (Averages across models)
    const validAuditsCount = processedModelAudits.length;
    const totalVisibility = processedModelAudits.reduce((acc, curr) => acc + curr.visibilityIndex, 0);
    const totalSentiment = processedModelAudits.reduce((acc, curr) => acc + curr.rawAudit.sentiment.rawScore, 0);
    const totalRecommendation = processedModelAudits.reduce((acc, curr) => acc + curr.rawAudit.recommendations.probabilityOfRecommendation, 0);

    const averageVisibilityIndex = Math.round(totalVisibility / validAuditsCount);
    const averageSentimentScore = Math.round(totalSentiment / validAuditsCount);
    const averageRecommendationScore = Math.round(totalRecommendation / validAuditsCount);
    const overallAeoScore = Math.round((averageVisibilityIndex + averageSentimentScore) / 2);

    // Global sentiment classification label derived from average score
    let overallSentimentLabel: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (averageSentimentScore >= 70) overallSentimentLabel = 'positive';
    else if (averageSentimentScore < 40) overallSentimentLabel = 'negative';

    // 3. Merging List Attributes (Deduplication)
    const competitorsSet = new Set<string>();
    const keyAssociationsSet = new Set<string>();
    const attributesAccumulator: Record<string, { total: number; count: number }> = {};

    processedModelAudits.forEach(({ rawAudit }) => {
      // Competitors
      if (Array.isArray(rawAudit.competitors)) {
        rawAudit.competitors.forEach(comp => {
          if (comp) competitorsSet.add(comp.trim());
        });
      }

      // Key Associations (derived from keyword lists or attributes)
      if (Array.isArray(rawAudit.attributes)) {
        rawAudit.attributes.forEach(attr => {
          const name = attr.name.toLowerCase().trim();
          if (name) {
            if (!attributesAccumulator[name]) {
              attributesAccumulator[name] = { total: 0, count: 0 };
            }
            attributesAccumulator[name].total += attr.perceptionScore;
            attributesAccumulator[name].count += 1;
          }
        });
      }
    });

    // Compile average attribute scores
    const averageAttributes = Object.entries(attributesAccumulator).map(([name, data]) => ({
      name,
      averageScore: Math.round(data.total / data.count)
    }));

    // 4. SWOT Grid Synthesis (Programming compilation of SWOT quadrants)
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const opportunities: string[] = [];
    const threats: string[] = [];

    processedModelAudits.forEach(({ modelName, rawAudit }) => {
      // Strengths <= Pros
      if (Array.isArray(rawAudit.sentiment.pros)) {
        rawAudit.sentiment.pros.forEach(pro => {
          strengths.push(`[${modelName}] ${pro.point} (${pro.category})`);
        });
      }

      // Weaknesses <= Cons
      if (Array.isArray(rawAudit.sentiment.cons)) {
        rawAudit.sentiment.cons.forEach(con => {
          weaknesses.push(`[${modelName}] ${con.point} (${con.category})`);
        });
      }

      // Opportunities <= Optimization Suggestions
      if (Array.isArray(rawAudit.aeoOptimizationSuggestions)) {
        rawAudit.aeoOptimizationSuggestions.forEach(opt => {
          opportunities.push(`[${modelName}] Improve ${opt.area}: ${opt.details}`);
        });
      }

      // Threats <= Low placement rank or competitor comparison points
      if (rawAudit.recommendations.typicalPlacementRank === 0 && rawAudit.visibility.isKnown) {
        threats.push(`[${modelName}] Brand known but model actively chooses not to place it in recommendation lists.`);
      }
    });

    // Capture direct competitors as structural Threats
    Array.from(competitorsSet).slice(0, 4).forEach(comp => {
      threats.push(`Competitor Brand "${comp}" is frequently associated/recommended instead in search queries.`);
    });

    // 5. Consolidated Actionable Recommendations Checklist
    const actionableRoadmap = processedModelAudits.flatMap(({ rawAudit }) => 
      (rawAudit.aeoOptimizationSuggestions || []).map(opt => ({
        sourceModel: opt.area,
        details: opt.details
      }))
    );

    // Form final Response Object
    const finalReport = {
      metadata: {
        timestamp: new Date().toISOString(),
        productName: name,
        productCategory: category,
        productDescription: description || '',
        modelsAudited: resultsArray.map(r => r.modelName),
        activeHostKeys: {
          openai: !!keys.openai,
          gemini: !!keys.gemini,
          claude: !!keys.claude,
          perplexity: !!keys.perplexity
        }
      },
      overview: {
        overallAeoScore,              // Programmatically derived compound index
        averageVisibilityIndex,       // Programmatically derived
        averageSentimentScore,        // Programmatically derived
        overallSentimentLabel,        // Programmatically derived classification
        averageRecommendationScore,   // Programmatically derived likelihood
        consolidatedCompetitors: Array.from(competitorsSet),
        averageAttributes,
        swotAnalysis: {
          strengths: Array.from(new Set(strengths)),
          weaknesses: Array.from(new Set(weaknesses)),
          opportunities: Array.from(new Set(opportunities)),
          threats: Array.from(new Set(threats))
        },
        actionableRoadmap
      },
      modelDetails: Object.keys(modelDetails).reduce((acc, key) => {
        const item = modelDetails[key];
        const processed = processedModelAudits.find(p => p.modelName === key);

        acc[key] = {
          isSimulated: item.isSimulated,
          error: item.error,
          citations: item.citations || [],
          // Include computed model ratings alongside raw data
          computedMetrics: processed ? {
            visibilityIndex: processed.visibilityIndex,
            sentimentLabel: processed.sentimentLabel
          } : null,
          rawAudit: item.audit
        };
        return acc;
      }, {} as Record<string, any>)
    };

    return NextResponse.json(finalReport, { status: 200 });

  } catch (err: any) {
    console.error("Error in /api/aeo POST route:", err);
    return NextResponse.json({ error: "Internal Server Error", details: err.message || err }, { status: 500 });
  }
}
