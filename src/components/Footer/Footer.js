import React from 'react';
import './Footer.css';
import Container from '../Container/Container';
import ExternalLink from '../ExternalLink/ExternalLink';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <p className="footer__project-desc">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__wrapper">
          <div className="footer__copyright">
            &copy; {new Date().getFullYear()}
          </div>
          <ul className="footer__links">
            <li className="footer__link-item">
              <ExternalLink to="#" className="footer__link">
                Яндекс.Практикум
              </ExternalLink>
            </li>
            <li className="footer__link-item">
              <ExternalLink to="#" className="footer__link">
                Github
              </ExternalLink>
            </li>
            <li className="footer__link-item">
              <ExternalLink to="#" className="footer__link">
                Facebook
              </ExternalLink>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
