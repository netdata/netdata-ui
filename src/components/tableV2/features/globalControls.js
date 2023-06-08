import React, { memo } from "react"
import Flex from "src/components/templates/flex"
import SearchInput from "src/components/search"
import Select from "src/components/select"
import { Icon } from "src/components/icon"
import { TextSmall, TextBig } from "src/components/typography"
import { debounce } from "throttle-debounce"

const GlobalControls = ({
  bulkActions,
  dataGa,
  groupByOptions,
  groupValue,
  onGroupBy,
  onSearch,
  searchPlaceholder = "Search",
  searchValue,
  tableMeta,
  title,
}) => {
  const wordsCount = searchValue?.split(" ").filter(x => !!x).length

  tableMeta = typeof tableMeta === "function" ? tableMeta({}, {}, null) : tableMeta

  return (
    <Flex
      width="100%"
      zIndex={10}
      background="mainBackground"
      padding={[0, 0, 4]}
      gap={3}
      alignItems="center"
      {...tableMeta.bulkActionsStyles}
    >
      {!!title && (
        <TextBig margin={[0, 0, 0, 3]} strong>
          {title}
        </TextBig>
      )}
      {onSearch && (
        <Flex width={{ max: 57.5, base: "40%" }} {...tableMeta.searchContainerStyles}>
          <SearchInput
            data-testid="table-global-search-filter"
            data-ga={`${dataGa}::search-${wordsCount}-words::table-filter`}
            defaultValue={searchValue}
            iconLeft={<Icon color="textLite" name="magnify" height="18px" width="18px" />}
            onChange={debounce(300, e => {
              e.persist()
              onSearch(e.target.value)
            })}
            placeholder={searchPlaceholder}
            {...tableMeta.searchStyles}
          />
        </Flex>
      )}
      {groupByOptions && (
        <Flex
          alignItems="center"
          data-testid="tableGroupBy"
          gap={2}
          {...tableMeta.groupByContainerStyles}
        >
          <TextSmall data-testid="tableGroupByLabel" color="textLite" whiteSpace="nowrap">
            Group by
          </TextSmall>
          <Select
            data-ga={`${dataGa}::group-by-filter::table-filter`}
            data-testid="tableGroupByFilter"
            menuPortalTarget={document.body}
            onChange={({ value }) => onGroupBy(value)}
            options={Object.values(groupByOptions)}
            styles={{ size: "tiny", minWidth: 120 }}
            value={groupByOptions[groupValue] || groupByOptions.default}
          />
        </Flex>
      )}
      {!!bulkActions && (
        <Flex gap={1} data-testid="bulk-actions" width="100%" justifyContent="end">
          {bulkActions}
        </Flex>
      )}
    </Flex>
  )
}

export default memo(GlobalControls)
