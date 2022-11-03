import React from "react"
import { Pagination } from "../components/base-table"

const makePagination = ({ table }) => {
  const {
    nextPage,
    previousPage,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    setPageIndex,
    resetPageIndex,
  } = table
  const pageSize = table.getState().pagination.pageSize
  const pageIndex = table.getState().pagination.pageIndex

  return (
    <Pagination
      setPageIndex={setPageIndex}
      resetPageIndex={resetPageIndex}
      pageCount={getPageCount()}
      hasNext={getCanNextPage()}
      hasPrevious={getCanPreviousPage()}
      onNextPage={nextPage}
      onPreviousPage={previousPage}
      pageSize={pageSize}
      pageIndex={pageIndex + 1}
    />
  )
}

export default makePagination
