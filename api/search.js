const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export default async function handler(req, res) {
  const { query, page = 1, sortBy = 'publishedAt' } = req.query;

  if (!query) {
    return res.status(400).json({ status: 'error', message: 'Query is required' });
  }

  try {
    const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=12&sortBy=${sortBy}&apiKey=${API_KEY}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}