import React from 'react';
import Header from '../components/Header/Header';
import { any } from 'prop-types';

const withHeaderAndFooter =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    return (
      <>
        <Header />
        <Component {...props} />
      </>
    );
  };

withHeaderAndFooter.propTypes = {
  Component: any,
};

export default withHeaderAndFooter;
