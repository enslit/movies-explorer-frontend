import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesSearch from '../MoviesSearch/MoviesSearch';
import { useMovieFilter } from '../../hooks/useMovieFilter';
import { array, bool, func } from 'prop-types';
import { SAVED_MOVIES_LOCAL_STORAGE_KEY } from '../../utils/constants';

const SavedMovies = ({ list, onRemove, isFetching, initialized }) => {
  const {
    filteredMovies,
    isFiltering,
    filterMovies,
    filterShortFilms,
    showOnlyShort,
    query,
  } = useMovieFilter(list || [], `${SAVED_MOVIES_LOCAL_STORAGE_KEY}-search`);

  return (
    <>
      <Header />
      <main className="saved-movies">
        <MoviesSearch
          onSearch={filterMovies}
          onChangeShowShortFilms={filterShortFilms}
          showOnlyShort={showOnlyShort}
          queryValue={query}
        />
        <MoviesCardList
          movies={filteredMovies}
          isLoading={isFiltering || isFetching}
          handlerDelete={onRemove}
          initialized={initialized}
        />
      </main>
      <Footer />
    </>
  );
};

SavedMovies.propTypes = {
  list: array,
  onRemove: func,
  isFetching: bool,
  initialized: bool,
};

export default SavedMovies;
