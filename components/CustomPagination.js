import React from 'react';

const CustomPagination = ({
  rowsPerPage,
  rowCount,
  onChangeRowsPerPage,
  onChangePage,
  currentPage,
  ...props
}) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  const handleRowsPerPageChange = (event) => {
    onChangeRowsPerPage(Number(event.target.value));
  };

  const handleFirstPage = () => {
    onChangePage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    onChangePage(totalPages);
  };

  const handlePageNumberClick = (pageNumber) => {
    onChangePage(pageNumber);
  };

   // Calculate the range of page numbers to display
   let startPage = currentPage - 1;
   let endPage = currentPage + 1;
 
   // Make sure the range is within the valid range of pages
   startPage = Math.max(startPage, 1);
   endPage = Math.min(endPage, totalPages);
 

  return (
    <div className="d-flex justify-content-between p-2 custom-pagination" >
      {/* Render the "Show entries" section on the left */}
      <div className="d-flex align-items-center showEntriesOfCastomPagination">
        <span>Show</span>
        <select
          className="form-select form-select-sm ms-2 me-2"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
        <span>entries</span>
      </div>
      {/* Render the page navigation controls in the center */}
      <div className='nextPreviousButtonPageArea'>
        <button className="nextPreviousButtonPageSingleButton" onClick={handleFirstPage} disabled={currentPage === 1}  style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>
          <img src='images/PreviousPage.svg' /><img src='images/PreviousPage.svg' className='p-1'/>First
        </button>
        <button className="nextPreviousButtonPageSingleButton me-2" onClick={handlePreviousPage}disabled={currentPage === 1}  style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>
        <img src='images/PreviousPage.svg' className='p-1'/>Previous
        </button>
        {/* Render only the relevant page number buttons */}
        {[...Array(endPage - startPage + 1).keys()].map((i) => {
          const pageNumber = startPage + i;
          return (
            <button
              key={pageNumber}
              className={`my-button ${
                currentPage === pageNumber ? 'my-button-primary' : 'my-button-secondary'
              } me-2`}
              onClick={() => handlePageNumberClick(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button className="nextPreviousButtonPageSingleButton me-2" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>
          Next<img src='images/NextPage.svg' className='p-1'/>
        </button>
        <button className="nextPreviousButtonPageSingleButton" onClick={handleLastPage} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>
          Last<img src='images/NextPage.svg' className='p-1'/><img src='images/NextPage.svg' />
        </button>
      </div>
      {/* Render the "Showing entries" section on the right */}
      <div className="d-flex align-items-center showingPerPageOfCastomPagination">
        Showing {currentPage * rowsPerPage - rowsPerPage + 1} to{' '}
        {Math.min(currentPage * rowsPerPage, rowCount)} of {rowCount} entries
      </div>
    </div>
  );
};

export default CustomPagination;