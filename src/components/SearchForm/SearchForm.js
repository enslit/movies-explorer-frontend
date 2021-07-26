import React from 'react';
import './SearchForm.css';
import { func, string } from 'prop-types';
import classNames from 'classnames';

const SearchForm = ({ onSearch, onChangeQuery, queryValue, className }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch();
  };

  const formClasses = classNames('search', className);

  return (
    <form
      noValidate
      name="search"
      className={formClasses}
      onSubmit={handleSubmit}
    >
      <input
        name="query"
        placeholder="Поиск"
        className="search__input"
        value={queryValue}
        onChange={onChangeQuery}
      />
      <button className="search__button">Поиск</button>
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: func,
  onChangeQuery: func,
  queryValue: string,
  className: string,
};

export default SearchForm;
