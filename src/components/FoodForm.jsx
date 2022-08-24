import Joi from "joi";
import React, { Component } from "react";
import Form from "./Common/Form";
import { getFood, saveFood } from "../Services/fakeFoodService";
import { getCategories } from "../Services/fakeCategoryService";

class FoodForm extends Form {
  state = {
    data: { name: "", categoryId: "", numberInStock: "", price: "" },
    errors: {},
    categories: [],
  };

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });

    const foodId = this.props.match.params.id;
    if (foodId === "new") return;

    const food = getFood(foodId);
    if (!food) this.props.history.replace("/not-found");

    this.setState({ data: food });
  }

  doSubmit = () => {
    saveFood(this.state.data);
    this.props.history.push("/foods");
  };

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
  });

  render() {
    console.log("data", this.state.data);
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderSelect("categoryId", "Category", this.state.categories)}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("price", "Price ")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
