import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";

function MoviesCard({ data }) {
  const { nameRU, duration, image, saved } = data;
  const { pathname } = useLocation();
  return (
    <div className="card">
      <p className="card__title">{nameRU}</p>
      <p className="card__time">{`${Math.floor(duration / 60)} минут`}</p>
      <img src={image.url} alt="Изображение фильма." className="card__image"/>
      <button
        className={
          `card__btn 
          ${saved && pathname === "/movies" && "card__btn_color_pink"}
          ${saved && (pathname === "/movies" ? "card__btn_type_check" : "card__btn_type_cross")}`
        }
      >{!saved && pathname === "/movies"
        ? "Сохранить"
        : ""}</button>
    </div>
  );
}

export default MoviesCard;
