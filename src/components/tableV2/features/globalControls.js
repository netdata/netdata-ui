import React from "react"
import Flex from "src/components/templates/flex"
import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import { debounce } from "throttle-debounce"

const GlobalControls = ({
  bulkActions,
  dataGa,
  handleSearch,
  searchPlaceholder = "Search",
  searchValue,
  tableMeta,
}) => {
  const wordsCount = searchValue?.split(" ").filter(x => !!x).length
  return (
    <Flex
      width="100%"
      zIndex={10}
      background="mainBackground"
      padding={[0, 0, 4]}
      {...tableMeta?.bulkActionsStyles}
    >
      {handleSearch && (
        <Flex width={{ max: 100, base: "40%" }} {...tableMeta?.searchContainerStyles}>
          <SearchInput
            data-testid="table-global-search-filter"
            data-ga={`${dataGa}::search-${wordsCount}-words::table-filter`}
            defaultValue={searchValue}
            iconRight={<Icon name="magnify" color="textLite" />}
            onChange={debounce(300, e => {
              e.persist()
              handleSearch(e.target.value)
            })}
            placeholder={searchPlaceholder}
            {...tableMeta?.searchStyles}
          />
        </Flex>
      )}
      <Flex gap={1} data-testid="bulk-actions" width="100%" justifyContent="end">
        {bulkActions}
      </Flex>
    </Flex>
  )
}

export default GlobalControls
