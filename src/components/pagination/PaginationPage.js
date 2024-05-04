import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationPage = ({ currentPage, onPageChange, totalPages }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="right"
      alignItems="right"
    >
      <Pagination
        count={totalPages}
        color="primary"
        page={currentPage}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationPage;
