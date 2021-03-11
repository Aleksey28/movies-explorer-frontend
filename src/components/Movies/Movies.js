import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({moviesCards, countCards, handleIncCountOfCards, uploadMovies}) {
  return (
    <section className="movies">
      <SearchForm uploadMovies={uploadMovies}/>
      <MoviesCardList moviesCards={moviesCards} countCards={countCards}/>
      {moviesCards.length>countCards && <button className="movies__more" onClick={handleIncCountOfCards}>Ещё</button>}
    </section>
  );
}

export default Movies;
