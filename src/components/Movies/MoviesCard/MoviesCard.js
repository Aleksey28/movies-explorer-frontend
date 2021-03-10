import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";
import { moviesApiSettings } from "../../../utils/constants";

function MoviesCard({ data }) {
  const { nameRU, duration, image, saved = false } = data;
  const { pathname } = useLocation();
  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{nameRU}</p>
        <p className="card__time">{duration} минут</p>
      </div>
      <img src={`${moviesApiSettings.baseUrl}${image.url}`} alt="Изображение фильма." className="card__image"/>
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
