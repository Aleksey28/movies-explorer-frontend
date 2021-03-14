import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { Route, Switch, useHistory, useLocation } from "react-router";
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
import { moviesApiSettings } from "../../utils/constants";

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
  const history = useHistory();

  useEffect(() => {
    MainApi
      .getUserData()
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.log);

    if (localStorage.getItem("allMovies")) {
      setMoviesCards(JSON.parse(localStorage.getItem("allMovies")));
    }
  }, []);

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

  useEffect(() => {
    if (loggedIn) {
      MainApi.getMoviesList()
        .then((data) => {
          setUsersMoviesCards(data);
          history.push("/movies");
        })
        .catch(console.log);
    }
  }, [history, loggedIn]);

  const handleRegistration = (data) => {
    setIsLoading(true);
    MainApi.signUp(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleExit = () => {
    MainApi.signOut().then(
      () => {setLoggedIn(false);},
    );
  };

  const handleAuthorization = (data) => {
    setIsLoading(true);
    MainApi.signIn(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    MainApi.setUserData(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchAllMovies = (text = "") => {
    MoviesApi.getMoviesList()
      .then((data) => {
        const allMovies = data
          .filter(item => {
            for (let key in item) {
              if (typeof item[key] === "string" && item[key].toLowerCase().includes(text.toLowerCase())) {
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
            image: image ? `${moviesApiSettings.baseUrl}${image.url}` : "",
            trailer: trailerLink,
            movieId: id,
            nameRU,
            nameEN,
            thumbnail: image ? `${moviesApiSettings.baseUrl}${image.url}` : "#",
          }));
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
        handleFilterAllMovies(filters);
      })
      .catch(console.log);
  };

  const handleFilterAllMovies = ({ short = false }) => {
    if (localStorage.getItem("allMovies")) {
      const filteredMovies = JSON.parse(localStorage.getItem("allMovies"))
        .filter(item => {
          return !(short && item.duration > 40);
        });
      setMoviesCards(filteredMovies);
    } else {
      handleSearchAllMovies("");
    }
  };

  const handleSearchUsersMovies = (text = "") => {
    setUsersMovieSearchText(text);
  };

  const handleChangeFilters = ({ key, value }) => {
    setFilters(prev => {
      handleFilterAllMovies({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };

  const handleIncCountOfCards = () => {
    setCountCards(prev => {
        return prev + (window.screen.width > 768 ? 3 : 2);
      },
    );
  };

  const handleSaveMovieCard = (data) => {
    MainApi.addMovies(data)
      .then((res) => {
        setUsersMoviesCards(prev => ([...prev, res]));
      })
      .catch(console.log);
  };

  const handleDeleteMovieCard = (movieId) => {
    const id = usersMoviesCards.find(item => item.movieId === movieId)._id;
    MainApi.deleteMovies(id)
      .then(() => {
        setUsersMoviesCards(prev => prev.filter(item => item._id !== id));
      })
      .catch(console.log);
  };

  const filteredUsersMoviesCards = usersMoviesCards.filter(item => {
    if (filters.short && item.duration > 40) {
      return false;
    }
    if (!usersMovieSearchText) {
      return true;
    }
    for (let key in item) {
      if (typeof item[key] === "string" && item[key].toLowerCase().includes(usersMovieSearchText.toLowerCase())) {
        return true;
      }
    }
    return false;
  });

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
      <div className="page">
        <Switch>
          <Route path="/error">
            <Error/>
          </Route>
          <Route path="/signin">
            <Login onAuthorization={handleAuthorization}/>
          </Route>
          <Route path="/signup">
            <Register onRegistration={handleRegistration}/>
          </Route>
          <Route path="/">
            <div className={`page__container ${pathname === "/" && "page__container_color_blue"}`}>
              <Header loggedIn={loggedIn}/>
            </div>
            <Switch>
              <Route exact path="/">
                <Main/>
              </Route>
              <ProtectedRoute path="/movies" loggedIn={loggedIn}>
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
              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                <Movies
                  moviesCards={filteredUsersMoviesCards}
                  usersMoviesCards={usersMoviesCards}
                  countCards={countCards}
                  onDeleteMovieCard={handleDeleteMovieCard}
                  handleIncCountOfCards={handleIncCountOfCards}
                  onSearchMovies={handleSearchUsersMovies}
                  onChangeFilters={handleChangeFilters}/>
              </ProtectedRoute>
              <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                <Profile onUpdateUser={handleUpdateUser} onExit={handleExit}/>
              </ProtectedRoute>
            </Switch>
            <Switch>
              <ProtectedRoute path="/profile" loggedIn={loggedIn}/>
              <Route path="/">
                <Footer/>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
