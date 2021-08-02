import React from 'react';
import './MoviesCard.css';
import { bool, func, object } from 'prop-types';
import { minutesToFormatTime } from '../../utils/utils';
import IconButton from '../IconButton/IconButton';

const MoviesCard = ({ movie, onLike, isSavedMovie, onDelete }) => {
  const onClickLike = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onLike(movie.id);
  };

  const onClickDelete = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onDelete(movie.id);
  };

  return (
    <a href={`#${movie.id}`} className="movie">
      <div
        className="movie__image"
        style={{ backgroundImage: `url(${movie.img})` }}
      />
      <div className="movie__description">
        <div className="movie__name-row">
          <h2 className="movie__name">{movie.name}</h2>
          {isSavedMovie ? (
            <IconButton icon="cross" onClick={onClickDelete} />
          ) : (
            <IconButton
              icon="like"
              isActive={movie.isLiked}
              onClick={onClickLike}
            />
          )}
        </div>
        <span className="movie__duration">
          {minutesToFormatTime(movie.duration)}
        </span>
      </div>
    </a>
  );
};

MoviesCard.propTypes = {
  movie: object,
  onLike: func,
  isSavedMovie: bool,
  onDelete: func,
};

export default MoviesCard;
