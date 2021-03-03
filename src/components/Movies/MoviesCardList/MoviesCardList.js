import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  console.log(window.screen.width);
  const countCards = window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5;
  const cardElements = cards.slice(0,countCards).map((item) => <li key={item.id}><MoviesCard data={item}/></li>);
  return (
    <ul className="cards">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;
