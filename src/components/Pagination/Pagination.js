import React from "react";

function Pagination(props) {
  const { totalPages, setCurrentPage, currentPage } = props;
  const paginator = () => {
    let pages = [];

    // Páginas iniciales
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`btn btn-outline-secondary ${
            currentPage === i ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // Separador si hay más de 3 páginas
    if (totalPages > 3) {
      pages.push(
        <span key="separator1" className="btn btn-outline-secondary">
          ...
        </span>
      );
    }

    // Páginas restantes de 20 en 20
    for (let i = 20; i <= Math.min(22, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`btn btn-outline-secondary ${
            currentPage === i ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return <div>{pages}</div>;
  };
  return (
    <div>
      <div className="text-center">{paginator()}</div>
    </div>
  );
}

export default Pagination;
