import './Pagination.css';

const Pagination = ({ totalRows, rowsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
  
    return (
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            disabled={currentPage === index + 1}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  