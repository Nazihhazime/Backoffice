import React from "react";
import _ from "lodash";
import Joi, { options } from "joi";
import Form from "./Common/Form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().min(2).label("Username"),
    password: Joi.string().required().min(4).label("Password"),
  });

  doSubmit = () => {
    console.log("INLOGGAD");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="container mt-2">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default LoginForm;
