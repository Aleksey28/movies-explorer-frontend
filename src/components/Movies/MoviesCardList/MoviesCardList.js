import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesCards, countCards }) {
  const cardElements = moviesCards.slice(0, Math.min(moviesCards.length, countCards))
    .map((item) => <li key={item.id}><MoviesCard data={item}/></li>);
  return (
    <ul className="cards">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;
