import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DishDetails from '../components/DishDetails';

const DishDetailsPage = () => {
  const { name } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3010/api/getDish/${name}`)
      .then((response) => response.json())
      .then((data) => setDish(data))
      .catch((error) => console.error('Error fetching dish:', error));
  }, [name]);

  if (!dish) return <p>Loading...</p>;

  return <DishDetails dish={dish.data} />;
};

export default DishDetailsPage;
