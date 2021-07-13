import React, { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  const [movies, setMovies] = useState([{ _id: 1 }, { _id: 2 }]);

  const searchHandler = (query) => {
    setMovies([{ _id: 1 }]);
  };

  return (
    <div>
      <SearchForm onSearch={searchHandler} />
      <MoviesCardList movies={movies} />
    </div>
  );
};

export default Movies;
