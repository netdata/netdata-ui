import React from "react"
import { UseTableCellProps, CellProps } from "react-table"
import { Checkbox } from "../../checkbox"
import { StyledIcon, CellBox, OptionsBtn, ArrowIcon } from "../styled"
import { Button } from "../../button"

export const UserHeader = [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      // @ts-ignore | TBD: IMPROVE PROPS
      const { checked, onChange } = getToggleAllRowsSelectedProps()
      return <Checkbox checked={checked} onChange={onChange} />
    },
    Cell: ({ row }: UseTableCellProps<any>) => {
      // @ts-ignore | TBD: IMPROVE PROPS
      const { checked, onChange } = row.getToggleRowSelectedProps()
      return <Checkbox checked={checked} onChange={onChange} />
    },
  },
  {
    id: "options",
    accessor: "options",

    Header: () => (
      <CellBox>
        <StyledIcon name="arrow_down" />
        Users
      </CellBox>
    ),
    Cell: ({ cell }: CellProps<any>) => {
      return <CellBox>{cell.value}</CellBox>
    },
  },
  {
    id: "adding",
    accessor: "adding",
    Header: ({ callAddUser, callSettings }: any) => (
      <CellBox reversed>
        <Button icon="plus" onClick={callAddUser} />
        <OptionsBtn
          icon="gear"
          type="borderless"
          onClick={callSettings}
          label={<ArrowIcon name="triangle_down" size="small" />}
        />
      </CellBox>
    ),
    Cell: (props: any) => (
      <CellBox reversed>
        <StyledIcon name="nav_dots" {...props} />
      </CellBox>
    ),
  },
]
