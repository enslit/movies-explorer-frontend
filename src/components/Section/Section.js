import React from 'react';
import './Section.css';
import { any, bool, oneOf, string } from 'prop-types';
import classNames from 'classnames';
import Container from '../Container/Container';

const Section = ({
  style,
  title,
  anchor,
  children,
  className,
  stretchContainer,
}) => {
  const containerClasses = classNames(
    'section',
    {
      [`section_style_${style}`]: style,
    },
    className
  );

  return (
    <section className={containerClasses} id={anchor}>
      <Container stretchHeight={stretchContainer}>
        {title && <h2 className="section__title">{title}</h2>}
        {children}
      </Container>
    </section>
  );
};

Section.propTypes = {
  style: oneOf(['secondary']),
  children: any,
  title: string,
  anchor: string,
  className: string,
  stretchContainer: bool,
  backgroundContainer: bool,
};

Section.defaultProps = {
  stretchContainer: false,
};

export default Section;
