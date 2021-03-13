import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ moviesCards, countCards, onIncCountOfCards, onSaveMovieCard, onDeleteMovieCard, searchMovies }) {
  return (
    <section className="movies">
      <SearchForm searchMovies={searchMovies}/>
      <MoviesCardList moviesCards={moviesCards}
                      countCards={countCards}
                      onSaveMovieCard={onSaveMovieCard}
                      onDeleteMovieCard={onDeleteMovieCard}/>
      {moviesCards.length > countCards && <button className="movies__more" onClick={onIncCountOfCards}>Ещё</button>}
    </section>
  );
}

export default Movies;
