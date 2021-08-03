import React from 'react';
import './IconButton.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconLike from './icons/IconLike';
import IconCross from './icons/IconCross';

const IconButton = ({ isActive, onClick, icon }) => {
  const classesSvg = classNames('icon-button__icon', {
    'icon-button__icon_active': isActive,
  });
  const classesPath = classNames('icon-button__icon-path', {
    'icon-button__icon-path_active': isActive,
  });

  const getIcon = () => {
    switch (icon) {
      case 'like': {
        return <IconLike classesPath={classesPath} classesSvg={classesSvg} />;
      }
      case 'cross': {
        return <IconCross classesPath={classesPath} classesSvg={classesSvg} />;
      }
      default: {
        return '';
      }
    }
  };

  return (
    <button className="icon-button" onClick={onClick}>
      {getIcon()}
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  icon: PropTypes.oneOf(['like', 'cross']).isRequired,
};

IconButton.defaultProps = {
  isActive: false,
};

export default IconButton;
