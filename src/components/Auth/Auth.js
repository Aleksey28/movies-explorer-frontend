import React from "react";
import logo from "../../images/logo.svg";
import "./Auth.css";
import { Link } from "react-router-dom";

function Auth({
  title,
  name,
  inputsList = [],
  submitText,
  footerData,
}) {

  const fieldList = inputsList.map(item => (
      <>
        <label htmlFor={item.name} className="form__label"> {item.label} </label>
        <input key={`${name}-${item.name}`} className="form__input" {...item}/>
        <span className="form__error">Что-то пошло не так....</span>
      </>
    ),
  );
  return (
    <form className="form" name={name}>
      <img src={logo} alt="Логотип" className="form__logo"/>
      <h2 className="form__title">{title}</h2>
      <fieldset className="form__fieldList">
        {fieldList}
      </fieldset>
      <buttom className="form__submit">{submitText}</buttom>
      <div className="form__footer">
        <p className="form__description">{footerData.description}</p>
        <Link to={footerData.linkTo} className="form__link">{footerData.linkText}</Link>
      </div>
    </form>
  );
}

export default Auth;
