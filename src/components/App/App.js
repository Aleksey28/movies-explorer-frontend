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
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5);
  const [currentViewportWidth, setCurrentViewportWidth] = useState(window.screen.width);
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

    if (localStorage.getItem("searchedMovies")) {
      setMoviesCards(JSON.parse(localStorage.getItem("searchedMovies")));
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
          setSavedMoviesCards(data);
          history.push("/movies");
        })
        .catch(console.log);
    }
  }, [history, loggedIn]);

  useEffect(() => {
    setMoviesCards(prev => prev.map(item => ({
      ...item,
      saved: savedMoviesCards.some(savedItem => savedItem.movieId === item.movieId),
    })));
  }, [savedMoviesCards]);

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
    MainApi.signOut();
    setLoggedIn(false);
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

  const handleSearchMovies = (text = "", filters) => {
    MoviesApi.getMoviesList()
      .then((data) => {
        const searchedMovies = data
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
            saved: savedMoviesCards.some(item => item._id === id),
          }));
        localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
        handleFilterMovies(filters);
      })
      .catch(console.log);
  };

  const handleFilterMovies = ({ short = false }) => {
    if (localStorage.getItem("searchedMovies")) {
      const filteredMovies = JSON.parse(localStorage.getItem("searchedMovies")).filter(item => {
        return !(short && item.duration > 40);
      });
      setMoviesCards(filteredMovies);
    } else {
      handleSearchMovies("", { short });
    }
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
        setSavedMoviesCards(prev => ([...prev, res]));
      })
      .catch(console.log);
  };

  const handleDeleteMovieCard = (movieId) => {
    const id = savedMoviesCards.find(item => item.movieId === movieId)._id;
    MainApi.deleteMovies(id)
      .then(() => {
        setSavedMoviesCards(prev => prev.filter(item => item._id !== id));
      })
      .catch(console.log);
  };

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
                  countCards={countCards}
                  onSaveMovieCard={handleSaveMovieCard}
                  onDeleteMovieCard={handleDeleteMovieCard}
                  onIncCountOfCards={handleIncCountOfCards}
                  onSearchMovies={handleSearchMovies}
                  onFilterMovies={handleFilterMovies}/>
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                <Movies
                  moviesCards={savedMoviesCards}
                  countCards={countCards}
                  onDeleteMovieCard={handleDeleteMovieCard}
                  handleIncCountOfCards={handleIncCountOfCards}
                  onSearchMovies={handleSearchMovies}
                  onFilterMovies={handleFilterMovies}/>
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
