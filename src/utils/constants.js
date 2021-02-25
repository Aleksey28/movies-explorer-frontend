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
