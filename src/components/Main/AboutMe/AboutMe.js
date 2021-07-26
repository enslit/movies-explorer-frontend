import React from 'react';
import './AboutMe.css';
import Section from '../../Section/Section';
import photoMe from '../../../images/me.jpg';
import ExternalLink from '../../ExternalLink/ExternalLink';

const AboutMe = () => {
  return (
    <Section title="Обо мне" anchor="aboutMe" className="about-me">
      <div className="about-me__wrapper">
        <div className="about-me__description">
          <h3 className="about-me__name">Александр</h3>
          <p className="about-me__short">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__long">
            Я родился и вырос в Мариуполе, сейчас живу в Москве. Закончил
            факультет сетей связи ХНУРЭ. У меня есть жена и дочь. Я люблю
            слушать музыку, а ещё увлекаюсь катанием на велосипеде в летнее
            время и на сноуборде в зимнее. Недавно начал кодить. С 2014 года
            работал в компании ООО &quot;ЭГИА&quot;. После того, как прошёл курс
            по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <ul className="about-me__links">
            <li className="about-me__link-item">
              <ExternalLink
                to="https://facebook.com/enslit"
                className="about-me__link"
              >
                Facebook
              </ExternalLink>
            </li>
            <li className="about-me__link-item">
              <ExternalLink
                to="https://github.com/enslit"
                className="about-me__link"
              >
                Github
              </ExternalLink>
            </li>
          </ul>
        </div>
        <div
          className="about-me__photo"
          style={{ backgroundImage: `url(${photoMe})` }}
        />
      </div>
    </Section>
  );
};

export default AboutMe;
