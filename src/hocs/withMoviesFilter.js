import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MoviesSearch from '../components/MoviesSearch/MoviesSearch';

const withMoviesFilter = (Component) => {
  function MoviesFilter({ list, ...props }) {
    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState(list);

    const filterMovies = useCallback(
      (query) => {
        setIsFiltering(true);
        setFilteredMovies(list.filter((movie) => movie.nameRU.includes(query)));
        setIsFiltering(false);
      },
      [list]
    );

    useEffect(() => {
      filterMovies('');
    }, [filterMovies]);

    return (
      <>
        <MoviesSearch onSearch={filterMovies} />
        <Component list={filteredMovies} isLoading={isFiltering} {...props} />
      </>
    );
  }

  MoviesFilter.propTypes = {
    list: PropTypes.array,
  };

  return MoviesFilter;
};

withMoviesFilter.propTypes = {
  Component: PropTypes.element,
};
