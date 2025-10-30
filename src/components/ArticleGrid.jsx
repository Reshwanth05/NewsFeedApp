import React from 'react';
import { formatDate } from '../utils/formatDate';
const ArticleGrid = ({ articles }) => (
<div className="article-grid">
 {articles.map((article, idx) => (
<article
key={idx}
className="article-card"
onClick={() => window.open(article.url, '_blank')}
>
<div className="article-image-container">
 <img
src={article.urlToImage || 'https://via.placeholder.com/400x300?text=No+Image'}
alt={article.title}
className="article-image"
/>
 <span className="article-source">{article.source.name}</span>
</div>
<div className="article-content">
 <h3 className="article-title">{article.title}</h3>
 <p className="article-description">
 {article.description || 'No description available.'}
 </p>
 <div className="article-footer">
 <span className="article-date">📅 {formatDate(article.publishedAt)}</span>
 <span className="article-link">Read more →</span>
 </div>
</div>
 </article>
))}
 </div>
);
export default ArticleGrid;