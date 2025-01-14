import React from 'react';
import './DishDetails.css';

const DishDetails = ({ dish }) => (
  <div>
    <h1>{dish.name}</h1>
    <p><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
    <p><strong>Diet:</strong> {dish.diet}</p>
    <p><strong>Preparation Time:</strong> {dish.prep_time} mins</p>
    <p><strong>Cooking Time:</strong> {dish.cook_time} mins</p>
    <p><strong>Flavor:</strong> {dish.flavor_profile}</p>
    <p><strong>Course:</strong> {dish.course}</p>
    <p><strong>State:</strong> {dish.state}</p>
    <p><strong>Region:</strong> {dish.region}</p>
  </div>
);

export default DishDetails;

