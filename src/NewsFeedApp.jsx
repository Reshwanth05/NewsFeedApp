import React, { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import NewsCarousel from './components/NewsCarousel';
import FilterSection from './components/FilterSection';
import ArticleGrid from './components/ArticleGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

import './components/newsfeedapp.css';
import './components/searchbar.css';
import './components/carousel.css';
import './components/filter.css';
import './components/pagination.css';
import './components/Footer.css';
import './components/header.css';
import './components/articlegrid.css';
import './components/loading.css';
import './components/categorytabs.css';

// Import our local proxy service
import { fetchTopHeadlines, fetchNewsByCategory, searchNews } from "./api/service";

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

  const resultsRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    // We don't have window.storage in React, assuming this was
    // for a specific environment. Using localStorage instead.
    loadSearchHistory();
  }, []);

  useEffect(() => {
    getTopHeadlines();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      getNewsByCategory(activeCategory, false);
    }
  }, [activeCategory, currentPage]);

  const loadSearchHistory = () => {
    try {
      const history = localStorage.getItem('search-history');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch {
      console.log('No search history found');
    }
  };

  const getTopHeadlines = async () => {
    try {
      const data = await fetchTopHeadlines();
      if (data.status === 'ok') {
        setTopHeadlines(data.articles);
      }
    } catch (err) {
      console.error('Error fetching headlines:', err);
    }
  };

  const getNewsByCategory = async (category, shouldScroll = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNewsByCategory(category, currentPage, regionFilter);
      if (data.status === 'ok') {
        const filtered = applyTimeFilter(data.articles);
        setArticles(filtered);
        setTotalResults(data.totalResults);
        if (shouldScroll) setTimeout(() => scrollToResults(), 300);
      } else {
        setError('Failed to fetch news. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const searchForNews = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchNews(query, currentPage, sortBy);
      if (data.status === 'ok') {
        const filtered = applyTimeFilter(data.articles);
        setArticles(filtered);
        setTotalResults(data.totalResults);
        saveSearchHistory(query);
        setTimeout(() => scrollToResults(), 300);
      } else {
        setError('No results found. Try a different search term.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyTimeFilter = (articles) => {
    if (timeFilter === 'all') return articles;
    const now = new Date();
    return articles.filter((article) => {
      const articleDate = new Date(article.publishedAt);
      const diffTime = Math.abs(now - articleDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (timeFilter === '24h') return diffDays <= 1;
      if (timeFilter === 'week') return diffDays <= 7;
      if (timeFilter === 'month') return diffDays <= 30;
      return true;
    });
  };

  const saveSearchHistory = (query) => {
    const newHistory = [query, ...searchHistory.filter((h) => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    try {
      // Using localStorage
      localStorage.setItem('search-history', JSON.stringify(newHistory));
    } catch {
      console.log('Failed to save search history');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchForNews(query);
    setShowHistory(false);
    setCurrentPage(1);
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    searchForNews(query);
    setShowHistory(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowHistory(false);
    setCurrentPage(1);
    getNewsByCategory(activeCategory);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setSearchQuery('');
    setTimeout(() => getNewsByCategory(category, true), 100);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'time') setTimeFilter(value);
    if (filterType === 'region') setRegionFilter(value);
    if (filterType === 'sort') setSortBy(value);
    setCurrentPage(1);
    if (searchQuery) {
      setTimeout(() => searchForNews(searchQuery), 100);
    } else {
      setTimeout(() => getNewsByCategory(activeCategory, true), 100);
    }
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      const headerHeight = 80;
      const elementPosition = resultsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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

        <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

        {topHeadlines.length > 0 && !searchQuery && <NewsCarousel headlines={topHeadlines} />}

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
          {error && <ErrorMessage message={error} />}
          {!loading && !error && articles.length > 0 && (
            <>
              <ArticleGrid articles={articles} />
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                hasMore={articles.length === 12} // Assuming 12 is your page size
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