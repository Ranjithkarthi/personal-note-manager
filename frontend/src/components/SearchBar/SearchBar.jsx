import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onFilter }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default SearchBar;
