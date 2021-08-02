import React from 'react';
import './Portfolio.css';
import Section from '../../Section/Section';
import ExternalLink from '../../ExternalLink/ExternalLink';

const Portfolio = () => {
  return (
    <Section anchor="portfolio" className="portfolio">
      <h2 className="portfolio__title">Порфолио</h2>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <ExternalLink
            to="https://enslit.github.io/how-to-learn/"
            className="portfolio__project-link"
          >
            Статичный сайт
          </ExternalLink>
        </li>
        <li className="portfolio__project">
          <ExternalLink
            to="https://enslit.github.io/russian-travel"
            className="portfolio__project-link"
          >
            Адаптивный сайт
          </ExternalLink>
        </li>
        <li className="portfolio__project">
          <ExternalLink
            to="https://enslit.nomoredomains.monster"
            className="portfolio__project-link"
          >
            Одностраничное приложение
          </ExternalLink>
        </li>
      </ul>
    </Section>
  );
};

export default Portfolio;
