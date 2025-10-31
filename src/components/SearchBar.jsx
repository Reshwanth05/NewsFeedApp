import React from 'react';
import { Search } from 'lucide-react'; // Make sure you have 'lucide-react' installed

const SearchBar = ({ searchQuery, setSearchQuery, showHistory, setShowHistory, searchHistory, onSearch, onHistoryClick, onClear }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            e.preventDefault();
            onSearch(searchQuery);
        }
    };

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setShowHistory(true)}
                    onBlur={() => setTimeout(() => setShowHistory(false), 200)} // Delay to allow click
                    placeholder="Search news articles..."
                    className="search-input"
                />
                <div className="search-actions">
                    {searchQuery && (
                        <button onClick={onClear} className="clear-btn" aria-label="Clear search">×</button>
                    )}
                    <button onClick={handleSubmit} className="search-btn" type="button" aria-label="Search">
                        <Search size={20} />
                    </button>
                </div>
            </div>
            {showHistory && searchHistory.length > 0 && (
                <div className="search-history">
                    {searchHistory.map((query, idx) => (
                        <button
                            key={idx}
                            // Use onMouseDown to trigger before onBlur
                            onMouseDown={() => onHistoryClick(query)} 
                            className="history-item"
                        >
                            <span className="history-icon" aria-hidden>🕐</span>
                            <span>{query}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;