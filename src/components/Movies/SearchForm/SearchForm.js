import React from "react";
import "./SearchForm.css";
import Form, { Field, Submit } from "../../Form/Form";
import { propsSearch } from "../../../utils/constants";

function SearchForm({ uploadMovies }) {

  const handleSearch = (data) => {
    uploadMovies(data);
  };

  return (
    <Form
      className="search"
      name="search"
      onSubmit={handleSearch}
      validators={propsSearch.validators}
      defaultValues={propsSearch.defaultValues}
      isOpen={true}>
      <div className="search__container search__container_type_query">
        <Field key="search-text" name="text">
          {
            ({ isInvalid, errorMessage, ...inputProps }) => {
              return (
                <input
                  className={`search__text ${isInvalid ? "search__text_error" : ""} `}
                  type="text"
                  placeholder={(isInvalid && errorMessage) || "Ключевое слолво"}
                  {...inputProps}/>
              );
            }
          }
        </Field>
        <Submit>
          {
            ({ disabled }) => (
              <button
                className={`search__btn ${disabled ? "search__btn_disabled" : ""} `}
                type="submit"
                disabled={disabled}>
                Поиск
              </button>
            )
          }
        </Submit>
      </div>
      <div className="search__container search__container_type_filter">
        <label>
          <input type="checkbox" className="search__filter"/>
          <span className="search__visible-filter"/>
        </label>
        <label className="search__label">Короткометражки</label>
      </div>
    </Form>
  );
}

export default SearchForm;
