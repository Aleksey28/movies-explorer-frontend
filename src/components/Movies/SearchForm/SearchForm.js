import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__container search__container_type_query">
        <input className="search__text" required/>
        <button type="submit" className="search__btn">Поиск</button>
      </div>
      <div className="search__container search__container_type_filter">
        <label>
          <input type="checkbox" className="search__filter"/>
          <span className="search__visible-filter"/>
        </label>
        <label className="search__label">Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;
