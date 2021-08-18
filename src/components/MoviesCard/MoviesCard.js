import React from 'react';
import './MoviesCard.css';
import { bool, func, number, oneOfType, shape, string } from 'prop-types';
import { minutesToFormatTime } from '../../utils/utils';
import IconButton from '../IconButton/IconButton';

const MoviesCard = ({ movie, onLike, onDelete }) => {
  const onClickLike = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (movie.isSaved) {
      onDelete(movie._id);
    } else {
      onLike(movie);
    }
  };

  const onClickDelete = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onDelete(movie._id);
  };

  return (
    <a
      href={movie.trailerLink || movie.trailer}
      target="_blank"
      rel="noreferrer"
      className="movie"
    >
      <img
        className="movie__image"
        src={
          movie?.image?.url
            ? `https://api.nomoreparties.co${movie.image.url}`
            : movie.image
        }
        alt={movie.nameRU}
      />
      <div className="movie__description">
        <div className="movie__name-row">
          <h2 className="movie__name">{movie.nameRU}</h2>
          {!onLike ? (
            <IconButton icon="cross" onClick={onClickDelete} />
          ) : (
            <IconButton
              icon="like"
              isActive={movie.isSaved}
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
    image: oneOfType([
      shape({
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
      string,
    ]),
    duration: number,
    isSaved: bool,
    nameRU: string,
    description: string,
    trailerLink: string,
  }),
  onLike: func,
  onDelete: func,
};

export default MoviesCard;
