import React from "react";
import _ from "lodash";
import Joi, { options } from "joi";
import Form from "./Common/Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .required()
      .label("Username")
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().allow("").label("Name"),
  });

  doSubmit = () => {
    console.log("Register");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="container mt-2">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
