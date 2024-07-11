// src/components/Sort.js
import React from 'react';

const Sort = ({ setSortOption }) => {
  return (
    <div className="sort">
      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort by</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
