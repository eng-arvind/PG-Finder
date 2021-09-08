import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Components/layout/Navigation";
import Body from "./Components/layout/Body";
import Register from "./Components/AuthScreens/Register";
import Activate from "./Components/AuthScreens/Activate";
import Login from "./Components/AuthScreens/Login";
import ForgotPassword from "./Components/AuthScreens/ForgotPassword";
import Reset from "./Components/AuthScreens/Reset";
import Profile from "./Components/Profile";
import RentalPg from "./Components/RentalPg";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Body} />
        <Route path="/register" component={Register} />
        <Route path="/users/activate/:token" component={Activate} />
        <Route path="/login" component={Login} />
        <Route path="/users/password/forget" component={ForgotPassword} />
        <Route path="/users/password/reset/:token" component={Reset} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/rentalpgs" component={RentalPg} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
