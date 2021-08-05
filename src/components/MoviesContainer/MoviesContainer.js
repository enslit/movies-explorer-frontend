import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MoviesSearch from '../MoviesSearch/MoviesSearch';

const MoviesContainer = ({ list, children }) => {
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
      {children(filteredMovies, isFiltering)}
    </>
  );
};

MoviesContainer.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      duration: PropTypes.number,
      isLiked: PropTypes.bool,
      nameRU: PropTypes.string,
      description: PropTypes.string,
      trailerLink: PropTypes.string,
    })
  ).isRequired,
  children: PropTypes.func.isRequired,
};

export default MoviesContainer;
