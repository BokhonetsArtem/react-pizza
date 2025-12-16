import { FC, memo } from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = memo(({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
});

export default Pagination;
