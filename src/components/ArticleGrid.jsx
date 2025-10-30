import React from "react";
import { formatDate } from "../utils/formatDate";
import "./articlegrid.css";

const ArticleGrid = ({ articles }) => {
  return (
    <div className="article-grid">
      {articles.map((article, idx) => {
        const {
          url,
          urlToImage,
          title,
          description,
          source,
          publishedAt,
        } = article;

        const imageSrc =
          urlToImage && urlToImage.startsWith("http")
            ? urlToImage
            : "https://via.placeholder.com/400x300?text=No+Image";

        const articleSource = source?.name || "Unknown Source";

        return (
          <article
            key={idx}
            className="article-card"
            onClick={() => window.open(url, "_blank")}
          >
            {/* --- IMAGE SECTION --- */}
            <div className="article-image-container">
              <img
                src={imageSrc}
                alt={title || "News article"}
                className="article-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
              <span className="article-source">{articleSource}</span>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="article-content">
              <h3 className="article-title">
                {title || "Untitled Article"}
              </h3>

              <p className="article-description">
                {description || "No description available."}
              </p>

              <div className="article-footer">
                <span className="article-date">
                  📅 {formatDate(publishedAt)}
                </span>
                <span className="article-link">Read more →</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleGrid;
