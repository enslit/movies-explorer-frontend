import React from 'react';
import PropTypes from 'prop-types';

const IconLike = ({ classesPath, classesSvg }) => {
  return (
    <svg width="8" height="8" className={classesSvg}>
      <path
        className={classesPath}
        d="M5.06 3.882l2.24-2.24L6.239.583l-2.24 2.24L1.76.582.7 1.643l2.239 2.24L.582 6.238l1.06 1.06L4 4.944 6.357 7.3l1.06-1.06L5.06 3.881z"
      />
    </svg>
  );
};

IconLike.propTypes = {
  classesSvg: PropTypes.string,
  classesPath: PropTypes.string,
};

export default IconLike;
