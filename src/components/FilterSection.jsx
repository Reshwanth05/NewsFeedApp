import React from 'react';

const FilterSection = ({ timeFilter, regionFilter, sortBy, onFilterChange }) => (
 <div className="filter-section">
 <h3 className="filter-title">🔍 Filter Results</h3>
 <div className="filter-grid">
 <div className="filter-item">
 <label className="filter-label">Time Range</label>
 <select
 value={timeFilter}
 onChange={(e) => onFilterChange('time', e.target.value)}
 className="filter-select"
 >
 <option value="all">All Time</option>
 <option value="24h">Past 24 Hours</option>
 <option value="week">Past Week</option>
 <option value="month">Past Month</option>
 </select>
 </div>
 <div className="filter-item">
 <label className="filter-label">Region</label>
 <select
 value={regionFilter}
 onChange={(e) => onFilterChange('region', e.target.value)}
 className="filter-select"
 >
 <option value="global">Global</option>
 <option value="national">National (US)</option>
 <option value="regional">Regional (India)</option>
 </select>
 </div>
 <div className="filter-item">
 <label className="filter-label">Sort By</label>
 <select
 value={sortBy}
 onChange={(e) => onFilterChange('sort', e.target.value)}
 className="filter-select"
 >
 <option value="publishedAt">Most Recent</option>
 <option value="relevancy">Most Relevant</option>
 <option value="popularity">Most Popular</option>
 </select>
 </div>
 </div>
 </div>
);

export default FilterSection;