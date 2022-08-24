import Joi from "joi";
import React, { Component } from "react";
import Form from "./Common/Form";
import Select from "./Common/Select";
import { getCategories } from "../Services/fakeCategoryService";

class FoodForm extends Form {
  state = {
    data: { name: "", category: "", numberInStock: "", price: "" },
    errors: {},
    categories: [],
  };

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });
  }

  schema = Joi.object({
    name: Joi.string().required(),
    numberInStock: Joi.number().required().min(0).max(100),
    price: Joi.number().required().min(0).max(10),
  });

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        <Select
          name={"category"}
          label={"Category"}
          options={this.state.categories}
        />
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("price", "Price ")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
