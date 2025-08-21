import React from 'react';

const SearchBar = ({ onSearchChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for products..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;