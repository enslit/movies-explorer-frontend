import React from 'react';
import './LabelList.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LabelList = ({ list, className }) => {
  const classes = classNames('label-list', className);

  return (
    <div className={classes}>
      <ul className="label-list__list">
        {list.map((label, index) => (
          <li key={index} className="label-list__item">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

LabelList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default LabelList;
