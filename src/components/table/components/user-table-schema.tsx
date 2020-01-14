import React from "react"
import { Checkbox } from "../../checkbox"
import {
  StyledIcon,
  CellBox,
  OptionsBtn,
  ArrowIcon,
  Avatar,
  RowBox,
  IconPlaceholder,
} from "../styled"
import { Button } from "../../button"

export const UserTableSchema = [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      // @ts-ignore | TBD: IMPROVE PROPS
      const { checked, onChange, indeterminate } = getToggleAllRowsSelectedProps()
      return <Checkbox checked={checked} onChange={onChange} indeterminate={indeterminate} />
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
    Header: ({ column }: { column: any }) => {
      const isSorted = column.isSortedDesc !== undefined
      return (
        <CellBox>
          {isSorted ? (
            <StyledIcon descending={Boolean(column.isSortedDesc)} name="arrow_down" />
          ) : (
            <IconPlaceholder />
          )}
          Users
        </CellBox>
      )
    },
    Cell: ({ cell }: any) => {
      const { name, photo } = cell.value
      return (
        <RowBox>
          <CellBox>
            <Avatar src={photo} alt={`${name} avatar`} />
            {name}
          </CellBox>
        </RowBox>
      )
    },
  },
  {
    id: "email",
    accessor: "email",
    aggregate: "sum",
    Header: ({ column }: any) => {
      return <CellBox {...column.getGroupByToggleProps()}>Emails</CellBox>
    },
    Cell: ({ cell, row }: any) => {
      const email = cell.value
      return (
        <RowBox>
          <CellBox>{email}</CellBox>
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
