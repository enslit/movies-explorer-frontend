import React from 'react';
import './Section.css';
import { any, oneOf, string } from 'prop-types';
import classNames from 'classnames';
import Container from '../Container/Container';

const Section = ({ style, title, anchor, children, className }) => {
  const containerClasses = classNames(
    'section',
    `section_style_${style}`,
    className
  );

  return (
    <section className={containerClasses} id={anchor}>
      <Container>
        {title && <h2 className="section__title">{title}</h2>}
        {children}
      </Container>
    </section>
  );
};

Section.propTypes = {
  style: oneOf(['default', 'secondary']),
  children: any,
  title: string,
  anchor: string,
  className: string,
};

Section.defaultProps = {
  style: 'default',
};

export default Section;
