import React from "react";
import _ from "lodash";
import Joi, { options } from "joi";
import user from "../Services/userService";
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

  doSubmit = async () => {
    try {
      await user.register(this.state.data);
      window.location = "/";
    } catch (error) {
      if (error.response.status === 400) {
        const errors = { username: error.response.data };
      }
    }
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
