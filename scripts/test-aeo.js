/**
 * Simple Terminal client to test the AEO Auditing Router
 * Usage:
 *   node scripts/test-aeo.js [BrandName] [Category] [Description]
 * Example:
 *   node scripts/test-aeo.js "Linear" "Project Management Software" "A fast tool for issue tracking"
 */

const name = process.argv[2] || "Linear";
const category = process.argv[3] || "Project Management Software";
const description = process.argv[4] || "A high-performance, keyboard-first task manager for engineering teams.";

console.log(`\n======================================================`);
console.log(`🚀 TRIGGERING AEO AUDIT VIA NEXT.JS ROUTER`);
console.log(`📦 Brand/Product: "${name}"`);
console.log(`📂 Category:      "${category}"`);
console.log(`📝 Description:   "${description}"`);
console.log(`======================================================\n`);

async function runTest() {
  try {
    const url = 'http://localhost:3000/api/aeo';
    console.log(`Sending POST request to ${url}...`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, category, description })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`\n❌ ROUTER RETURNED ERROR STATUS ${response.status}:`);
      console.error(errorText);
      return;
    }

    const data = await response.json();

    console.log(`\n✅ AUDIT COMPLETE! STRUCTURED JSO RECIEVED:\n`);
    console.log(JSON.stringify(data, null, 2));
    console.log(`\n======================================================`);
    console.log(`🎯 AEO Score: ${data.overview.overallAeoScore}/100`);
    console.log(`💡 Sentiment: ${data.overview.averageSentimentScore}/100 (${data.overview.overallSentimentLabel.toUpperCase()})`);
    console.log(`🔍 Visibility Index: ${data.overview.averageVisibilityIndex}/100`);
    console.log(`🤝 Competitors Mentioned: ${data.overview.consolidatedCompetitors.join(', ') || 'None'}`);
    console.log(`======================================================\n`);

  } catch (error) {
    console.error(`\n❌ REQUEST FAILED:`);
    console.error(error.message);
    console.log(`\n👉 Make sure your Next.js local server is running (e.g. pnpm run dev)`);
  }
}

runTest();
