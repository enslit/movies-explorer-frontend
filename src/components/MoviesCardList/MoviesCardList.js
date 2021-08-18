import React from 'react';
import './MoviesCardList.css';
import { array, bool, func } from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Section from '../Section/Section';
import Loader from '../Loader/Loader';

const MoviesCardList = ({
  movies,
  isLoading,
  handlerSave,
  handlerDelete,
  initialized,
}) => {
  return (
    <Section className="movies-list" stretchContainer={true}>
      <div className="movies-list__content">
        {isLoading && !initialized ? (
          <div className="movies-list__loader">
            <Loader />
          </div>
        ) : movies.length === 0 ? (
          <p className="movies-list__empty-list-message">Ничего не найдено</p>
        ) : (
          <ul className="movies-list__list">
            {movies.map((movie) => (
              <li key={movie.id || movie._id} className="movies-list__item">
                <MoviesCard
                  movie={movie}
                  onLike={handlerSave}
                  onDelete={handlerDelete}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
};

MoviesCardList.propTypes = {
  movies: array,
  isLoading: bool,
  handlerSave: func,
  handlerDelete: func,
  isSavedMoviesPage: bool,
  initialized: bool,
};

export default MoviesCardList;
