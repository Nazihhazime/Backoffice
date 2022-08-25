import React from "react";

function SearchBox({ value, onChange, placeholder = "Search..." }) {
  return <input value={value} onChange={onChange} />;
}

export default SearchBox;
