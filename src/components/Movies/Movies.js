import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Container from '../Container/Container';
import SwitchButton from '../SwitchButton/SwitchButton';
import Loader from '../Loader/Loader';

import film1 from '../../images/film1.jpg';
import film2 from '../../images/film2.jpg';
import film3 from '../../images/film3.jpg';

const mockMovies = [
  {
    id: 1,
    img: film1,
    duration: 107,
    isLicked: true,
    name: '33 слова о дизайне',
  },
  {
    id: 2,
    img: film2,
    duration: 63,
    isLicked: false,
    name: 'Киноальманах «100 лет дизайна»',
  },
  {
    id: 3,
    img: film3,
    duration: 102,
    isLicked: false,
    name: 'В погоне за Бенкси',
  },
];

const Movies = () => {
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [showOnlyShort, setShowOnlyShort] = useState(false);

  const handleChangeQuery = (evt) => {
    setQuery(evt.target.value);
  };

  const handlerChangeShowOnlyShort = () => {
    setShowOnlyShort((prev) => !prev);
  };

  const filterMovies = () => {
    setFilteredMovies(movies.filter((movie) => movie.name.includes(query)));
  };

  useEffect(() => {
    filterMovies();
  }, [movies]);

  useEffect(() => {
    setIsFetching(true);

    setTimeout(() => {
      setMovies(mockMovies);
      setIsFetching(false);
    }, 1000);
  }, []);

  return (
    <Container>
      <div className="movies-controls">
        <SearchForm
          onSearch={filterMovies}
          onChangeQuery={handleChangeQuery}
          queryValue={query}
          className="movies-controls__search"
        />
        <SwitchButton
          isActive={showOnlyShort}
          onChange={handlerChangeShowOnlyShort}
          label="Короткометражки"
          className="movies-controls__switch-button"
        />
      </div>
      {isFetching ? (
        <MoviesCardList movies={filteredMovies} />
      ) : (
        <Loader className="movies-loader" />
      )}
    </Container>
  );
};

export default Movies;
