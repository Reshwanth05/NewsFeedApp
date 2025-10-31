const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export default async function handler(req, res) {
  // Get query params from our own front-end request
  const { category = 'general', page = 1, region = 'global' } = req.query;

  // region mapping
  const country = region === 'national' ? 'us' : region === 'regional' ? 'in' : 'us';

  try {
    const url = `${BASE_URL}/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=12&apiKey=${API_KEY}`;
    
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