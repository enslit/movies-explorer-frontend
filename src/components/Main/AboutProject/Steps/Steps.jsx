import React from 'react';
import './Steps.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Steps = ({ steps, className }) => {
  const classes = classNames('steps', className);

  return (
    <div className={classes}>
      {steps.map(({ isActive, lineText, label }, index) => {
        const lineClasses = classNames('steps__line', {
          steps__line_active: isActive,
        });
        return (
          <div key={index} className="steps__step">
            <div className={lineClasses}>{lineText}</div>
            <p className="steps__label">{label}</p>
          </div>
        );
      })}
    </div>
  );
};

Steps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      isActive: PropTypes.bool,
      lineText: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default Steps;
