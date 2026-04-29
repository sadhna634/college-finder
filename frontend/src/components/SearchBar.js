import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, selectedCity, setSelectedCity, cities }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search colleges by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-wrapper">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="city-filter"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;