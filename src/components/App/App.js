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
import { cards } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    MoviesApi.getMoviesList()
      .then((data) => {
        localStorage.setItem("searchedMovies", JSON.stringify(data));
      });

    MainApi
      .getUserData()
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.log);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
    }
  }, [loggedIn, history]);

  const handleResize = () => {
    setCountCards(window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5);
  };

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

  const handleSearchMovies = ({ text, short = false }) => {
    setMoviesCards(JSON.parse(localStorage.getItem("searchedMovies")).filter(item => {
      if (short && item.duration > 40) {
        return false;
      }
      for (let key in item) {
        if (typeof item[key] === "string" && item[key].toLowerCase().includes(text.toLowerCase())) {
          return true;
        }
      }
      return false;
    }));
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
                <Movies moviesCards={moviesCards} countCards={countCards} uploadMovies={handleSearchMovies}/>
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                <Movies moviesCards={cards.filter(item => item.saved)} countCards={countCards}/>
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
