import React, { useState } from 'react';
import './MoviesSearch.css';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import SwitchButton from '../SwitchButton/SwitchButton';
import Section from '../Section/Section';

const MoviesSearch = ({
  onSearch,
  onChangeShowShortFilms,
  queryValue,
  showOnlyShort,
}) => {
  const [value, setValue] = useState(queryValue || '');
  const handleChangeQuery = (value) => {
    setValue(value);
  };

  const handlerSearch = () => {
    onSearch(value);
  };

  return (
    <Section className="movies-search">
      <SearchForm
        onSearch={handlerSearch}
        setQueryValue={handleChangeQuery}
        queryValue={value}
        className="movies-search__form"
      />
      <SwitchButton
        isActive={showOnlyShort}
        onChange={onChangeShowShortFilms}
        label="Короткометражки"
        className="movies-search__switch-button"
      />
    </Section>
  );
};

MoviesSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChangeShowShortFilms: PropTypes.func.isRequired,
  queryValue: PropTypes.string,
  showOnlyShort: PropTypes.bool,
};

export default MoviesSearch;
