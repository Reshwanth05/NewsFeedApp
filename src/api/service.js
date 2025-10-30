const API_KEY = '75fe176740bb4a04806e06e32a243307';
const BASE_URL = 'https://newsapi.org/v2';

// 🔹 Fetch top headlines
export async function fetchTopHeadlines() {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&pageSize=5&apiKey=${API_KEY}`
    );
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
    // region mapping
    const country = region === 'national' ? 'us' : region === 'regional' ? 'in' : 'us';
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=12&apiKey=${API_KEY}`
    );
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
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=12&sortBy=${sortBy}&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error searching news:', err);
    return { status: 'error', message: err.message };
  }
}
