import React from 'react';
import './AboutProject.css';
import Section from '../../Section/Section';
import AboutDescription from './AboutDescription/AboutDescription';
import Steps from './Steps/Steps';

const AboutProject = () => {
  const descriptions = [
    {
      header: 'Дипломный проект включал 5 этапов',
      text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    },
    {
      header: 'На выполнение диплома ушло 5 недель',
      text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    },
  ];

  const steps = [
    {
      isActive: true,
      lineText: '1 неделя',
      label: 'Back-and',
    },
    {
      isActive: false,
      lineText: '4 недели',
      label: 'Front-end',
    },
  ];

  return (
    <Section title="О проекте" anchor="aboutProject" className="about-project">
      <AboutDescription
        blocks={descriptions}
        className="about-project__description"
      />
      <Steps steps={steps} className="about-project__steps" />
    </Section>
  );
};

export default AboutProject;
