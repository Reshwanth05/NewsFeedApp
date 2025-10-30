import React from 'react';
const Pagination = ({ currentPage, onPageChange, hasMore }) => (
<div className="pagination">
<button
onClick={() => onPageChange(prev => Math.max(1, prev - 1))}
disabled={currentPage === 1}
className="pagination-btn"
>
Previous
</button>
<span className="pagination-page">Page {currentPage}</span>
<button
onClick={() => onPageChange(prev => prev + 1)}
disabled={!hasMore}
className="pagination-btn pagination-btn-next"
>
Next
</button>
</div>
);
export default Pagination;