import React, { memo, useMemo } from "react"
import Flex from "@/components/templates/flex"
import SearchInput from "@/components/search"
import { Icon } from "@/components/icon"
import { TextBig } from "@/components/typography"
import GroupBy from "./groupBy"

const Header = ({
  q,
  hasSearch,
  onSearch,
  groupByColumns,
  grouping,
  onGroupBy,
  tableMeta,
  title,
  dataGa,
  searchPlaceholder = "Search",
  dataColumns,
  children,
  bulkActions,
  enableColumnVisibility,
  enableCustomSearch,
}) => {
  tableMeta = useMemo(
    () => (typeof tableMeta === "function" ? tableMeta({}, {}, null) : tableMeta),
    []
  )

  if (!title && !groupByColumns && !hasSearch && !bulkActions && !enableColumnVisibility)
    return null

  return (
    <Flex
      width="100%"
      zIndex={10}
      background="mainBackground"
      gap={1}
      alignItems="center"
      padding={[1]}
      {...tableMeta.bulkActionsStyles}
    >
      {typeof title === "string" ? <TextBig strong>{title}</TextBig> : title}
      {hasSearch && (
        <Flex flex="grow" {...tableMeta.searchContainerStyles}>
          <SearchInput
            data-testid="table-global-search-filter"
            data-ga={`${dataGa}::search-words::table-filter`}
            value={q}
            iconLeft={<Icon color="textLite" name="magnify" height="18px" width="18px" />}
            onChange={onSearch}
            placeholder={searchPlaceholder}
            controlled={enableCustomSearch}
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
      {children}
    </Flex>
  )
}

export default memo(Header)
