import React from "react"
import Drop from "@/components/drops/drop/index.js"
import Flex from "@/components/templates/flex"
import { ListItem, Text } from "@/components/typography"
import { Checkbox } from "@/components/checkbox"

const ColumnsMenuItem = ({ column, dataGa, disabled }) => {
  const checked = column.getIsVisible()
  return (
    <Flex alignItems="center" as={ListItem} justifyContent="between" padding={[1]}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        label={column.columnDef.name || column.id}
        onChange={val => column.getToggleVisibilityHandler()({ target: { checked: val } })}
        data-ga={`columns-menu::click-${checked ? "disable" : "enable"}-${column.id}-::${dataGa}`}
      />
    </Flex>
  )
}

const ColumnsMenu = ({ dataGa, parentRef, isOpen, columns, onClose, pinnedColumns }) => {
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

        <Flex column padding={[1, 3]}>
          {pinnedColumns.length ? (
            <Flex
              border={{
                size: "1px",
                type: "solid",
                side: "bottom",
                color: "borderSecondary",
              }}
              column
            >
              {pinnedColumns.map(pinnedColumn => (
                <ColumnsMenuItem column={pinnedColumn} dataGa={dataGa} key={pinnedColumn.id} />
              ))}
            </Flex>
          ) : null}
          {columns.map(column => (
            <ColumnsMenuItem column={column} dataGa={dataGa} key={column.id} />
          ))}
        </Flex>
      </Drop>
    )

  return null
}

export default ColumnsMenu
