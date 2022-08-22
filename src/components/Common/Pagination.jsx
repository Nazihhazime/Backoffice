import React from "react";
import _ from "lodash";

function Pagination({ itemCount, Pagesize, selectedPage, onPageChange }) {
  const pageCount = Math.ceil(itemCount / Pagesize);

  //[1, 2, ..... pageCount]

  const pages = _.range(1, pageCount + 1);

  if (pageCount === 1) return null;

  return (
    <ul className="Pagination">
      {pages.map((page) => (
        <li
          key={page}
          className={page === selectedPage ? "page-item active" : "page-item"}
        >
          <button
            onClick={() => onPageChange(page)}
            href=""
            className="page-link"
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
