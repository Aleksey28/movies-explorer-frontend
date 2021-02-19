import "./Promo.css";
import React from "react";
import imgEarth from "../../images/earth.svg";

function Promo() {
  return (
    <div className="promo">
      <div className="promo__description">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="" className="promo__show-more">Узнать больше</a>
      </div>
      <img src={imgEarth} alt="WEB around all of us." className="promo__image"/>
    </div>
  );
}

export default Promo;
