import React, { memo } from "react"
import Flex from "@/components/templates/flex"
import styled from "styled-components"
import { Text } from "@/components/typography"
import { IconButton } from "@/components/button"

const Counter = styled(Text).attrs({ color: "textLite" })`
  font-variant-numeric: tabular-nums;
`

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
      height="36px"
      padding={[0, 2]}
      gap={1}
      background="mainBackground"
      border={{ side: "top", color: "border" }}
    >
      <IconButton
        title="First"
        data-testid={"pagination-go-to-first"}
        cursor="pointer"
        onClick={resetPageIndex}
        icon="chevron_left_start"
        iconSize="small"
        tooltip="First"
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
      <Counter data-testid={"pagination-counter"}>
        Page {getPageCount() === 0 ? 0 : pageIndex + 1} of {getPageCount()}
      </Counter>
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
