import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";
import { moviesApiSettings } from "../../../utils/constants";

function MoviesCard({ data, onSaveMovieCard, onDeleteMovieCard }) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  } = data;
  const { pathname } = useLocation();

  const handleClick = () => {
    if (true) {
      onSaveMovieCard({
        country,
        director,
        duration,
        year,
        description,
        image: image ? `${moviesApiSettings.baseUrl}${image.url}` : "",
        trailer: trailerLink,
        movieId: id,
        nameRU,
        nameEN,
        thumbnail: image ? `${moviesApiSettings.baseUrl}${image.url}` : "#",
      });
    } else {
      onDeleteMovieCard(id);
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__title">{nameRU}</p>
        <p className="card__time">{duration} минут</p>
      </div>
      <a href={trailerLink} target="_blank">
        <img src={image ? `${moviesApiSettings.baseUrl}${image.url}` : "#"}
             alt="Изображение фильма."
             className="card__image"/>
      </a>
      <button
        className={
          `card__btn 
          ${true && pathname === "/movies" && "card__btn_color_pink"}
          ${true && (pathname === "/movies" ? "card__btn_type_check" : "card__btn_type_cross")}`
        }
        onClick={handleClick}
      >{!true && pathname === "/movies"
        ? "Сохранить"
        : ""}</button>
    </div>
  );
}

export default MoviesCard;
