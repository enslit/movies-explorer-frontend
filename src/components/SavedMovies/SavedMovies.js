import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { savedMovies as savedMoviesRequest } from '../../mockData/movies';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

const SavedMovies = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);

  const handlerClickDelete = (id) => {
    console.log('delete', id);
  };

  useEffect(() => {
    // TMP LOGIC
    setTimeout(() => {
      setSavedMovies(savedMoviesRequest);
      setIsFetching(false);
    }, 500);
  }, []);

  return (
    <>
      <Header />
      <main className="saved-movies">
        <MoviesContainer list={savedMovies}>
          {(filteredMovies, isFiltering) => (
            <MoviesCardList
              movies={filteredMovies}
              isLoading={isFetching || isFiltering}
              isSavedMoviesPage={true}
              handlerDelete={handlerClickDelete}
            />
          )}
        </MoviesContainer>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
