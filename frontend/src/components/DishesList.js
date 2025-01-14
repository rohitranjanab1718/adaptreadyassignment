import React, { useState } from 'react';
import Pagination from './Pagination';
import "./DishesList.css";
const DishesList = ({ dishes, onDishClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [filters, setFilters] = useState({ diet: '', flavor: '', state: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
 // console.log(dishes);
  const filteredDishes = dishes.filter((dish) =>
    Object.entries(filters).every(([key, value]) => !value || dish[key] === value)
  );
  //console.log(filteredDishes);

  const paginatedDishes = filteredDishes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  console.log(paginatedDishes);

  return (
    <div>
      <div>
        <label>
          Diet:
          <select name="diet" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non vegetarian">Non-Vegetarian</option>
          </select>
        </label>
        <label>
          Flavor:
          <select name="flavor" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="sweet">Sweet</option>
            <option value="spicy">Spicy</option>
          </select>
        </label>
        <label>
          State:
          <select name="state" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Punjab">Punjab</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Diet</th>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDishes.map((dish) => (
            <tr key={dish.name} onClick={() => onDishClick(dish.name)}>
              <td>{dish.name}</td>
              <td>{dish.diet}</td>
              <td>{dish.prep_time} mins</td>
              <td>{dish.cook_time} mins</td>
              <td>{dish.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRows={filteredDishes.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DishesList;

