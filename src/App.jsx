import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Foods from "./components/Foods";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import FoodForm from "./components/FoodForm";
import auth from "./Services/authService";
import ProtectedRoute from "./components/Common/ProtectedRoute";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;
    console.log(user);

    return (
      <>
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute path="/foods/:id" component={FoodForm} />
          <Route
            path="/foods"
            render={(props) => <Foods {...props} user={user} />}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Route path="/orders" component={Orders} />
          <Route path="/customers" component={Customers} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={LoginForm} />
          <Redirect exact from="/" to="/foods" />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
