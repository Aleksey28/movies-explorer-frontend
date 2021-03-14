import React, { useEffect, useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearchMovies, onFilterMovies }) {

  const [filters, setFilters] = useState({});

  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(searchText, filters);
  };

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleChangeFilter = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: !prev[e.target.name] }));
  };

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      onFilterMovies(filters);
    }
  }, [filters, onFilterMovies]);

  return (
    <form className="search" name="search" onSubmit={handleSubmit}>
      <div className="search__container search__container_type_query">
        <input
          name="text"
          className="search__text"
          type="text"
          value={searchText}
          onChange={handleChangeSearchText}
          required/>
        <button
          className="search__btn"
          type="submit">
          Поиск
        </button>
      </div>
      <div className="search__container search__container_type_filter">
        <label>
          <input
            name="short"
            type="checkbox"
            className="search__filter"
            onChange={handleChangeFilter}/>
          <span className="search__visible-filter"/>
        </label>
        <label className="search__label">Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;
