import { FC } from "react";
import ReactPaginate from "react-paginate";
import style from './pagination.module.scss'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type PaginationProps = {
  pagination: {
    "limit": number,
    "skip": number,
    "page": number,
    "total": number,
  }
  onPaginationChange: (par: {
    "limit": number,
    "skip": number,
    "page": number,
    "total": number,
  }) => void
}

export const Paginated: FC<PaginationProps> = (_props) => {
  return (
    <div className={style.pagination}>
      <ReactPaginate
        initialPage={_props.pagination.page-1}
        breakLabel="..."
        nextLabel={<ChevronRightIcon className="h-5" />}
        onPageChange={(e) => {
          _props.onPaginationChange({
            ..._props.pagination,
            page: e.selected + 1
          })
        }}
        activeClassName={style.active}
        pageRangeDisplayed={5}
        pageCount={Math.ceil((_props.pagination.total - 1) / _props.pagination.limit)}
        previousLabel={<ChevronLeftIcon className="h-5" />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}