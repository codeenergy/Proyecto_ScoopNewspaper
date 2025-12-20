import { Article, Category } from '../types';
import { MOCK_ARTICLES } from '../constants';

const GEMINI_API_KEY = 'AIzaSyDwDy3e_pHl4qoUcFu7kZCjdPX37BdLVcQ';
const NEWSDATA_API_KEY = 'pub_31a1811a2f7543bf9c7103a819094a23';

// Map language codes for NewsData.io
const languageMap: Record<string, string> = {
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'ar': 'ar'
};

// Get language name for Gemini prompts
const languageNames: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish (Spain/Latin America)',
  'fr': 'French',
  'ar': 'Arabic'
};

// Cache for translated articles to avoid re-translating
const translationCache: Map<string, Article[]> = new Map();

export async function fetchNews(
  category: Category | 'All',
  searchQuery: string,
  language: string = 'en',
  country: string = 'global'
): Promise<Article[]> {
  try {
    // Check cache first for translations
    const cacheKey = `${category}-${searchQuery}-${language}-${country}`;
    if (translationCache.has(cacheKey)) {
      console.log('Using cached articles');
      return translationCache.get(cacheKey)!;
    }

    const categoryParam = category === 'All' ? 'top' : category.toLowerCase();
    const countryParam = country === 'global' ? '' : country;
    const newsApiLang = languageMap[language] || 'en';

    let allArticles: any[] = [];

    // Try NewsData.io first (works in production)
    try {
      console.log('Fetching from NewsData.io...');

      // If searching, fetch single query with max size
      if (searchQuery) {
        const newsDataUrl = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(searchQuery)}&language=${newsApiLang}&size=10`;
        const newsDataResponse = await fetch(newsDataUrl);
        if (newsDataResponse.ok) {
          const newsDataJson = await newsDataResponse.json();
          if (newsDataJson.results && newsDataJson.results.length > 0) {
            console.log(`NewsData.io returned ${newsDataJson.results.length} articles for search`);
            allArticles = newsDataJson.results.map((item: any) => ({
              title: item.title,
              description: item.description,
              author: item.creator?.[0] || item.source_id,
              publishedAt: item.pubDate,
              content: item.content || item.description,
              urlToImage: item.image_url,
              url: item.link,
              source: { name: item.source_id }
            }));
          }
        }
      } else {
        // Make multiple parallel requests for different categories to maximize content
        const categories = category === 'All'
          ? ['top', 'technology', 'business', 'science', 'sports', 'entertainment', 'health', 'world']
          : [categoryParam];

        const fetchPromises = categories.map(async (cat) => {
          try {
            const url = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&language=${newsApiLang}&category=${cat}${countryParam ? `&country=${countryParam}` : ''}&size=10`;
            const response = await fetch(url);
            if (response.ok) {
              const json = await response.json();
              if (json.results && json.results.length > 0) {
                console.log(`NewsData.io returned ${json.results.length} articles for ${cat}`);
                return json.results.map((item: any) => ({
                  title: item.title,
                  description: item.description,
                  author: item.creator?.[0] || item.source_id,
                  publishedAt: item.pubDate,
                  content: item.content || item.description,
                  urlToImage: item.image_url,
                  url: item.link,
                  source: { name: item.source_id }
                }));
              }
            }
            return [];
          } catch (e) {
            console.log(`NewsData.io failed for ${cat}:`, e);
            return [];
          }
        });

        const results = await Promise.all(fetchPromises);
        allArticles = results.flat();
        console.log(`NewsData.io total: ${allArticles.length} articles from ${categories.length} categories`);
      }
    } catch (e) {
      console.log('NewsData.io failed:', e);
    }

    // Remove duplicates by title
    const uniqueArticles = allArticles.filter((article, index, self) =>
      index === self.findIndex((a) => a.title === article.title)
    );

    if (uniqueArticles.length > 0) {
      console.log(`Processing ${uniqueArticles.length} unique articles`);
      // Map to our format - get up to 200 articles for maximum content
      const newsArticles = uniqueArticles.slice(0, 200).map((item: any, index: number) => ({
        headline: item.title || 'No title',
        subheadline: item.description || '',
        author: item.author || 'Editorial',
        date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
        content: item.content || item.description || 'Content not available.',
        summary: item.description || '',
        imageUrl: item.urlToImage || `https://picsum.photos/seed/news-${index}/800/600`,
        category: category === 'All' ? getCategoryFromSource(item.source?.name) : category,
        location: item.source?.name || 'International',
        sourceUrl: item.url || '',
        sourceName: item.source?.name || 'News Source'
      }));

      // Si el idioma no es inglés, traducir con Gemini
      if (language !== 'en') {
        console.log(`Traduciendo ${newsArticles.length} artículos a ${languageNames[language]}...`);
        const translated = await translateArticlesWithGemini(newsArticles, language);
        translationCache.set(cacheKey, translated);
        // Clear cache after 5 minutes
        setTimeout(() => translationCache.delete(cacheKey), 5 * 60 * 1000);
        return translated;
      }

      return newsArticles;
    }

    // Si ambas APIs fallan, usar Gemini para generar noticias
    console.log('Both APIs failed, using Gemini to generate news...');
    return await generateNewsWithGemini(category, language, country);

  } catch (error) {
    console.error('Error fetching news:', error);
    // Último recurso: usar Gemini
    return await generateNewsWithGemini(category, language, country);
  }
}

