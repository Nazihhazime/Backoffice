import React from "react";
import _ from "lodash";
import Joi, { options } from "joi";
import Form from "./Common/Form";
import auth from "../Services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().min(2).label("Username"),
    password: Joi.string().required().min(4).label("Password"),
  });

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from : "/";
    } catch (error) {
      const errors = { username: error.response.data };
      this.setState({ errors });
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <form onSubmit={this.handleSubmit} className="container mt-2">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
