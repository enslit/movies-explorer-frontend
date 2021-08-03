import React, { useState } from 'react';
import './MoviesSearch.css';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import SwitchButton from '../SwitchButton/SwitchButton';
import Section from '../Section/Section';

const MoviesSearch = ({ onSearch }) => {
  const [showOnlyShort, setShowOnlyShort] = useState(false);
  const [query, setQuery] = useState('');

  const handleChangeQuery = (value) => {
    setQuery(value);
  };

  const handlerChangeShowOnlyShort = () => {
    setShowOnlyShort((prev) => !prev);
  };

  const handlerSearch = () => {
    onSearch(query);
  };

  return (
    <Section className="movies-search">
      <SearchForm
        onSearch={handlerSearch}
        setQueryValue={handleChangeQuery}
        queryValue={query}
        className="movies-search__form"
      />
      <SwitchButton
        isActive={showOnlyShort}
        onChange={handlerChangeShowOnlyShort}
        label="Короткометражки"
        className="movies-search__switch-button"
      />
    </Section>
  );
};

MoviesSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MoviesSearch;
