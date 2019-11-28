import React, { ChangeEvent } from "react"
import { Checkbox } from "../../checkbox"
import { StyledIcon, CellBox, OptionsBtn, ArrowIcon } from "../styled"
import { Button } from "../../button"

export type UserHeaderPropsT = {
  handleAll: (e: ChangeEvent<HTMLInputElement>) => void
  isAllSelected: boolean
  callAddUser?: () => void
  callSettings?: () => void
}

export const UHeader = [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      const { checked, onChange } = getToggleAllRowsSelectedProps()
      return <Checkbox checked={checked} onChange={onChange} />
    },
    Cell: ({ row }) => {
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
    Cell: ({ cell }) => {
      return <CellBox>{cell.value}</CellBox>
    },
  },
  {
    id: "adding",
    accessor: "adding",
    Header: ({ callAddUser, callSettings }) => (
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
    Cell: ({ cell }) => (
      <CellBox reversed>
        <StyledIcon name="nav_dots" />
      </CellBox>
    ),
  },
]