// Translate articles using Gemini
async function translateArticlesWithGemini(articles: Article[], language: string): Promise<Article[]> {
  try {
    const languageName = languageNames[language] || 'English';

    // Traducir en lotes de 5 artículos para mejor calidad
    const batchSize = 5;
    const translatedArticles: Article[] = [];

    for (let i = 0; i < articles.length; i += batchSize) {
      const batch = articles.slice(i, i + batchSize);

      const articlesToTranslate = batch.map((a, idx) => ({
        id: idx,
        headline: a.headline,
        subheadline: a.subheadline,
        content: a.content?.substring(0, 500), // Limit content length
        summary: a.summary
      }));

      const prompt = `You are a professional news translator. Translate these ${batch.length} news articles to ${languageName}.
IMPORTANT:
- Translate ALL text naturally and professionally
- Keep news terminology appropriate for the target language
- Return ONLY a valid JSON array, no explanations
- Each object must have: id, headline, subheadline, content, summary

Articles to translate:
${JSON.stringify(articlesToTranslate, null, 2)}

Return the translated JSON array:`;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 8192,
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

          // Try to extract JSON
          const jsonMatch = textContent.match(/\[[\s\S]*?\]/);
          if (jsonMatch) {
            try {
              const translated = JSON.parse(jsonMatch[0]);

              // Combinar traducciones con datos originales
              batch.forEach((original, index) => {
                const translatedItem = translated.find((t: any) => t.id === index) || translated[index];
                if (translatedItem) {
                  translatedArticles.push({
                    ...original,
                    headline: translatedItem.headline || original.headline,
                    subheadline: translatedItem.subheadline || original.subheadline,
                    content: translatedItem.content || original.content,
                    summary: translatedItem.summary || original.summary
                  });
                } else {
                  translatedArticles.push(original);
                }
              });
            } catch (parseError) {
              console.log('JSON parse error, using originals for batch');
              translatedArticles.push(...batch);
            }
          } else {
            translatedArticles.push(...batch);
          }
        } else {
          console.log('Translation API error, using originals for batch');
          translatedArticles.push(...batch);
        }
      } catch (fetchError) {
        console.log('Translation fetch error:', fetchError);
        translatedArticles.push(...batch);
      }

      // Small delay between batches to avoid rate limits
      if (i + batchSize < articles.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`Successfully processed ${translatedArticles.length} articles`);
    return translatedArticles;

  } catch (error) {
    console.error('Error translating with Gemini:', error);
    return articles; // Devolver originales si falla
  }
}

