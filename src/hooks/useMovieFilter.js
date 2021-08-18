import { useCallback, useEffect, useState } from 'react';
import { DURATION_SHORT_FILM } from '../utils/constants';
import useLocalStorage from './useLocalStorage';

export const useMovieFilter = (movies, key) => {
  const [query, setQuery] = useLocalStorage(key, {
    query: '',
    showOnlyShort: false,
  });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltering, setFiltering] = useState(false);

  const filterMovies = useCallback(
    (q) => {
      if (movies) {
        setQuery((prev) => ({ ...prev, query: q }));
        setFiltering(true);
        setFilteredMovies(() => {
          return movies.filter((movie) => {
            return (
              movie.nameRU.toLowerCase().includes(q.toLowerCase()) &&
              (query.showOnlyShort
                ? movie.duration <= DURATION_SHORT_FILM
                : true)
            );
          });
        });
        setFiltering(false);
      }
    },
    [movies, query.showOnlyShort]
  );

  const filterShortFilms = useCallback((onlyShort) => {
    setQuery((prev) => ({ ...prev, showOnlyShort: onlyShort }));
  }, []);

  useEffect(() => {
    filterMovies(query.query);
  }, [query.showOnlyShort]);

  useEffect(() => {
    if (movies) {
      setFilteredMovies(movies);
    }
    filterMovies(query.query);
  }, [movies]);

  return {
    filteredMovies,
    isFiltering,
    filterMovies,
    showOnlyShort: query.showOnlyShort,
    filterShortFilms,
    query: query.query,
  };
};
