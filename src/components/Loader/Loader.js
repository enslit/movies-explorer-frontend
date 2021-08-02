import React from 'react';
import LoaderPart from './LoaderPart';
import { number, string } from 'prop-types';

function Loader({ count, size, speed, color }) {
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

  return (
    <svg
      className="loader"
      width={`${size}px`}
      height={`${size}px`}
      preserveAspectRatio="xMidYMid"
    >
      {buildParts()}
    </svg>
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
};

export default Loader;
