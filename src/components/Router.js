import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch> 
        {/* Switch는 한번에 하나의 Route만 볼수 있게 해준다 */}
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from='*' to='/' /> 
            {/* 어떤 주소든 '/'로 이동 */}
          </>
        ) : (
          <>
          <Route exact path="/"> 
            <Auth />
          </Route>
          <Redirect from='*' to='/' />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
