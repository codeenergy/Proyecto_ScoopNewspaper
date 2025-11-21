
import { GoogleGenAI, Type } from "@google/genai";
import { Article, Category, Language, Country } from "../types";
import { MOCK_ARTICLES, NEWS_API_KEY } from "../constants";

// Helper to fetch real news headlines first
const fetchRealHeadlines = async (category: string, query: string, country: Country) => {
  if (!NEWS_API_KEY) return null;
  
  // NewsAPI requires a valid 2-letter country code. 
  // If 'global' is selected, we default to 'us' to get English headlines, 
  // but we will instruct Gemini to treat them as global/international context.
  const apiCountry = country === 'global' ? 'us' : country;

  let url = `https://newsapi.org/v2/top-headlines?country=${apiCountry}&pageSize=5&apiKey=${NEWS_API_KEY}`;
  if (category !== 'All') {
    url += `&category=${category.toLowerCase()}`;
  }
  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    return data.articles;
  } catch (e) {
    console.warn("NewsAPI fetch failed (likely CORS in dev), falling back to Gemini generation.");
    return null;
  }
};

export const fetchNews = async (category: string, query: string, language: Language, country: Country): Promise<Article[]> => {
  const apiKey = process.env.API_KEY;

  // Offline or No Key -> Mock Data
  if (!apiKey || !navigator.onLine) {
    console.warn("Offline or No Gemini Key, using mock data.");
    return new Promise((resolve) => {
        setTimeout(() => resolve(filterMockData(category, query)), 800);
    });
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = 'gemini-2.5-flash';

  // Step 1: Try to get Real Headlines
  const realNews = await fetchRealHeadlines(category, query, country);

  // Define Language Names for the prompt
  const langNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    ar: 'Arabic'
  };
  const targetLang = langNames[language];
  const contextCountry = country === 'global' ? 'International / Global Perspective' : country.toUpperCase();

  let prompt = "";

  if (realNews && realNews.length > 0) {
    // We have real news, ask Gemini to format/expand it
    const headlinesContext = realNews.map((a: any, i: number) => 
      `${i+1}. Title: ${a.title}, Desc: ${a.description || 'No description'}`
    ).join('\n');

    prompt = `
    CRITICAL INSTRUCTION: You are a multilingual newspaper editor. 
    Your task is to take the provided source headlines (which may be in English) and rewriting/translating them into ${targetLang}.
    
    Source Headlines:
    ${headlinesContext}

    Requirements for JSON Output:
    1. Translate 'headline' and 'subheadline' into ${targetLang}.
    2. Write the 'content' (2 paragraphs) in ${targetLang}.
    3. Write the 'summary' (Gen Z style tweet) in ${targetLang}.
    4. Keep 'author' name as is.
    5. 'category': ${category === 'All' ? 'General' : category}.
    6. 'imageUrl': Use a placeholder URL like 'https://picsum.photos/seed/{english_keyword}/800/600'.
    
    Return exactly ${realNews.length} articles.
    `;
  } else {
    // Fallback: Generate fictional news if NewsAPI failed
    prompt = `Generate 5 distinct, realistic news articles.
    
    CRITICAL INSTRUCTION: All output text MUST be written in ${targetLang}.

    Context:
    - Country Context: ${contextCountry}
    - Category: ${category === 'All' ? 'General News' : category}
    - Topic: ${query || 'Current trending topics'}
    
    Requirements:
    - 'headline': Catchy title in ${targetLang}.
    - 'subheadline': Brief context in ${targetLang}.
    - 'content': 2-paragraph news story (80-100 words) in ${targetLang}.
    - 'summary': A 'Gen Z' style short viral tweet/caption with emojis in ${targetLang}.
    - 'author': Realistic name.
    - 'location': City/Country.
    - 'category': One of [World, Technology, Business, Science, Arts, Sports].
    - 'imageUrl': Placeholder 'https://picsum.photos/seed/{english_keyword}/800/600'.
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              subheadline: { type: Type.STRING },
              author: { type: Type.STRING },
              date: { type: Type.STRING },
              content: { type: Type.STRING },
              summary: { type: Type.STRING },
              location: { type: Type.STRING },
              category: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
            },
            required: ["headline", "subheadline", "author", "content", "summary", "imageUrl", "category"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from GenAI");

    return JSON.parse(jsonText) as Article[];

  } catch (error) {
    console.error("Gemini API Error:", error);
    return filterMockData(category, query);
  }
};

const filterMockData = (category: string, query: string): Article[] => {
  let data = [...MOCK_ARTICLES];
  
  if (category !== 'All') {
    data = data.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  
  if (query) {
    const q = query.toLowerCase();
    data = data.filter(a => 
      a.headline.toLowerCase().includes(q) || 
      a.content.toLowerCase().includes(q)
    );
  }
  
  if (data.length === 0) return MOCK_ARTICLES;
  return data;
};
