import React, { useState } from 'react';
import './SearchForm.css';
import { func, string } from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';

const SearchForm = ({ onSearch, setQueryValue, queryValue, className }) => {
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch();
  };

  const handleChangeInput = (evt) => {
    setQueryValue(evt.target.value);
  };

  const handleFocusInput = () => {
    setInputFocused(true);
  };

  const handleBlurInput = (e) => {
    setInputFocused(false);
  };

  const formClasses = classNames(
    'search',
    { search_focused: inputFocused },
    className
  );

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
        onChange={handleChangeInput}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
      />
      <Button
        type="submit"
        name="submit"
        className="search__button"
        style="secondary"
      >
        Поиск
      </Button>
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: func,
  setQueryValue: func,
  queryValue: string,
  className: string,
};

export default SearchForm;
