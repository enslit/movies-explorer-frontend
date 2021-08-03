import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { any } from 'prop-types';

const withHeaderAndFooter =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    return (
      <>
        <Header />
        <Component {...props} />
        <Footer />
      </>
    );
  };

withHeaderAndFooter.propTypes = {
  Component: any,
};

export default withHeaderAndFooter;
