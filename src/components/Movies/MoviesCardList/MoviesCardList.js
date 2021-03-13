import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesCards, countCards, onSaveMovieCard, onDeleteMovieCard }) {
  const cardElements = moviesCards.slice(0, Math.min(moviesCards.length, countCards))
    .map((item) => <li key={item.id}><MoviesCard data={item}
                                                 onSaveMovieCard={onSaveMovieCard}
                                                 onDeleteMovieCard={onDeleteMovieCard}/></li>);
  return (
    <ul className="cards">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;
