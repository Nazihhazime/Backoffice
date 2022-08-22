import React from "react";
import _ from "lodash";
import {
  getFoods,
  saveFood,
  deleteFood,
  getFood,
} from "../Services/fakeFoodService";
import { getCategories } from "../Services/fakeCategoryService";
import Joi from "joi";
import Form from "./Common/Form";

class FoodForm extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      category: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    categories: [],
  };

  componentDidMount() {
    const categories = getCategories();
    this.setState({ categories });

    const data = {
      _id: this.props.match.params.id,
      name: this.props.match.params.name,
      category: this.props.match.params.category,
      numberInStock: this.props.match.params.numberInStock,
      price: this.props.match.params.price,
    };

    this.setState({ data });

    const food_Id = this.props.match.params.id;
    const food = getFood(food_Id);
    console.log(food);

    if (food_Id) {
      if (!food) this.props.history.replace("/not-found");
    }
  }

  schema = Joi.object({
    _id: Joi.string().min(2),
    name: Joi.string().required().min(2).label("Name"),
    category: Joi.string().required().label("Category"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    price: Joi.number().required().min(0).max(100).label("Price"),
  });

  doSubmit = () => {
    if (this.state.data._id) {
      deleteFood(this.state.data._id);
      this.setState({ data: saveFood(this.state.data) });
    } else {
      saveFood(this.state.data);
    }

    this.props.history.push("/foods");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="container mt-2">
        {this.renderInput("name", "Name")}
        {this.renderSelect("category", "Category", this.state.categories)}
        {this.renderInput("numberInStock", "stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
