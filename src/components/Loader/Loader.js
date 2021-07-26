import React from 'react';
import LoaderPart from './LoaderPart';
import { number, string } from 'prop-types';
import classNames from 'classnames';

function Loader({ count, size, speed, color, className }) {
  const buildParts = () => {
    const rotateStep = 360 / count;
    const delayStep = speed / count;
    const parts = [];

    for (let i = 0, j = speed; i < 360; i += rotateStep, j -= delayStep) {
      parts.push(
        <LoaderPart
          key={i}
          step={i}
          delay={j}
          speed={speed}
          color={color}
          size={size}
          count={count}
        />
      );
    }

    return parts;
  };

  const classes = classNames('loader', className);

  return (
    <div className="loader-container">
      <svg
        className={classes}
        width={`${size}px`}
        height={`${size}px`}
        preserveAspectRatio="xMidYMid"
      >
        {buildParts()}
      </svg>
    </div>
  );
}

Loader.defaultProps = {
  count: 15,
  speed: 1000,
  color: '#fff',
  size: 140,
};

Loader.propTypes = {
  count: number,
  speed: number,
  color: string,
  size: number,
  className: string,
};

export default Loader;
