import PaginationProps from "../types/PaginationProps";
import { Button } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Button
        variant="contained"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>
      <span className="select-none">{currentPage} sur {totalPages}</span>
      <Button
        variant="contained"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </Button>
    </div>
  );
}

export default Pagination;
