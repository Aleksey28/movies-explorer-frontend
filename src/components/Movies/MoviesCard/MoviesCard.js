import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";

function MoviesCard({ data, saved, onSaveMovieCard, onDeleteMovieCard }) {
  const {
    duration,
    image,
    trailer,
    nameRU,
    movieId,
  } = data;
  const { pathname } = useLocation();

  const handleClick = () => {
    if (!saved) {
      onSaveMovieCard(data);
    } else {
      onDeleteMovieCard(movieId);
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{nameRU}</p>
        <p className="card__time">{duration} минут</p>
      </div>
      <a href={trailer} target="_blank">
        <img src={image ? image : "#"}
             alt="Изображение фильма."
             className="card__image"/>
      </a>
      <button
        className={
          `card__btn 
          ${saved && pathname === "/movies" && "card__btn_color_pink"}
          ${saved && (pathname === "/movies" ? "card__btn_type_check" : "card__btn_type_cross")}`
        }
        onClick={handleClick}
      >{!saved && pathname === "/movies"
        ? "Сохранить"
        : ""}</button>
    </div>
  );
}

export default MoviesCard;
