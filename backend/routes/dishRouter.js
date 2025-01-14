const express = require('express');
const fs = require('fs');
const path = require('path');
const dishRouter = express.Router();

dishRouter.get('/getAllDish', (req, res) => {
    const filePath = path.join(__dirname, '..','output.json'); // Path to the JSON file
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to read dish data.',
          error: err.message
        });
      }

      try {
        const dishes = JSON.parse(data); // Parse JSON file content
        res.status(200).json({
          success: true,
          message: 'List of all dishes',
          data: dishes
        });
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({
          success: false,
          message: 'Failed to parse dish data.',
          error: parseError.message
        });
      }
    });
  });

// Route to get data about a specific dish
dishRouter.get('/getDish/:name', (req, res) => {
    const filePath = path.join(__dirname, '..','output.json'); // Path to the JSON file
    const dishName = req.params.name.toLowerCase(); // Dish name from route parameters
    console.log(dishName);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to read dish data.',
          error: err.message
        });
      }
  
      try {
        const dishes = JSON.parse(data); // Parse JSON file content
        const dish = dishes.find(d => d.name.toLowerCase() === dishName); // Find the dish by name
        if (dish) {
          res.status(200).json({
            success: true,
            message: `Details of dish: ${dish.name}`,
            data: dish
          });
        } else {
          res.status(404).json({
            success: false,
            message: `Dish with name "${dishName}" not found.`
          });
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({
          success: false,
          message: 'Failed to parse dish data.',
          error: parseError.message
        });
      }
    });
  });

dishRouter.post('/getPossibleDishes', (req, res) => {
    const filePath = path.join(__dirname, '..','output.json');; // Path to the JSON file
    const userIngredients = req.body.ingredients.map(ingredient => ingredient.toLowerCase()); // Ingredients from the user
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to read dish data.',
          error: err.message
        });
      }
  
      try {
        const dishes = JSON.parse(data); // Parse JSON file content
  
        // Filter dishes that can be made with the available ingredients
        const possibleDishes = dishes.filter(dish => 
          dish.ingredients.every(ingredient => userIngredients.includes(ingredient.toLowerCase()))
        );
  
        res.status(200).json({
          success: true,
          message: `Dishes that can be made with the provided ingredients.`,
          data: possibleDishes
        });
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({
          success: false,
          message: 'Failed to parse dish data.',
          error: parseError.message
        });
      }
    });
  });
  
module.exports = dishRouter