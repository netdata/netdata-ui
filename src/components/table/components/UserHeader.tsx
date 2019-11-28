import React from "react"
import { UseTableCellProps, CellProps } from "react-table"
import { Checkbox } from "../../checkbox"
import { StyledIcon, CellBox, OptionsBtn, ArrowIcon, Avatar, RowBox } from "../styled"
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
      return (
        <RowBox>
          <CellBox>
            <Checkbox checked={checked} onChange={onChange} />
          </CellBox>
        </RowBox>
      )
    },
  },
  {
    id: "user",
    accessor: "user",

    Header: () => (
      <CellBox>
        <StyledIcon name="arrow_down" />
        Users
      </CellBox>
    ),
    Cell: ({ cell }: CellProps<any>) => {
      const { name, mail, photo } = cell.value
      return (
        <RowBox>
          <CellBox>
            <Avatar src={photo} alt={`${name} avatar`} />
            {name} ({mail})
          </CellBox>
        </RowBox>
      )
    },
  },
  {
    id: "dots",
    accessor: "dots",
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
      <RowBox>
        <CellBox reversed>
          <StyledIcon name="nav_dots" {...props} />
        </CellBox>
      </RowBox>
    ),
  },
]
