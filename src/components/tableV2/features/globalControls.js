import React, { memo } from "react"

import styled from "styled-components"

import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"

import { getColor } from "src/theme/utils"

import { debounce } from "throttle-debounce"

const StyledTableControls = styled(Flex)`
  width: 100%;
  top: -16px;
  z-index: 10;
  background: ${getColor("mainBackground")};
  padding: 16px 0;
  margin: -16px 0 0;
`

const GlobalControls = memo(
  ({ handleSearch, dataGa, searchPlaceholder = "Search", bulkActions }) => {
    return (
      <StyledTableControls>
        {handleSearch && (
          <Box width={{ max: 50 }}>
            <SearchInput
              data-testid="table-global-search-filter"
              data-ga={`${dataGa}::search::table-filter`}
              onChange={debounce(300, e => {
                e.persist()
                handleSearch(e.target.value)
              })}
              placeholder={searchPlaceholder}
              iconRight={<Icon name="magnify" color="textLite" />}
            />
          </Box>
        )}
        <Flex gap={1} data-testid="bulk-actions" width="100%" justifyContent="end">
          {bulkActions && bulkActions()}
        </Flex>
      </StyledTableControls>
    )
  }
)

export default GlobalControls
