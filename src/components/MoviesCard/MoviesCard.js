import React from 'react';
import './MoviesCard.css';
import { bool, func, number, shape, string } from 'prop-types';
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
      <img
        className="movie__image"
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt={movie.nameRU}
      />
      <div className="movie__description">
        <div className="movie__name-row">
          <h2 className="movie__name">{movie.nameRU}</h2>
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
  movie: shape({
    id: number,
    image: shape({
      id: number,
      name: string,
      alternativeText: string,
      caption: string,
      width: number,
      height: number,
      formats: shape({
        thumbnail: shape({
          hash: string,
          ext: string,
          mime: string,
          width: number,
          height: number,
          size: number,
          path: null,
          url: string,
        }),
      }),
      hash: string,
      ext: string,
      mime: string,
      size: number,
      url: string,
      previewUrl: null,
      provider: string,
      provider_metadata: null,
      created_at: string,
      updated_at: string,
    }),
    duration: number,
    isLiked: bool,
    nameRU: string,
    description: string,
    trailerLink: string,
  }),
  onLike: func,
  isSavedMovie: bool,
  onDelete: func,
};

export default MoviesCard;
