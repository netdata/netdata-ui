import React from "react"

import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"

import FilteringOptions from "./filteringOptions"

const Table = ({ handleSearch, filteringOptions, children, seachPlaceholder = "search" }) => {
  return (
    <Flex column>
      <Flex width="100%" justifyContent="between" margin={[0, 0, 1, 0]}>
        {filteringOptions ? (
          <Flex alignSelf="end" gap={1} ali margin={[0, 0, 1, 0]}>
            {filteringOptions.map(({ onChange, value, options, id }) => (
              <Box key={id}>
                <FilteringOptions value={value} options={options} onChange={onChange} />
              </Box>
            ))}
          </Flex>
        ) : (
          <Box aria-hidden as="span" />
        )}

        {handleSearch && (
          <Box width={{ max: 50 }}>
            <SearchInput placeholder={seachPlaceholder} iconRight={<Icon name="magnify" />} />
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default Table
