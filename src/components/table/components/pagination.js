import React, { memo } from "react"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { IconButton } from "@/components/button"

const Pagination = ({ table }) => {
  const {
    nextPage,
    previousPage,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    setPageIndex,
    resetPageIndex,
  } = table

  const pageIndex = table.getState().pagination.pageIndex

  return (
    <Flex
      alignItems="center"
      justifyContent="end"
      height="45px"
      background="mainBackground"
      border={{ side: "top", color: "borderSecondary" }}
    >
      <IconButton
        title="First"
        data-testid={"pagination-go-to-first"}
        cursor="pointer"
        onClick={resetPageIndex}
        icon="chevron_left_start"
        iconSize="small"
        tooltip="test"
        disabled={!getCanPreviousPage()}
      />
      <IconButton
        title="Previous"
        data-testid={"pagination-go-to-previous"}
        cursor="pointer"
        onClick={previousPage}
        icon="chevron_left"
        iconSize="small"
        tooltip="Previous"
        disabled={!getCanPreviousPage()}
      />
      <Text data-testid={"pagination-counter"}>
        Page {getPageCount() === 0 ? 0 : pageIndex} of {getPageCount()}
      </Text>
      <IconButton
        title="Next"
        data-testid={"pagination-go-to-next"}
        cursor="pointer"
        onClick={nextPage}
        icon="chevron_right"
        iconSize="small"
        disabled={!getCanNextPage()}
      />
      <IconButton
        title="Last"
        data-testid={"pagination-go-to-last"}
        cursor="pointer"
        onClick={() => setPageIndex(getPageCount() - 1)}
        icon="chevron_right_end"
        iconSize="small"
        disabled={!getCanNextPage()}
      />
    </Flex>
  )
}

export default memo(Pagination)
