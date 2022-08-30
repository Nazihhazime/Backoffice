import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFoods, deleteFood } from "../Services/foodService";
import { getCategories } from "../Services/categoryService";
import { paginate } from "../utils/paginate";
import FoodsTable from "./FoodsTable";
import Listgroup from "./Common/Listgroup";
import Pagination from "./Common/Pagination";
import _ from "lodash";
import SearchBox from "./Common/SearchBox";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    searchQuery: "",
    selectedCategory: DEFAULT_CATEGORY,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = [DEFAULT_CATEGORY, ...data];
    const { data: foods } = await getFoods();
    this.setState({ foods, categories });
  }

  handleSearch = (searchQuery) =>
    this.setState({ searchQuery, selectedCategory: DEFAULT_CATEGORY });

  getPaginatedFoods() {
    const {
      pageSize,
      sortColumn,
      selectedPage,
      searchQuery,
      selectedCategory,
      foods: allFoods,
    } = this.state;

    let filteredFoods = allFoods;

    if (selectedCategory._id) {
      filteredFoods = allFoods.filter(
        (f) => f.category._id === selectedCategory._id
      );
    } else if (searchQuery) {
      filteredFoods = allFoods.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
      searchQuery,
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
            <Link to="foods/new" className="btn btn-primary mb-3">
              New Food
            </Link>

            <p>Showing {filteredCount} foods in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
    this.setState({ selectedCategory: item, selectedPage: 1, searchQuery: "" });

  handleDelete = async (food) => {
    const originalFoods = this.state.foods;

    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
    try {
      await deleteFood(food._id);
    } catch (error) {
      this.setState({ foods: originalFoods });
    }
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
