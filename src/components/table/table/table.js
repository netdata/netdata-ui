import React from "react"
import Box from "../../templates/box"
import Flex from "../../templates/flex"

const Table = ({ handleSearch, filteringOptions }) => {
  return (
    <Flex column>
      <Flex width="100%" justifyContent="between" margin={[0, 0, 1, 0]}>
        {filteringOptions ? (
          <Flex alignSelf="end" gap={1} ali margin={[0, 0, 1, 0]}>
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