async function generateNewsWithGemini(category: Category | 'All', language: string, country: string = 'global'): Promise<Article[]> {
  try {
    const languageName = languageNames[language] || 'English';
    const countryContext = country !== 'global' ? `Focus on news relevant to ${country}.` : '';
    const today = new Date().toISOString().split('T')[0];

    const categories = category === 'All'
      ? ['World', 'Technology', 'Business', 'Science', 'Sports', 'Arts', 'Health']
      : [category];

    const allArticles: Article[] = [];

    for (const cat of categories) {
      const prompt = `Generate ${category === 'All' ? 5 : 15} realistic news articles in ${languageName} for ${cat} news. ${countryContext}

Return ONLY a JSON array:
[{
  "headline": "Compelling headline",
  "subheadline": "Brief engaging description",
  "author": "Reporter Name",
  "date": "${today}",
  "content": "Full article with 2-3 detailed paragraphs about current events",
  "summary": "TL;DR summary",
  "category": "${cat}",
  "location": "City, Country"
}]

Requirements:
- Current events style (date: ${today})
- Professional journalism tone
- Diverse topics within ${cat}
- No fictional/fantasy content`;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 8192,
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

          const jsonMatch = textContent.match(/\[[\s\S]*?\]/);
          if (jsonMatch) {
            const articles = JSON.parse(jsonMatch[0]);
            articles.forEach((article: any, index: number) => {
              allArticles.push({
                ...article,
                imageUrl: `https://picsum.photos/seed/${cat}-${country}-${index}-${Date.now()}/800/600`
              });
            });
          }
        }
      } catch (e) {
        console.log(`Error generating ${cat} news:`, e);
      }
    }

    if (allArticles.length > 0) {
      return allArticles;
    }

    throw new Error('No articles generated');

  } catch (error) {
    console.error('Error generating with Gemini:', error);
    // Return extended mock articles
    return getExtendedMockArticles(language);
  }
}

