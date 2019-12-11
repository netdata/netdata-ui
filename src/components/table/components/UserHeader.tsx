import React from "react"
import { Checkbox } from "../../checkbox"
import { StyledIcon, CellBox, OptionsBtn, ArrowIcon, Avatar, RowBox } from "../styled"
import { Button } from "../../button"

export const UserTableSchema = [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      // @ts-ignore | TBD: IMPROVE PROPS
      const { checked, onChange } = getToggleAllRowsSelectedProps()
      return <Checkbox checked={checked} onChange={onChange} />
    },
    Cell: ({ row }: any) => {
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
    Cell: ({ cell }: any) => {
      const { name, mail, photo } = cell.value
      return (
        <RowBox>
          <CellBox>
            <Avatar src={photo} alt={`${name} avatar`} />
            {name}
            {mail}
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
