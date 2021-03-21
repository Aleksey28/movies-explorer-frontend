export const PROPS_PROFILE = {
  inputsList: [
    { name: "name", label: "Имя", type: "text", maxLength: 30 },
    { name: "email", label: "Почта", type: "text" },
  ],
  defaultValues: {
    name: "",
    email: "",
  },
  validators: {
    name: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: value && value.length > 1,
          message: `Минимальное количество символов: 2. Длина текста сейчас: ${(value && value.length) || 0} символ.`,
        };
      },
      mask: (value) => {
        return {
          valid: !/[^a-z-\s]/i.test(value),
          message: `Поле может содержать только латиницу, пробел или дефис.`,
        };
      },
    },
    email: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: `Некорректный e-mail`,
        };
      },
    },
  },
};

export const PROPS_LOGIN = {
  inputsList: [
    { name: "email", label: "E-mail", type: "text" },
    { name: "password", label: "Пароль", type: "password" },
  ],
  defaultValues: {
    password: "12345qwert",
    email: "guest@email.ru",
  },
  onlyDifferent: false,
  title: "Рады видеть!",
  name: "login",
  submitText: "Войти",
  footerData: {
    description: "Ещё не зарегистрированы?",
    linkTo: "/signup",
    linkText: "Регистрация",
  },
  validators: {
    email: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: `Некорректный e-mail`,
        };
      },
    },
    password: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: value.length > 7,
          message: `Минимальное количество символов: 8. Длина текста сейчас: ${value.length} символ.`,
        };
      },
    },
  },
};

export const PROPS_REGISTRATIONS = {
  inputsList: [
    { name: "name", label: "Имя", type: "text", maxLength: 30 },
    { name: "email", label: "E-mail", type: "text" },
    { name: "password", label: "Пароль", type: "password" },
  ],
  defaultValues: {
    name: "",
    email: "",
    password: "",
  },
  title: "Добро пожаловать!",
  name: "register",
  submitText: "Зарегистрироваться",
  footerData: {
    description: "Уже зарегистрированы?",
    linkTo: "/signin",
    linkText: "Войти",
  },
  validators: {
    name: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: value.length > 1,
          message: `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ.`,
        };
      },
      mask: (value) => {
        return {
          valid: !/[^a-z-\s]/i.test(value),
          message: `Поле может содержать только латиницу, пробел или дефис.`,
        };
      },
    },
    email: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: `Некорректный e-mail`,
        };
      },
    },
    password: {
      required: (value) => {
        return {
          valid: !!value,
          message: "Вы пропустили это поле.",
        };
      },
      minLength: (value) => {
        return {
          valid: value.length > 7,
          message: `Минимальное количество символов: 8. Длина текста сейчас: ${value.length} символ.`,
        };
      },
    },
  },
};

export const MOVIES_API_SETTINGS = {
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

export const MAIN_API_SETTINGS = {
  baseUrl: "https://movies-explorer.api.students.nomoredomains.monster",
  // baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export const SHORT_MOVIE_MINUTES = 40;
