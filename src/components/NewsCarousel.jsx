import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils/formatDate';

const NewsCarousel = ({ headlines }) => {
     const [currentIndex, setCurrentIndex] = useState(0);

     useEffect(() => {
        if (headlines.length === 0) return;
        const timer = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % headlines.length);
        }, 5000);
        return () => clearInterval(timer);
     }, [headlines.length]);

     const next = () => setCurrentIndex((prev) => (prev + 1) % headlines.length);
     const prev = () => setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length);

     if (!headlines || headlines.length === 0 || !headlines[currentIndex]) {
       return null; 
     }

     const currentHeadline = headlines[currentIndex];

     return (
     <div className="carousel-container">
     <div className="carousel-slide">
       <img
        src={currentHeadline.urlToImage || 'https://via.placeholder.com/1200x600?text=News'}
        alt={currentHeadline.title}
        className="carousel-image"
       />
     <div className="carousel-overlay"></div>
     <div className="carousel-content">
       <span className="breaking-badge">BREAKING NEWS</span>
       <h2 className="carousel-title">{currentHeadline.title}</h2>
       <p className="carousel-description">{currentHeadline.description}</p>
       <div className="carousel-meta">
         <span>{currentHeadline.source?.name || 'Unknown Source'}</span>
         <span>•</span>
         <span>{formatDate(currentHeadline.publishedAt)}</span>
       </div>
     </div>
     </div>
       <button onClick={prev} className="carousel-btn carousel-btn-left">‹</button>
       <button onClick={next} className="carousel-btn carousel-btn-right">›</button>
     <div className="carousel-indicators">
       {headlines.map((_, idx) => (
       <button
        key={idx}
        onClick={() => setCurrentIndex(idx)}
        className={`indicator ${idx === currentIndex ? 'active' : ''}`}
        aria-label={`Go to slide ${idx + 1}`}
       />
       ))}
     </div>
     </div>
     );
};

export default NewsCarousel;