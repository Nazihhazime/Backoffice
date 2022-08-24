import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Foods from "./components/Foods";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import FoodForm from "./components/FoodForm";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/foods/:id/" component={FoodForm} />
          <Route path="/foodform" component={FoodForm} />
          <Route path="foods/new" component={FoodForm} />
          <Route path="/foods" component={Foods} />
          <Route path="/customers" component={Customers} />
          <Route path="/orders" component={Orders} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route exact path="/" component={Foods} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
