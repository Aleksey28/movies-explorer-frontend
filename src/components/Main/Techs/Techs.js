import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs main__section main__section_pv_100">
      <h2 className="main__section-title main__section-title_mb_90">Технологии</h2><p className="techs__heading">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;