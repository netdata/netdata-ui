import React, { useContext } from "react"
import { ColumnInstance } from "react-table"
import { LayoutContext } from "../../layout-context"
import { StyledThead } from "./styled"
import { ColumnHead } from "../column-head"

const tableHeadRenderOptions = {
  thead: {
    block: ({ children }: any) => <div className="table-head">{children}</div>,
    table: ({ children }: any) => <StyledThead>{children}</StyledThead>,
  },
  headerGroup: {
    block: ({ children, ...props }: any) => (
      <div className="header-group" {...props}>
        {children}
      </div>
    ),
    table: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  },
}

const TableHeadLayout = ({ children, layoutType }: any) => {
  const renderTableHead = tableHeadRenderOptions.thead[layoutType]
  return renderTableHead({ children })
}

const HeaderGroup = ({ children, layoutType, ...props }: any) => {
  const renderHeaderGroup = tableHeadRenderOptions.headerGroup[layoutType]
  return renderHeaderGroup({ children, ...props })
}

interface Props {
  headerGroups: any[]
  sortableBy: string[]
  customProps?: Object
}

export const TableHead = ({ headerGroups, sortableBy, customProps }: Props) => {
  const layoutType = useContext(LayoutContext)
  return (
    <TableHeadLayout layoutType={layoutType}>
      {headerGroups.map(headerGroup => {
        const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps()
        return (
          <HeaderGroup key={key} {...headerGroupProps} layoutType={layoutType}>
            {headerGroup.headers.map((column: ColumnInstance) => {
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
