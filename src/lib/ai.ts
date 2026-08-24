let openaiClient: any = null;

function getOpenAI() {
  if (openaiClient) return openaiClient;
  const OpenAI = require("openai").default;
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return openaiClient;
}

export async function generateProductDescription(name: string, type: string, origin: string, specs: string) {
  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert gemologist and copywriter for African Gems & Minerals, a premium auction house specializing in fine minerals, gemstones, crystals, fossils, and mining antiques. Write compelling, accurate product descriptions that highlight rarity, origin, and quality. Use British English spelling. Keep descriptions between 100-200 words. Do not use emojis.`
      },
      {
        role: "user",
        content: `Write a product description for:
Name: ${name}
Category: ${type}
Origin: ${origin}
Specifications: ${specs}

Write a compelling description that would attract collectors and enthusiasts.`
      }
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
}

export async function generateSocialCaption(postType: string, productName: string, productDescription: string) {
  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a social media manager for African Gems & Minerals, a premium gemstone auction house. Create engaging social media captions that drive engagement and sales. Use relevant hashtags. Keep captions concise but compelling. Use British English.`
      },
      {
        role: "user",
        content: `Create a social media caption for:
Post type: ${postType}
Product: ${productName}
Description: ${productDescription}

Include 5-8 relevant hashtags at the end. Make it engaging and shareable.`
      }
    ],
    temperature: 0.8,
    max_tokens: 300,
  });

  return response.choices[0].message.content;
}

export async function chatWithBot(message: string, context: string) {
  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful customer support assistant for African Gems & Minerals, a premium gemstone auction house based in South Africa. We sell fine minerals, gemstones, crystals, fossils, and mining antiques through auctions and direct sales.

Key information:
- We accept payments via Yoco (credit/debit cards)
- Shipping is available worldwide with insurance
- All items are authenticated by our expert team
- Auctions run online with real-time bidding
- We buy collections - contact us for valuations
- Customer support email: info@africangems.co.za
- Based in South Africa, serving collectors worldwide

Be helpful, professional, and knowledgeable about gemstones and minerals. If you don't know something specific, offer to connect them with our team. Keep responses concise (2-3 sentences max).`
      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.6,
    max_tokens: 200,
  });

  return response.choices[0].message.content;
}
