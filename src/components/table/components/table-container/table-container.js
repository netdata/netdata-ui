import React from "react"
import { StyledTable, BlockLayout } from "./styled"

const tableRenderOptions = {
  mainContainer: {
    block: ({ children, className, callbackRef, ...props }) => (
      <BlockLayout ref={callbackRef} className={`table-container ${className || ""}`} {...props}>
        {children}
      </BlockLayout>
    ),
    table: ({ children, callbackRef, ...props }) => (
      <StyledTable ref={callbackRef} {...props}>
        {children}
      </StyledTable>
    ),
  },
  tbody: {
    block: ({ children, ...props }) => (
      <div className="table-body" {...props}>
        {children}
      </div>
    ),
    table: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  },
}

export const TableContainer = ({ children, layoutType, ...props }) => {
  const renderTableContainer = tableRenderOptions.mainContainer[layoutType]
  return renderTableContainer({ children, ...props })
}

export const TableBody = ({ children, layoutType, ...props }) => {
  const renderTableBody = tableRenderOptions.tbody[layoutType]
  return renderTableBody({ children, ...props })
}
