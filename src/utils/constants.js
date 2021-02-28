import card1 from "../images/card1.jpg";
import card2 from "../images/card2.jpg";
import card3 from "../images/card3.jpg";
import card4 from "../images/card4.jpg";

export const cards = [
  {
    id: 1,
    nameRU: "В погоне за Бенкси",
    duration: 27 * 60,
    image: {
      url: card1,
    },
    saved: false,
  },
  {
    id: 2,
    nameRU: "В погоне за Бенкси",
    duration: 27 * 60,
    image: {
      url: card2,
    },
    saved: false,
  },
  {
    id: 3,
    nameRU: "В погоне за Бенкси",
    duration: 27 * 60,
    image: {
      url: card3,
    },
    saved: true,
  },
  {
    id: 4,
    nameRU: "В погоне за Бенкси",
    duration: 27 * 60,
    image: {
      url: card4,
    },
    saved: true,
  },
];

export const propsProfile = {
  inputsList: [
    { name: "name", label: "Имя", type: "text", value: "Виталий" },
    { name: "email", label: "Почта", type: "text", value: "pochta@yandex.ru" },
  ],
};

export const propsAuthLogIn = {
  inputsList: [
    { name: "email", label: "E-mail", type: "text" },
    { name: "password", label: "Пароль", type: "password" },
  ],
  title: "Рады видеть!",
  name: "login",
  submitText: "Войти",
  footerData: {
    description: "Ещё не зарегистрированы?",
    linkTo: "/signup",
    linkText: "Регистрация",
  },
};

export const propsAuthRegister = {
  inputsList: [
    { name: "name", label: "Имя", type: "text" },
    { name: "email", label: "E-mail", type: "text" },
    { name: "password", label: "Пароль", type: "password" },
  ],
  title: "Добро пожаловать!",
  name: "register",
  submitText: "Зарегистрироваться",
  footerData: {
    description: "Уже зарегистрированы?",
    linkTo: "/signin",
    linkText: "Войти",
  },
};