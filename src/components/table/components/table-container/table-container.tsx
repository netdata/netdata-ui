import React from "react"
import { StyledTable, BlockLayout } from "./styled"

const tableRenderOptions = {
  mainContainer: {
    block: ({ children, className, callbackRef, ...props }: any) => (
      <BlockLayout ref={callbackRef} className={`table-container ${className || ""}`} {...props}>
        {children}
      </BlockLayout>
    ),
    table: ({ children, callbackRef, ...props }: any) => (
      <StyledTable ref={callbackRef} {...props}>
        {children}
      </StyledTable>
    ),
  },
  tbody: {
    block: ({ children, ...props }: any) => (
      <div className="table-body" {...props}>
        {children}
      </div>
    ),
    table: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
  },
}

export const TableContainer = ({ children, layoutType, ...props }: any) => {
  const renderTableContainer = tableRenderOptions.mainContainer[layoutType]
  return renderTableContainer({ children, ...props })
}

export const TableBody = ({ children, layoutType, ...props }: any) => {
  const renderTableBody = tableRenderOptions.tbody[layoutType]
  return renderTableBody({ children, ...props })
}
