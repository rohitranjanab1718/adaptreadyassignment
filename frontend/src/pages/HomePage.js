import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DishesList from '../components/DishesList';
console.log(process.env)
const HomePage = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+'/getAllDish')
      .then((response) => response.json())
      .then((data) => setDishes(data))
      .catch((error) => console.error('Error fetching dishes:', error));
  }, []);
  
  //console.log(dishes);

  const navigate = (name) => {
    const basePath = window.location.origin; // Get the base URL
    window.location.assign(`${basePath}/dish/${encodeURIComponent(name)}`);
  };

  return (
    <div>
      {dishes.data && (
        <>
          {/* Header component */}
          <Header dishes={dishes.data} onSearch={(name) => navigate(name)} />

          {/* DishesList component */}
          <DishesList dishes={dishes.data} onDishClick={(name) => navigate(name)} />
        </>
      )}
      {!dishes.data && <p>Loading...</p>}
    </div>
    )
};

export default HomePage;

