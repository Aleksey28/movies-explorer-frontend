import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio main__section main__section_ph_small">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://aleksey28.github.io/how-to-learn/" target="_blank">
            <p className="portfolio__name">How to learn</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://aleksey28.github.io/russian-travel/" target="_blank">
            <p className="portfolio__name">Russian travel</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://aleksey28.github.io/react-mesto-auth/" target="_blank">
            <p className="portfolio__name">Mesto</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://aleksey28.github.io/turbina/" target="_blank">
            <p className="portfolio__name">Turbina</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://flight-search-number-one.herokuapp.com/" target="_blank">
            <p className="portfolio__name">Flight search</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
