// Check if we are in development mode
const isDevelopment = import.meta.env.DEV;

// In Dev: Use the Vite proxy path /api-proxy
// In Prod: Use the Vercel serverless functions path /api
const API_BASE_URL = isDevelopment ? '/api-proxy' : '/api';

// In Dev: Get API key from .env.local
// In Prod: The key is handled securely by the Vercel function
const DEV_API_KEY_PARAM = isDevelopment
  ? `&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
  : '';

// 🔹 Fetch top headlines
export async function fetchTopHeadlines() {
  try {
    // In Dev: /api-proxy/top-headlines?country=us...&apiKey=...
    // In Prod: /api/top-headlines
    const url = isDevelopment
      ? `${API_BASE_URL}/top-headlines?country=us&pageSize=5${DEV_API_KEY_PARAM}`
      : `${API_BASE_URL}/top-headlines`; // Prod function handles params

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching headlines:', err);
    return { status: 'error', message: err.message };
  }
}

// 🔹 Fetch news by category
export async function fetchNewsByCategory(category = 'general', page = 1, region = 'global') {
  try {
    // region mapping (needed for dev proxy)
    const country = region === 'national' ? 'us' : region === 'regional' ? 'in' : 'us';
    
    // In Dev: /api-proxy/top-headlines?category=...&apiKey=...
    // In Prod: /api/category-news?category=...
    const url = isDevelopment
      ? `${API_BASE_URL}/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=12${DEV_API_KEY_PARAM}`
      : `${API_BASE_URL}/category-news?category=${category}&page=${page}&region=${region}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching category news:', err);
    return { status: 'error', message: err.message };
  }
}

// 🔹 Search for news by keyword
export async function searchNews(query, page = 1, sortBy = 'publishedAt') {
  try {
    // In Dev: /api-proxy/everything?q=...&apiKey=...
    // In Prod: /api/search?q=...
    const url = isDevelopment
      ? `${API_BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=12&sortBy=${sortBy}${DEV_API_KEY_PARAM}`
      : `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&sortBy=${sortBy}`;
      
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error searching news:', err);
    return { status: 'error', message: err.message };
  }
}