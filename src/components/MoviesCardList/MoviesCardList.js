import React from 'react';
import './MoviesCardList.css';
import { array } from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies }) => {
  return (
    <ul className="movies-list">
      {movies.map((movie) => (
        <MoviesCard key={movie._id} />
      ))}
    </ul>
  );
};

MoviesCardList.propTypes = {
  movies: array,
};

export default MoviesCardList;