// Extended mock articles for fallback
function getExtendedMockArticles(_language: string): Article[] {
  const baseArticles = [...MOCK_ARTICLES];

  // Add more diverse mock articles
  const additionalArticles: Article[] = [
    {
      headline: "Electric Vehicle Sales Surge Globally",
      subheadline: "EV adoption accelerates as battery costs drop significantly",
      author: "Michael Chen",
      date: new Date().toLocaleDateString(),
      content: "Global electric vehicle sales have increased by 40% this quarter, driven by falling battery prices and expanding charging infrastructure. Major automakers are ramping up production to meet unprecedented demand.",
      summary: "EVs are taking over! Sales up 40% as batteries get cheaper.",
      imageUrl: "https://picsum.photos/seed/ev-cars/800/600",
      category: Category.TECH,
      location: "Detroit"
    },
    {
      headline: "World Health Organization Announces New Health Initiative",
      subheadline: "Global program aims to improve healthcare access in developing nations",
      author: "Dr. Lisa Park",
      date: new Date().toLocaleDateString(),
      content: "The WHO has launched a comprehensive health initiative targeting underserved communities worldwide. The $5 billion program will focus on preventive care, vaccination campaigns, and building sustainable healthcare infrastructure.",
      summary: "WHO launches $5B program to bring healthcare to everyone.",
      imageUrl: "https://picsum.photos/seed/health-who/800/600",
      category: Category.SCIENCE,
      location: "Geneva"
    },
    {
      headline: "Tech Giants Report Strong Quarterly Earnings",
      subheadline: "AI investments drive revenue growth across major companies",
      author: "Sarah Williams",
      date: new Date().toLocaleDateString(),
      content: "Leading technology companies have reported better-than-expected earnings, with AI-related products and services driving significant revenue growth. Analysts predict continued momentum as enterprise adoption accelerates.",
      summary: "Big Tech crushing it with AI! Earnings beat expectations.",
      imageUrl: "https://picsum.photos/seed/tech-earnings/800/600",
      category: Category.BUSINESS,
      location: "Silicon Valley"
    },
    {
      headline: "International Sports Federation Announces New Tournament",
      subheadline: "Global competition to feature teams from 50 countries",
      author: "James Rodriguez",
      date: new Date().toLocaleDateString(),
      content: "A new international sports tournament has been announced, bringing together athletes from 50 countries in a month-long competition. The event is expected to draw millions of viewers and boost tourism in host cities.",
      summary: "Huge new global tournament coming! 50 countries competing.",
      imageUrl: "https://picsum.photos/seed/sports-tournament/800/600",
      category: Category.SPORTS,
      location: "Paris"
    },
    {
      headline: "Breakthrough in Renewable Energy Storage",
      subheadline: "New battery technology promises week-long power storage",
      author: "Dr. Emily Watson",
      date: new Date().toLocaleDateString(),
      content: "Scientists have developed a revolutionary battery technology capable of storing renewable energy for extended periods. This breakthrough could solve one of the biggest challenges in transitioning to clean energy sources.",
      summary: "Game-changing battery tech could store power for a week!",
      imageUrl: "https://picsum.photos/seed/battery-tech/800/600",
      category: Category.SCIENCE,
      location: "Boston"
    },
    {
      headline: "Major Art Exhibition Opens to Record Crowds",
      subheadline: "Immersive digital art experience draws global attention",
      author: "Alexandra Stone",
      date: new Date().toLocaleDateString(),
      content: "A groundbreaking digital art exhibition has opened to unprecedented attendance, featuring interactive installations that blend traditional artistry with cutting-edge technology. Critics praise the innovative approach to experiencing art.",
      summary: "Mind-blowing digital art show breaking attendance records!",
      imageUrl: "https://picsum.photos/seed/digital-art/800/600",
      category: Category.ARTS,
      location: "Tokyo"
    },
    {
      headline: "Global Trade Agreement Reaches Final Stage",
      subheadline: "Economic pact expected to boost international commerce",
      author: "Robert Chang",
      date: new Date().toLocaleDateString(),
      content: "Negotiations for a major international trade agreement have entered their final phase, with diplomats expressing optimism about reaching a comprehensive deal. The agreement could reshape global commerce patterns for decades.",
      summary: "Massive trade deal almost done - could change everything.",
      imageUrl: "https://picsum.photos/seed/trade-deal/800/600",
      category: Category.BUSINESS,
      location: "Brussels"
    },
    {
      headline: "Space Agency Reveals Plans for Lunar Base",
      subheadline: "Permanent moon settlement targeted for next decade",
      author: "Dr. Neil Foster",
      date: new Date().toLocaleDateString(),
      content: "International space agencies have unveiled detailed plans for establishing a permanent human presence on the Moon. The ambitious project involves multiple nations and private companies working together on unprecedented scale.",
      summary: "We're building a moon base! Multiple countries teaming up.",
      imageUrl: "https://picsum.photos/seed/moon-base/800/600",
      category: Category.SCIENCE,
      location: "Houston"
    }
  ];

  return [...baseArticles, ...additionalArticles];
}

function getCategoryFromSource(source?: string): string {
  if (!source) return 'World';
  const s = source.toLowerCase();
  if (s.includes('tech') || s.includes('wired') || s.includes('verge')) return 'Technology';
  if (s.includes('business') || s.includes('financial') || s.includes('economist')) return 'Business';
  if (s.includes('sport') || s.includes('espn')) return 'Sports';
  if (s.includes('science') || s.includes('nature')) return 'Science';
  if (s.includes('art') || s.includes('culture')) return 'Arts';
  return 'World';
}
