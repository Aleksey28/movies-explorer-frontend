import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Form, { Field, Submit } from "../Form/Form";

function Auth({
  title,
  name,
  validators,
  defaultValues,
  inputsList = [],
  submitText,
  footerData,
  onSubmit,
}) {

  const fieldList = inputsList.map(item => (
      <Field key={`${name}-${item.name}`} name={item.name}>
        {
          ({ isInvalid, errorMessage, ...inputProps }) => {
            return (
              <div className="auth__field">
                <label htmlFor={item.name} className="auth__label"> {item.label} </label>
                <input
                  className={`auth__input ${isInvalid ? "auth__input_error" : ""} `}
                  {...inputProps}
                  {...item}/>
                <span
                  className={`auth__error ${isInvalid ? "auth__error_visible" : ""} `}>
                {errorMessage || "Текст ошибки"}
              </span>
              </div>
            );
          }
        }
      </Field>
    ),
  );
  return (
    <Form
      className="auth"
      name={name}
      onSubmit={onSubmit}
      validators={validators}
      defaultValues={defaultValues}
      isOpen={true}
    >
      <Logo elementClass="auth__logo"/>
      <h2 className="auth__title">{title}</h2>
      <fieldset className="auth__fieldList">
        {fieldList}
      </fieldset>
      <Submit>
        {
          ({ disabled }) => (
            <button
              className={`auth__submit ${disabled ? "auth__submit_disabled" : ""} `}
              type="submit"
              disabled={disabled}>
              {submitText}
            </button>
          )
        }
      </Submit>
      <div className="auth__footer">
        <p className="auth__description">{footerData.description}</p>
        <Link to={footerData.linkTo} className="auth__link">{footerData.linkText}</Link>
      </div>
    </Form>
  );
}

export default Auth;
