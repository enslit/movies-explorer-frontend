import React from 'react';
import './Promo.css';
import Container from '../../Container/Container';
import NavTab from '../NavTab/NavTab';
import Section from '../../Section/Section';

const Promo = () => {
  return (
    <Section>
      <Container withBackground={true}>
        <div className="promo">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <div className="promo__nav">
            <NavTab label="О проекте" anchor="aboutProject" />
            <NavTab label="Технологии" anchor="tech" />
            <NavTab label="Студент" anchor="aboutMe" />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Promo;
