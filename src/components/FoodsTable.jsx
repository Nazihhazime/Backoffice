import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../Services/authService";
import Favorite from "./Common/Favorite";
import Table from "./Common/Table";

class FoodsTable extends Component {
  columns = [
    {
      label: "Name",
      path: "name",
      content: (food) => (
        <div>
          <Link to={`/foods/${food._id}`}>{food.name}</Link>
        </div>
      ),
    },
    { label: "Category", path: "category.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Price", path: "price" },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavorite={food.isFavorite}
          onIsFavorite={() => this.props.onIsFavorite(food)}
        />
      ),
    },
  ];

  constructor() {
    super();

    const user = auth.getCurrentUser();

    if (user?.isAdmin)
      this.columns.push({
        key: "delete",
        content: (food) => (
          <button
            onClick={() => this.props.onDelete(food)}
            className="btn btn-danger"
          >
            Delete
          </button>
        ),
      });
  }

  render() {
    const { foods, sortColumn, onIsFavorite, onDelete, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={foods}
      />
    );
  }
}

export default FoodsTable;
