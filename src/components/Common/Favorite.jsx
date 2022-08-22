import React, { Component } from "react";

class Favorite extends Component {
  getFavoriteStatus() {
    if (this.props.isFavorite) return "fa-solid fa-star";
    return "fa-regular fa-star";
  }

  render() {
    const { onIsFavorite } = this.props;

    return (
      <div>
        <i
          style={{ cursor: "pointer" }}
          onClick={onIsFavorite}
          className={this.getFavoriteStatus()}
        ></i>
      </div>
    );
  }
}

export default Favorite;
