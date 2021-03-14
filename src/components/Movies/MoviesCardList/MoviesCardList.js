import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesCards, usersMoviesCards, countCards, onSaveMovieCard, onDeleteMovieCard }) {
  const cardElements = moviesCards.slice(0, Math.min(moviesCards.length, countCards))
    .map((item) => (
      <li key={item.movieId}>
        <MoviesCard
          data={item}
          saved={usersMoviesCards.some(usersItem => usersItem.movieId === item.movieId)}
          onSaveMovieCard={onSaveMovieCard}
          onDeleteMovieCard={onDeleteMovieCard}/>
      </li>
    ));
  return (
    <ul className="cards">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;
