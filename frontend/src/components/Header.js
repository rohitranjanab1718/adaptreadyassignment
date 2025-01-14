import React, { useState } from 'react';
import "./header.css";
const Header = ({ dishes, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const matches = dishes.filter((dish) =>
        [dish.name, ...dish.ingredients, dish.state].some((attr) =>
          attr.toLowerCase().includes(value.toLowerCase())
        )
      );
      setSuggestions(matches.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (name) => {
    onSearch(name);
    setQuery('');
    setSuggestions([]);
  };

  const navigate = () => {
    const basePath = window.location.origin; // Get the base URL
    console.log(basePath);
    window.location.assign(`${basePath}/dishSuggester`);
  };

  return (
    <header>
      <input
        type="text"
        placeholder="Search dishes..."
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((dish) => (
            <li key={dish.name} onClick={() => handleSelect(dish.name)}>
              {dish.name}
            </li>
          ))}
        </ul>
      )}
      <button onClick={navigate}>suggest Dish</button>
    </header>
  );
};

export default Header;
