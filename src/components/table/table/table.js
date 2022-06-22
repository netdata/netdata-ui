import React from "react"
import { Box } from "../../templates/box"
import { Flex } from "../../templates/flex"

const Table = ({ handleSearch, filteringOptions }) => {
  return (
    <Flex column>
      <Flex width="100%" justifyContent="between" margin={[0, 0, 0, 1]}>
        {filteringOptions ? (
          <Flex margin={[0, 0, 0, 1]}>
            {filteringOptions.map(() => (
              <Box>Here is filtering option</Box>
            ))}
          </Flex>
        ) : (
          <Box aria-hidden as="span" />
        )}
        {handleSearch && <Flex>Here will be search</Flex>}
      </Flex>
    </Flex>
  )
}

export default Table
