import { propsProfile } from "../../utils/constants";
import React from "react";
import "./Profile.css";

function Profile({onSignOut}) {

  const fieldList = propsProfile.inputsList.map(item => (
      <div key={`profile-${item.name}`} className="profile__field">
        <label htmlFor={item.name} className="profile__label"> {item.label} </label>
        <input className="profile__input" {...item}/>
        <span className="profile__error">Что-то пошло не так....</span>
      </div>
    ),
  );

  return (
    <form className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <fieldset className="profile__fieldset">
        {fieldList}
      </fieldset>
      <button className="profile__btn">Редактировать</button>
      <button className="profile__btn profile__btn_type_exit" onClick={onSignOut}>Выйти из аккаунта</button>
    </form>
  );
}

export default Profile;
