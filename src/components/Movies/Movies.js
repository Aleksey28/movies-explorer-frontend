import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({moviesCards, uploadMovies}) {
  return (
    <section className="movies">
      <SearchForm uploadMovies={uploadMovies}/>
      <MoviesCardList moviesCards={moviesCards}/>
      {moviesCards.length>12 && <button className="movies__more">Ещё</button>}
    </section>
  );
}

export default Movies;
