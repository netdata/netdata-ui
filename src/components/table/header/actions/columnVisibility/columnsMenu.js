import React, { useState, useMemo } from "react"
import Drop from "@/components/drops/drop/index.js"
import Flex from "@/components/templates/flex"
import { ListItem, Text } from "@/components/typography"
import { Checkbox } from "@/components/checkbox"
import SearchInput from "@/components/search"

const filterColumns = (columns, searchQuery) => {
  if (!searchQuery) return columns
  return columns.filter(column => {
    const name = column.columnDef.name || column.id
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  })
}

const ColumnsMenuItem = ({ column, dataGa, disabled }) => {
  const checked = column.getIsVisible()
  return (
    <Flex alignItems="center" as={ListItem} justifyContent="between" padding={[1]}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        label={
          column.columnDef.name ||
          (typeof column.columnDef.headerString === "function"
            ? column.columnDef.headerString()
            : column.columnDef.headerString) ||
          column.id
        }
        onChange={val => column.getToggleVisibilityHandler()({ target: { checked: val } })}
        data-ga={`columns-menu::click-${checked ? "disable" : "enable"}-${column.id}-::${dataGa}`}
      />
    </Flex>
  )
}

const ColumnsSection = ({ columns, searchQuery, dataGa, title, showBorder }) => {
  const filteredColumns = useMemo(() => filterColumns(columns, searchQuery), [columns, searchQuery])

  if (filteredColumns.length === 0) return null

  return (
    <Flex
      column
      border={
        showBorder
          ? {
              size: "1px",
              type: "solid",
              side: "bottom",
              color: "borderSecondary",
            }
          : undefined
      }
    >
      {title && (
        <Flex padding={[2, 0, 1]}>
          <Text color="textDescription" strong>
            {title}
          </Text>
        </Flex>
      )}
      {filteredColumns.map(column => (
        <ColumnsMenuItem column={column} dataGa={dataGa} key={column.id} />
      ))}
    </Flex>
  )
}

const ColumnsMenu = ({
  dataGa,
  parentRef,
  isOpen,
  columns,
  columnGroups,
  onClose,
  pinnedColumns,
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  if (parentRef.current && isOpen)
    return (
      <Drop
        background="dropdown"
        height={{ max: "400px" }}
        onClickOutside={onClose}
        overflow={{ vertical: "auto" }}
        round={1}
        target={parentRef.current}
        width={50}
        align={{ top: "bottom", right: "right" }}
      >
        <Flex
          border={{
            size: "1px",
            type: "solid",
            side: "bottom",
            color: "borderSecondary",
          }}
          padding={[3, 3, 1]}
        >
          <Text color="textLite">Edit columns</Text>
        </Flex>

        <Flex padding={[2, 3]}>
          <SearchInput
            placeholder="Search columns..."
            onChange={setSearchQuery}
            value={searchQuery}
          />
        </Flex>

        <Flex column padding={[1, 3]}>
          <ColumnsSection
            columns={pinnedColumns}
            searchQuery={searchQuery}
            dataGa={dataGa}
            title="Pinned"
            showBorder
          />
          {columnGroups?.length ? (
            columnGroups.map(group => (
              <ColumnsSection
                key={group.id}
                columns={group.columns}
                searchQuery={searchQuery}
                dataGa={dataGa}
                title={group.name}
              />
            ))
          ) : (
            <ColumnsSection columns={columns} searchQuery={searchQuery} dataGa={dataGa} />
          )}
        </Flex>
      </Drop>
    )

  return null
}

export default ColumnsMenu
