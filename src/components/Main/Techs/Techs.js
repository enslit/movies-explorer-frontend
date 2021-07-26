import React from 'react';
import './Techs.css';
import Section from '../../Section/Section';
import LabelList from './LabelList/LabelList';

const Techs = () => {
  const labels = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

  return (
    <Section
      title="Технологии"
      anchor="tech"
      style="secondary"
      className="tech"
    >
      <h3 className="tech__title">7 технологий</h3>
      <p className="tech__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <LabelList list={labels} className="tech__labels" />
    </Section>
  );
};

export default Techs;
