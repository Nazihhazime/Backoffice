import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFoods, deleteFood } from "../Services/fakeFoodService";
import { getCategories } from "../Services/fakeCategoryService";
import { paginate } from "../utils/paginate";
import FoodsTable from "./FoodsTable";
import Listgroup from "./Common/Listgroup";
import Pagination from "./Common/Pagination";
import _ from "lodash";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategory: DEFAULT_CATEGORY,
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  }

  getPaginatedFoods() {
    const {
      pageSize,
      sortColumn,
      selectedPage,
      selectedCategory,
      foods: allFoods,
    } = this.state;

    const filteredFoods = selectedCategory._id
      ? allFoods.filter((f) => f.category._id === selectedCategory._id)
      : allFoods;

    const sortedFoods = _.orderBy(
      filteredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );

    const foods = paginate(sortedFoods, selectedPage, pageSize);

    return { foods, filteredCount: filteredFoods.length };
  }

  render() {
    const {
      categories,
      pageSize,
      sortColumn,
      selectedPage,
      selectedCategory,
      foods: allFoods,
    } = this.state;
    const { length: count } = allFoods;

    if (count <= 0) {
      return "There are no foods in the database";
    }

    const { filteredCount, foods } = this.getPaginatedFoods();

    return (
      <div className="container me-2 mt-4 ms-3">
        <div className="row">
          <div className="col-3">
            <Listgroup
              items={categories}
              selectedItem={selectedCategory}
              onItemSelect={this.handleItemSelect}
            />
          </div>
          <div className="col">
            <Link to="/new" className="btn btn-primary mb-3">
              New Food
            </Link>
            {console.log(getFoods())}
            <p>Showing {filteredCount} foods in the database</p>
            <FoodsTable
              foods={foods}
              onIsFavorite={this.handleIsFavorite}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemCount={filteredCount}
              Pagesize={pageSize}
              selectedPage={selectedPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }

  handleSort = (sortColumn) => this.setState({ sortColumn });

  handlePageChange = (page) => {
    this.setState({ selectedPage: page });
  };

  handleItemSelect = (item) =>
    this.setState({ selectedCategory: item, selectedPage: 1 });

  handleDelete = (id) => {
    const foods = this.state.foods.filter((food) => food._id !== id);
    this.setState({ foods });
    deleteFood(id);
  };

  handleIsFavorite = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };
}

export default Foods;
