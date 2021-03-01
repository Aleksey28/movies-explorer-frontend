import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Auth({
  title,
  name,
  inputsList = [],
  submitText,
  footerData,
}) {

  const fieldList = inputsList.map(item => (
      <div key={`${name}-${item.name}`} className="auth__field">
        <label htmlFor={item.name} className="auth__label"> {item.label} </label>
        <input className="auth__input" {...item}/>
        <span className="auth__error">Что-то пошло не так....</span>
      </div>
    ),
  );
  return (
    <form className="auth" name={name}>
      <Logo elementClass="auth__logo"/>
      <h2 className="auth__title">{title}</h2>
      <fieldset className="auth__fieldList">
        {fieldList}
      </fieldset>
      <button className="auth__submit">{submitText}</button>
      <div className="auth__footer">
        <p className="auth__description">{footerData.description}</p>
        <Link to={footerData.linkTo} className="auth__link">{footerData.linkText}</Link>
      </div>
    </form>
  );
}

export default Auth;
