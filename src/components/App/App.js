import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import { MOVIES_API_SETTINGS, SHORT_MOVIE_MINUTES } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import InformationPopup from "../InformationPopup/InformationPopup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [usersMoviesCards, setUsersMoviesCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5);
  const [currentViewportWidth, setCurrentViewportWidth] = useState(window.screen.width);
  const [filters, setFilters] = useState({});
  const [usersMovieSearchText, setUsersMovieSearchText] = useState("");
  const { pathname } = useLocation();
  const [error, setError] = useState({});
  const [informationPopupOpenMessage, setInformationPopupMessage] = useState("");
  const history = useHistory();

  //Эффект при монтировании. Проверяем авторизацию пользователя и достаем из временного хранилища фильмы, если они есть.
  useEffect(() => {
    setIsLoading(true);
    MainApi
      .getUserData()
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });

    if (localStorage.getItem("allMovies")) {
      setMoviesCards(JSON.parse(localStorage.getItem("allMovies")));
    }
  }, []);

  //Эффект при изменении размеров экрана. Высчитывает количество колонок.
  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width !== currentViewportWidth) {
        setCountCards(window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5);
        setCurrentViewportWidth(window.screen.width);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentViewportWidth]);

  //Эффект при авторизации. Получаем список фильмов пользователя.
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      MainApi.getMoviesList()
        .then((data) => {
          setUsersMoviesCards(data);
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  //Обработчик регистрации в системе.
  const handleRegistration = (data) => {
    setIsLoading(true);
    MainApi.signUp(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        history.push("/movies");
      })
      .catch(({ status, message }) => {

          setError({ status, message });
          history.push("/error");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик выхода
  const handleExit = () => {
    setIsLoading(true);
    MainApi.signOut().then(
      () => {setLoggedIn(false);})
      .catch(({ status, message }) => {

          setError({ status, message });
          history.push("/error");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик авторизации
  const handleAuthorization = (data) => {
    setIsLoading(true);
    MainApi.signIn(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        history.push("/movies");
      })
      .catch(({ status, message }) => {

          setError({ status, message });
          history.push("/error");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик обновления данных пользователя
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    MainApi.setUserData(data)
      .then((res) => {
        setCurrentUser(res);
        setInformationPopupMessage("Данные изменены");
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        history.push("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик получения всех фильмов со стороннего ресурса.
  const handleSearchAllMovies = (text = "") => {
    setIsLoading(true);
    MoviesApi.getMoviesList()
      .then((data) => {
        const allMovies = data
          .filter(item => {
            for (let key in item) {
              if (item.hasOwnProperty(key) && typeof item[key] === "string" &&
                item[key].toLowerCase().includes(text.toLowerCase())) {
                return true;
              }
            }
            return false;
          })
          .map(({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            id,
            nameRU,
            nameEN,
          }) => ({
            country,
            director,
            duration,
            year,
            description,
            image: image ? `${MOVIES_API_SETTINGS.baseUrl}${image.url}` : "",
            trailer: trailerLink,
            movieId: id,
            nameRU,
            nameEN,
            thumbnail: image ? `${MOVIES_API_SETTINGS.baseUrl}${image.url}` : "#",
          }));
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
        handleFilterAllMovies(filters);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Фильтрация всех фильмов.
  const handleFilterAllMovies = ({ short = false }) => {
    if (localStorage.getItem("allMovies")) {
      setIsLoading(true);
      const filteredMovies = JSON.parse(localStorage.getItem("allMovies"))
        .filter(item => {
          return !(short && item.duration > SHORT_MOVIE_MINUTES);
        });
      setMoviesCards(filteredMovies);
      setIsLoading(false);
    } else {
      handleSearchAllMovies("");
    }
  };

  //Обработчик поиска пользовательских фильмов
  const handleSearchUsersMovies = (text = "") => {
    setUsersMovieSearchText(text);
  };

  //Обработчик изменения фильтров
  const handleChangeFilters = ({ key, value }) => {
    setFilters(prev => {
      handleFilterAllMovies({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };

  //Обработчик добалвения новых рядов в списке карточек фильмов
  const handleIncCountOfCards = () => {
    setCountCards(prev => {
        return prev + (window.screen.width > 768 ? 3 : 2);
      },
    );
  };

  //Обработчик добавления фильма в избранное
  const handleSaveMovieCard = (data) => {
    setIsLoading(true);
    MainApi.addMovies(data)
      .then((res) => {
        setUsersMoviesCards(prev => ([...prev, res]));
      })
      .catch(({ status, message }) => {

          setError({ status, message });
          history.push("/error");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Обработчик удаления фильма из избранного
  const handleDeleteMovieCard = (movieId) => {
    const id = usersMoviesCards.find(item => item.movieId === movieId)._id;
    setIsLoading(true);
    MainApi.deleteMovies(id)
      .then(() => {
        setUsersMoviesCards(prev => prev.filter(item => item._id !== id));
      })
      .catch(({ status, message }) => {
          setError({ status, message });
          history.push("/error");
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Выделение пользовательских фильмов с учетом фильтров. Не вижу смысла орагинзовывать для них отдельный стейт.
  const filteredUsersMoviesCards = usersMoviesCards.filter(item => {
    if (filters.short && item.duration > SHORT_MOVIE_MINUTES) {
      return false;
    }
    if (!usersMovieSearchText) {
      return true;
    }
    for (let key in item) {
      if (item.hasOwnProperty(key) && typeof item[key] === "string" &&
        item[key].toLowerCase().includes(usersMovieSearchText.toLowerCase())) {
        return true;
      }
    }
    return false;
  });

  const handleSubmitInformationPopup = () => {
    setInformationPopupMessage("");
  };

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
      <div className="page">
        {/*Не выводим шапук на странице регистрации, авторизации и ошибки*/}
        <Switch>
          <Route path="/error"/>
          <Route path="/signin"/>
          <Route path="/signup"/>
          <Route path="/">
            <div className={`page__container ${pathname === "/" && "page__container_color_blue"}`}>
              <Header loggedIn={loggedIn}/>
            </div>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <ProtectedRoute path="/movies" condition={loggedIn} to="/signin">
            <Movies
              moviesCards={moviesCards}
              usersMoviesCards={usersMoviesCards}
              countCards={countCards}
              onSaveMovieCard={handleSaveMovieCard}
              onDeleteMovieCard={handleDeleteMovieCard}
              onIncCountOfCards={handleIncCountOfCards}
              onSearchMovies={handleSearchAllMovies}
              onChangeFilters={handleChangeFilters}/>
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" condition={loggedIn} to="/signin">
            <Movies
              moviesCards={filteredUsersMoviesCards}
              usersMoviesCards={usersMoviesCards}
              countCards={countCards}
              onDeleteMovieCard={handleDeleteMovieCard}
              handleIncCountOfCards={handleIncCountOfCards}
              onSearchMovies={handleSearchUsersMovies}
              onChangeFilters={handleChangeFilters}/>
          </ProtectedRoute>
          <ProtectedRoute path="/profile" condition={loggedIn} to="/signin">
            <Profile onUpdateUser={handleUpdateUser} onExit={handleExit}/>
          </ProtectedRoute>
          <ProtectedRoute path="/signin" condition={!loggedIn} to="/">
            <Login onAuthorization={handleAuthorization}/>
          </ProtectedRoute>
          <ProtectedRoute path="/signup" condition={!loggedIn} to="/">
            <Register onRegistration={handleRegistration}/>
          </ProtectedRoute>
          <Route path="/error">
            <Error message={error.message} status={error.status}/>
          </Route>
          <Redirect to="/error"/>
        </Switch>
        {/*Не выводим шапук на странице профиля, регистрации, авторизации и ошибки*/}
        <Switch>
          <Route path="/profile"/>
          <Route path="/error"/>
          <Route path="/signin"/>
          <Route path="/signup"/>
          <Route path="/">
            <Footer/>
          </Route>
        </Switch>
        {isLoading && <Preloader/>}
        <InformationPopup message={informationPopupOpenMessage} onSubmit={handleSubmitInformationPopup}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
