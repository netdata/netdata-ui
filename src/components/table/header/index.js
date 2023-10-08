import React, { memo, useMemo } from "react"
import Flex from "src/components/templates/flex"
import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import { TextBig } from "src/components/typography"
import { debounce } from "throttle-debounce"
import GroupBy from "./groupBy"

const Header = ({
  q,
  hasSearch,
  onSearch,
  enableColumnPinning,
  enableColumnVisibility,
  groupByColumns,
  grouping,
  onGroupBy,
  tableMeta,
  title,
  dataGa,
  searchPlaceholder = "Search",
  dataColumns,
  children,
}) => {
  tableMeta = useMemo(
    () => (typeof tableMeta === "function" ? tableMeta({}, {}, null) : tableMeta),
    []
  )

  if (!hasSearch && !enableColumnPinning && !enableColumnVisibility && !children) return null

  return (
    <Flex
      width="100%"
      zIndex={10}
      background="mainBackground"
      gap={2}
      alignItems="center"
      {...tableMeta.bulkActionsStyles}
    >
      {typeof title === "string" ? <TextBig strong>{title}</TextBig> : title}
      {hasSearch && (
        <Flex width={{ max: 57.5, base: "40%" }} {...tableMeta.searchContainerStyles}>
          <SearchInput
            data-testid="table-global-search-filter"
            data-ga={`${dataGa}::search-words::table-filter`}
            defaultValue={q}
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
      <GroupBy
        groupByColumns={groupByColumns}
        tableMeta={tableMeta}
        dataColumns={dataColumns}
        grouping={grouping}
        onGroupBy={onGroupBy}
        dataGa={dataGa}
      />
      {!!children && (
        <Flex gap={1} data-testid="bulk-actions" width="100%" justifyContent="end">
          {children}
        </Flex>
      )}
    </Flex>
  )
}

export default memo(Header)
