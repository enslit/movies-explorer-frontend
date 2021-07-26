import React from 'react';
import './MoviesCard.css';
import { object } from 'prop-types';

const MoviesCard = ({ movie }) => {
  return <li className="movie">{movie.name}</li>;
};

MoviesCard.propTypes = {
  movie: object,
};

export default MoviesCard;
