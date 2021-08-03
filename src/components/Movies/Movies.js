import React, { useEffect, useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { movies as requestMovies } from '../../mockData/movies';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

const Movies = () => {
  const [initialized, setInitialized] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [movies, setMovies] = useState([]);

  const handlerClickMore = () => {
    console.log('click button more');
    setIsFetching(true);

    setTimeout(() => {
      setIsFetching(false);
    }, 500);
  };

  const handlerLike = (id) => {
    // TMP LOGIC
    setMovies((prev) =>
      prev.map((movie) => {
        return movie.id === id
          ? {
              ...movie,
              isLiked: !movie.isLiked,
            }
          : movie;
      })
    );
  };

  useEffect(() => {
    // TMP LOGIC
    setTimeout(() => {
      setMovies(requestMovies);
      setIsFetching(false);
      setInitialized(true);
    }, 500);
  }, []);

  return (
    <>
      <Header />
      <main className="movies">
        <MoviesContainer list={movies}>
          {(filteredMovies, isFiltering) => (
            <MoviesCardList
              movies={filteredMovies}
              isLoading={isFetching || isFiltering}
              onClickLoadMore={handlerClickMore}
              isSavedMoviesPage={false}
              handlerLike={handlerLike}
              initialized={initialized}
            />
          )}
        </MoviesContainer>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
