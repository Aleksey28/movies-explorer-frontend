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
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
    }
  }, [loggedIn]);

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
  }

  const uploadMovies = (searchText) => {
    MoviesApi.getMoviesList()
      .then((data) => {
        setMoviesCards(data);
      });
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
                <Movies moviesCards={moviesCards} uploadMovies={uploadMovies}/>
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                <Movies moviesCards={cards.filter(item => item.saved)}/>
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
