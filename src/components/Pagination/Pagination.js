import React from "react";

function Pagination(props) {
  const { totalPages, setCurrentPage, currentPage } = props;
  const paginator = () => {
    const pages = [];

    // Generar botones para todas las páginas
    for (let i = 1; i <= totalPages; i++) {
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

    // Calcular los índices de inicio y fin de ambos rangos
    const range1Start = Math.max(currentPage - 1, 1);
    const range1End = Math.min(currentPage + 2, totalPages);
    const range2Start = Math.max(currentPage + 19, 1);
    const range2End = Math.min(currentPage + 21, totalPages);

    // Filtrar los botones que están dentro de los rangos
    const filteredPages = pages.filter((page, index) => {
      return (
        (index + 1 >= range1Start && index + 1 <= range1End) ||
        (index + 1 >= range2Start && index + 1 <= range2End)
      );
    });

    return <div>{filteredPages}</div>;
  };

  return (
    <div>
      <div className="text-center">{paginator()}</div>
    </div>
  );
}

export default Pagination;
