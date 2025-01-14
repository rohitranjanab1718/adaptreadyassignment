import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DishDetailsPage from './pages/DishDetailsPage';
import DishSuggester from './components/DishSuggester';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dish/:name" element={<DishDetailsPage />} />
        <Route path="/dishSuggester" element={<DishSuggester />} />
      </Routes>
    </Router>
  );
}

export default App;
