import React from 'react';
import PropTypes from 'prop-types';

const IconLike = ({ classesPath, classesSvg }) => {
  return (
    <svg width="14" height="12" className={classesSvg}>
      <path
        className={classesPath}
        d="m6.652 1.898.362.35.348-.364C8.082 1.129 8.978.5 10.182.5 12.102.5 13.5 2.029 13.5 4c0 .937-.425 1.736-1.115 2.405L7 11.323 1.61 6.4l-.01-.01-.01-.008C.885 5.806.5 4.968.5 4 .5 2.029 1.898.5 3.818.5c1.195 0 2.09.678 2.834 1.398z"
      />
    </svg>
  );
};

IconLike.propTypes = {
  classesSvg: PropTypes.string,
  classesPath: PropTypes.string,
};

export default IconLike;
