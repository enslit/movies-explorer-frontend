import React from 'react';
import './MoviesCardList.css';
import { array, bool, func } from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Section from '../Section/Section';
import Loader from '../Loader/Loader';
import ButtonMore from '../ButtonMore/ButtonMore';

const MoviesCardList = ({
  movies,
  isLoading,
  onClickLoadMore,
  handlerLike,
  handlerDelete,
  isSavedMoviesPage,
}) => {
  const handlerClickMore = () => {
    onClickLoadMore();
  };

  return (
    <Section className="movies-list" stretchContainer={true}>
      <div className="movies-list__content">
        {!isLoading ? (
          movies.length === 0 ? (
            <p className="movies-list__empty-list-message">Список пуст</p>
          ) : (
            <>
              <ul className="movies-list__list">
                {movies.map((movie) => (
                  <li key={movie.id} className="movies-list__item">
                    <MoviesCard
                      movie={movie}
                      onLike={handlerLike}
                      onDelete={handlerDelete}
                      isSavedMovie={isSavedMoviesPage}
                    />
                  </li>
                ))}
              </ul>
              {onClickLoadMore && <ButtonMore onClick={handlerClickMore} />}
            </>
          )
        ) : (
          <div className="movies-list__loader">
            <Loader />
          </div>
        )}
      </div>
    </Section>
  );
};

MoviesCardList.propTypes = {
  movies: array,
  isLoading: bool,
  onClickLoadMore: func,
  handlerLike: func,
  handlerDelete: func,
  isSavedMoviesPage: bool,
};

export default MoviesCardList;
