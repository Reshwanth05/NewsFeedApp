import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp } from 'lucide-react';

import Header from './Header';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import NewsCarousel from './NewsCarousel';
import FilterSection from './FilterSection';
import ArticleGrid from './ArticleGrid';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';
import Footer from './Footer';
import './newsfeedapp.css'; 
import './searchbar.css';   
import './carousel.css';   
import './filter.css';   
import './pagination.css'; 
import './Footer.css';
import './header.css';
import './articlegrid.css';
import './loading.css';
import './categorytabs.css';

const NEWS_API_KEY = '75fe176740bb4a04806e06e32a243307'; 
const API_BASE = 'https://newsapi.org/v2';
const NewsFeedApp = () => {
     const [articles, setArticles] = useState([]);
 const [topHeadlines, setTopHeadlines] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [searchQuery, setSearchQuery] = useState('');
 const [searchHistory, setSearchHistory] = useState([]);
 const [showHistory, setShowHistory] = useState(false);
 const [activeCategory, setActiveCategory] = useState('general');
 const [currentPage, setCurrentPage] = useState(1);
 const [totalResults, setTotalResults] = useState(0);
 const [timeFilter, setTimeFilter] = useState('all');
 const [regionFilter, setRegionFilter] = useState('global');
 const [sortBy, setSortBy] = useState('publishedAt');
 // Refs for scrolling
 const resultsRef = useRef(null);
 const filterRef = useRef(null);
 useEffect(() => {
     loadSearchHistory();
 }, []);
 useEffect(() => {
     fetchTopHeadlines();
 }, []);
 useEffect(() => {
     if (!searchQuery) {
     fetchNewsByCategory(activeCategory, false); 
 }
 }, [activeCategory, currentPage]); 
 const loadSearchHistory = async () => {
     try {
     const result = await window.storage.get('search-history');
 if (result && result.value) {
     setSearchHistory(JSON.parse(result.value));
 }
 } catch (error) {
     console.log('No search history found');
 }
 };
 const fetchTopHeadlines = async () => {
     try {
     const response = await fetch(`${API_BASE}/top-headlines?country=us&pageSize=5&apiKey=${NEWS_API_KEY}`);
 const data = await response.json();
 if (data.status === 'ok') {
     setTopHeadlines(data.articles);
 }
 } catch (err) {
     console.error('Error fetching headlines:', err);
 }
 };
 const fetchNewsByCategory = async (category, shouldScroll = false) => {
     setLoading(true);
 setError(null);
 try {
     const country = regionFilter === 'national' ? 'us' : regionFilter === 'regional' ? 'in' : '';
 const countryParam = country ? `&country=${country}` : '';
 const response = await fetch(
     `${API_BASE}/top-headlines?category=${category}${countryParam}&page=${currentPage}&pageSize=12&apiKey=${NEWS_API_KEY}`
 );
 const data = await response.json();
 if (data.status === 'ok') {
     let filtered = applyTimeFilter(data.articles);
 setArticles(filtered);
 setTotalResults(data.totalResults);
 if (shouldScroll) {
     setTimeout(() => scrollToResults(), 300);
 }
 } else {
     setError('Failed to fetch news. Please try again.');
 }
 } catch (err) {
     setError('Something went wrong. Please check your connection.');
 } finally {
     setLoading(false);
 }
 };
 const searchNews = async (query) => {
     if (!query.trim()) return;
 setLoading(true);
 setError(null);
 try {
     const response = await fetch(
     `${API_BASE}/everything?q=${encodeURIComponent(query)}&page=${currentPage}&pageSize=12&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`
 );
 const data = await response.json();
 if (data.status === 'ok') {
     let filtered = applyTimeFilter(data.articles);
 setArticles(filtered);
 setTotalResults(data.totalResults);
 saveSearchHistory(query);
 setTimeout(() => scrollToResults(), 300);
 } else {
     setError('No results found. Try a different search term.');
 }
 } catch (err) {
     setError('Something went wrong. Please try again.');
 } finally {
     setLoading(false);
 }
 };
 const applyTimeFilter = (articles) => {
     if (timeFilter === 'all') return articles;
 const now = new Date();
 return articles.filter(article => {
     const articleDate = new Date(article.publishedAt);
 const diffTime = Math.abs(now - articleDate);
 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 if (timeFilter === '24h') return diffDays <= 1;
 if (timeFilter === 'week') return diffDays <= 7;
 if (timeFilter === 'month') return diffDays <= 30;
 return true;
 });
 };
 const saveSearchHistory = async (query) => {
     const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
 setSearchHistory(newHistory);
 try {
     await window.storage.set('search-history', JSON.stringify(newHistory));
 } catch (err) {
     console.log('Failed to save search history');
 }
 };
 const handleSearch = (query) => {
     setSearchQuery(query);
 searchNews(query);
 setShowHistory(false);
 setCurrentPage(1);
 };
 const handleHistoryClick = (query) => {
     setSearchQuery(query);
 searchNews(query);
 setShowHistory(false);
 };
 const clearSearch = () => {
     setSearchQuery('');
 setShowHistory(false);
 setCurrentPage(1);
 fetchNewsByCategory(activeCategory);
 };
 const handleCategoryChange = (category) => {
     setActiveCategory(category);
 setCurrentPage(1);
 setSearchQuery('');
 setTimeout(() => fetchNewsByCategory(category, true), 100);
 };
 const handleFilterChange = (filterType, value) => {
     if (filterType === 'time') setTimeFilter(value);
 if (filterType === 'region') setRegionFilter(value);
 if (filterType === 'sort') setSortBy(value);
 setCurrentPage(1);
 if (searchQuery) {
     setTimeout(() => searchNews(searchQuery), 100);
 } else {
     setTimeout(() => fetchNewsByCategory(activeCategory, true), 100);
 }
 };
 const scrollToResults = () => {
     if (resultsRef.current) {
     const headerHeight = 80;
 const elementPosition = resultsRef.current.getBoundingClientRect().top;
 const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
 window.scrollTo({
     top: offsetPosition,
 behavior: 'smooth'
 });
 }
 };
 return (
 <div className="app-container">
 <Header />
 <div className="main-content">
 <div className="sticky-search-wrapper">
 <SearchBar
 searchQuery={searchQuery}
 setSearchQuery={setSearchQuery}
 showHistory={showHistory}
 setShowHistory={setShowHistory}
 searchHistory={searchHistory}
 onSearch={handleSearch}
 onHistoryClick={handleHistoryClick}
 onClear={clearSearch}
 />
 </div>
 <CategoryTabs
 activeCategory={activeCategory}
 onCategoryChange={handleCategoryChange}
 />
 {topHeadlines.length > 0 && !searchQuery && (
 <NewsCarousel headlines={topHeadlines} />
 )}
 {(searchQuery || articles.length > 0) && (
 <div ref={filterRef}>
 <FilterSection
 timeFilter={timeFilter}
 regionFilter={regionFilter}
 sortBy={sortBy}
 onFilterChange={handleFilterChange}
 />
 </div>
 )}
 <div ref={resultsRef}>
 {loading && <LoadingSpinner />}
 . 
 {error && <ErrorMessage message={error} />}
 {!loading && !error && articles.length > 0 && (
 <>
 <ArticleGrid articles={articles} />
 <Pagination
 currentPage={currentPage}
 onPageChange={setCurrentPage}
 hasMore={articles.length === 12}
 />
 </>
 )}
 {!loading && !error && articles.length === 0 && searchQuery && (
 <div className="no-results">
 <div className="no-results-icon">📰</div>
 <p>No articles found. Try a different search.</p>
 </div>
 )}
 </div>
 </div>
 <Footer />
 </div>
 );
};
export default NewsFeedApp;