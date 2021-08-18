import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesSearch from '../MoviesSearch/MoviesSearch';
import { array, bool, func } from 'prop-types';
import { useMovieFilter } from '../../hooks/useMovieFilter';
import ButtonMore from '../ButtonMore/ButtonMore';
import { usePresentation } from '../../hooks/usePresentation';
import { MOVIES_LOCAL_STORAGE_KEY } from '../../utils/constants';

const Movies = ({ list, onRemove, onSave, isFetching, initialized }) => {
  const {
    filteredMovies,
    isFiltering,
    filterMovies,
    filterShortFilms,
    showOnlyShort,
    query,
  } = useMovieFilter(list || [], `${MOVIES_LOCAL_STORAGE_KEY}-search`);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);
  const [touchedLoadMore, setTouchedLoadMore] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const presentation = usePresentation();
  const mediaSettings = useRef({
    desktop: { initial: 12, add: 3 },
    tab: { initial: 8, add: 2 },
    mobile: { initial: 5, add: 2 },
  });

  const handlerClickMore = () => {
    setTouchedLoadMore(true);
    setVisibleMovies((prev) => [
      ...prev,
      ...filteredMovies.slice(
        prev.length,
        prev.length + mediaSettings.current[presentation].add
      ),
    ]);
  };

  const setInitialMovieState = useCallback(() => {
    const initialCount = mediaSettings.current[presentation].initial;
    setVisibleMovies(filteredMovies.slice(0, initialCount));
  }, [filteredMovies, presentation]);

  useEffect(() => {
    if (visibleMovies.length === filteredMovies.length) {
      setVisibleLoadMore(false);
    } else {
      setVisibleLoadMore(true);
    }
  }, [filteredMovies.length, visibleMovies]);

  useEffect(() => {
    if (presentation && !touchedLoadMore) {
      setInitialMovieState();
    } else if (presentation && touchedLoadMore) {
      setVisibleMovies((prev) => {
        return filteredMovies.slice(0, prev.length);
      });
    }
  }, [touchedLoadMore, presentation, setInitialMovieState]);

  useEffect(() => {
    if (presentation) {
      setInitialMovieState();
    }
  }, [showOnlyShort, query]);

  return (
    <>
      <Header />
      <main className="movies">
        <MoviesSearch
          onSearch={filterMovies}
          onChangeShowShortFilms={filterShortFilms}
          showOnlyShort={showOnlyShort}
          queryValue={query}
        />
        <MoviesCardList
          movies={visibleMovies}
          isLoading={isFetching || isFiltering}
          handlerSave={onSave}
          handlerDelete={onRemove}
          initialized={initialized}
        />
        {visibleLoadMore && <ButtonMore onClick={handlerClickMore} />}
      </main>
      <Footer />
    </>
  );
};

Movies.propTypes = {
  list: array,
  onSave: func,
  onRemove: func,
  isFetching: bool,
  initialized: bool,
};

export default Movies;
