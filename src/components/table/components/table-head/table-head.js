import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"
import { StyledThead } from "./styled"
import { ColumnHead } from "../column-head"

const tableHeadRenderOptions = {
  thead: {
    block: ({ children }) => <div className="table-head">{children}</div>,
    table: ({ children }) => <StyledThead>{children}</StyledThead>,
  },
  headerGroup: {
    block: ({ children, ...props }) => (
      <div className="header-group" {...props}>
        {children}
      </div>
    ),
    table: ({ children, ...props }) => <tr {...props}>{children}</tr>,
  },
}

const TableHeadLayout = ({ children, layoutType }) => {
  const renderTableHead = tableHeadRenderOptions.thead[layoutType]
  return renderTableHead({ children })
}

const HeaderGroup = ({ children, layoutType, ...props }) => {
  const renderHeaderGroup = tableHeadRenderOptions.headerGroup[layoutType]
  return renderHeaderGroup({ children, ...props })
}

export const TableHead = ({ headerGroups, sortableBy, customProps }) => {
  const layoutType = useContext(LayoutContext)
  return (
    <TableHeadLayout layoutType={layoutType}>
      {headerGroups.map(headerGroup => {
        const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps()
        return (
          <HeaderGroup key={key} {...headerGroupProps} layoutType={layoutType}>
            {headerGroup.headers.map(column => {
              const { key } = column.getHeaderProps()
              return (
                <ColumnHead
                  key={key}
                  column={column}
                  sortableBy={sortableBy}
                  customProps={customProps}
                />
              )
            })}
          </HeaderGroup>
        )
      })}
    </TableHeadLayout>
  )
}
