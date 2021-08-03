import React from 'react';
import './AboutDescription.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AboutDescription = ({ blocks, className }) => {
  const classes = classNames('about-description', className);

  return (
    <div className={classes}>
      {blocks.map(({ header, text }, index) => (
        <div key={index} className="about-description__wrapper">
          <h3 className="about-description__header">{header}</h3>
          <p className="about-description-text">{text}</p>
        </div>
      ))}
    </div>
  );
};

AboutDescription.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default AboutDescription;
