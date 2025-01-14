import React, { useState } from 'react';
import axios from 'axios';
import './DishSuggester.css';

const DishSuggester = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients((prev) => [...prev, inputValue.trim()]);
    }
    setInputValue('');
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients((prev) => prev.filter((ing) => ing !== ingredient));
  };

  const fetchSuggestions = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/getPossibleDishes', {
        ingredients,
      });
      setSuggestions(response.data.data);
    } catch (error) {
      console.error('Error fetching dish suggestions:', error);
    }
  };

  return (
    <div className="dish-suggester-container">
      <h1 className="title">Dish Suggester</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter an ingredient"
          onChange={(e) => setInputValue(e.target.value)}
          className="ingredient-input"
        />
        <button onClick={handleAddIngredient} className="add-button">
          Add Ingredient
        </button>
      </div>
      <div className="ingredients-list">
        <h3>Selected Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              {ingredient}
              <button
                onClick={() => handleRemoveIngredient(ingredient)}
                className="remove-button"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <button onClick={fetchSuggestions} className="suggest-button">
          Get Suggestions
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3>Suggested Dishes:</h3>
          <ul>
            {suggestions.map((dish, index) => (
              <li key={index} className="suggested-dish">
                {dish.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DishSuggester;
