import { Article, Category } from '../types';
import { MOCK_ARTICLES, NEWS_API_KEY } from '../constants';

const GEMINI_API_KEY = 'AIzaSyDwDy3e_pHl4qoUcFu7kZCjdPX37BdLVcQ';

// Map language codes to NewsAPI language codes
const languageMap: Record<string, string> = {
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'ar': 'ar'
};

// Get language name for Gemini prompts
const languageNames: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'ar': 'Arabic'
};

export async function fetchNews(
  category: Category | 'All',
  searchQuery: string,
  language: string = 'en',
  country: string = 'global'
): Promise<Article[]> {
  try {
    // Intentar obtener noticias reales de NewsAPI
    const categoryParam = category === 'All' ? 'general' : category.toLowerCase();
    const countryParam = country === 'global' ? 'us' : country;
    const newsApiLang = languageMap[language] || 'en';

    const baseUrl = searchQuery
      ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=${newsApiLang}&sortBy=publishedAt&pageSize=50`
      : `https://newsapi.org/v2/top-headlines?category=${categoryParam}&country=${countryParam}&pageSize=50`;

    const response = await fetch(`${baseUrl}&apiKey=${NEWS_API_KEY}`);

    if (response.ok) {
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        // Obtener hasta 30 artículos
        const newsArticles = data.articles.slice(0, 60).map((item: any, index: number) => ({
          headline: item.title || 'Sin título',
          subheadline: item.description || '',
          author: item.author || 'Redacción',
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
          content: item.content || item.description || 'Contenido no disponible.',
          summary: item.description || '',
          imageUrl: item.urlToImage || `https://picsum.photos/seed/${index}/800/600`,
          category: category === 'All' ? getCategoryFromSource(item.source?.name) : category,
          location: item.source?.name || 'Internacional'
        }));

        // Si el idioma no es inglés, traducir con Gemini
        if (language !== 'en') {
          console.log(`Traduciendo ${newsArticles.length} artículos a ${languageNames[language]}...`);
          return await translateArticlesWithGemini(newsArticles, language);
        }

        return newsArticles;
      }
    }

    // Si NewsAPI falla, usar Gemini para generar noticias
    console.log('NewsAPI no disponible, usando Gemini para generar noticias...');
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

    // Traducir en lotes de 10 artículos para no exceder límites
    const batchSize = 10;
    const translatedArticles: Article[] = [];

    for (let i = 0; i < articles.length; i += batchSize) {
      const batch = articles.slice(i, i + batchSize);

      const prompt = `Translate these news articles to ${languageName}. Keep the same structure and return ONLY a JSON array:
${JSON.stringify(batch.map(a => ({
  headline: a.headline,
  subheadline: a.subheadline,
  content: a.content,
  summary: a.summary
})))}

Return the translated articles in the exact same JSON array format.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 4096,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        const jsonMatch = textContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const translated = JSON.parse(jsonMatch[0]);

          // Combinar traducciones con datos originales
          batch.forEach((original, index) => {
            if (translated[index]) {
              translatedArticles.push({
                ...original,
                headline: translated[index].headline || original.headline,
                subheadline: translated[index].subheadline || original.subheadline,
                content: translated[index].content || original.content,
                summary: translated[index].summary || original.summary
              });
            } else {
              translatedArticles.push(original);
            }
          });
        } else {
          translatedArticles.push(...batch);
        }
      } else {
        translatedArticles.push(...batch);
      }
    }

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

    const prompt = `Generate 20 realistic and current news articles in ${languageName} for the category: ${category}. ${countryContext}
    Return a JSON array with this exact structure:
    [{
      "headline": "Article headline",
      "subheadline": "Brief description",
      "author": "Author name",
      "date": "2024-11-19",
      "content": "Full article content (2-3 paragraphs)",
      "summary": "Brief summary in casual tone",
      "category": "${category === 'All' ? 'World' : category}",
      "location": "City name"
    }]

    Make them current (today's date: ${new Date().toISOString().split('T')[0]}), realistic, diverse topics, and engaging. No fictional or fantasy content.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('Gemini API error');
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extraer JSON del texto
    const jsonMatch = textContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const articles = JSON.parse(jsonMatch[0]);
      return articles.map((article: any, index: number) => ({
        ...article,
        imageUrl: `https://picsum.photos/seed/${category}-${country}-${index}/800/600`
      }));
    }

    throw new Error('No valid JSON in response');

  } catch (error) {
    console.error('Error generating with Gemini:', error);
    return MOCK_ARTICLES.slice(0, 20);
  }
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
