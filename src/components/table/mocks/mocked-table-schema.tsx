import React, { useCallback } from "react"
import { Checkbox } from "../../checkbox"
import {
  StyledIcon,
  CellBox,
  OptionsBtn,
  ArrowIcon,
  Avatar,
  IconPlaceholder,
  NestedCellContainer,
  NestedCell,
} from "./styled"
import { Button } from "../../button"

export const UserTableSchema = [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      return <Checkbox {...getToggleAllRowsSelectedProps()} />
    },
    Cell: ({ row, itemIsDisabled, toggleSelectedItemClb }: any) => {
      const { checked, onChange, ...rest } = row.getToggleRowSelectedProps()

      const isDisabled = itemIsDisabled ? itemIsDisabled(row.original) : false
      const isChecked = isDisabled ? false : checked

      const onToggle = useCallback(
        e => {
          if (!isDisabled && toggleSelectedItemClb) {
            toggleSelectedItemClb(row.original, e.target.checked)
          }

          onChange(e)
        },
        [row, isDisabled, toggleSelectedItemClb, onChange]
      )

      return (
        <CellBox>
          <Checkbox {...rest} checked={isChecked} onChange={onToggle} disabled={isDisabled} />
        </CellBox>
      )
    },
  },
  {
    id: "user",
    /*
    Documentation is a bit unclear on how to work with sortTypes, and also default
    sort functions are not exported, so we are using another way of working
    with object values sorting. We provide accessor to the prop to base our sorting on.

    It makes sorting simple, but rendering - more tricky.
    Value of cell / row will be primitive (the one we gave accessor to get), se we have to use
    original row and its data to render other object values (which are left out by our accessor)

    Keep in mind that grouping also works by accessor, so suddenly without overriding defaults,
    we can group this column only by the accessed value, which will be user.name
    */
    accessor: row => {
      return row.user.name
    },
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
    Cell: ({ row }: any) => {
      const {
        user: { name, photo },
      } = row.original
      return (
        <CellBox>
          <Avatar src={photo} alt={`${name} avatar`} />
          {name}
        </CellBox>
      )
    },
  },
  {
    id: "email",
    accessor: "email",
    Header: ({ column }: any) => {
      return <CellBox {...column.getGroupByToggleProps()}>Emails</CellBox>
    },
    Cell: ({ cell, row }: any) => {
      const email = cell.value
      const {
        user: { name },
      } = row.original
      return (
        <NestedCellContainer>
          <NestedCell>{email}</NestedCell>
          <NestedCell>{name}</NestedCell>
        </NestedCellContainer>
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
      <CellBox reversed>
        <StyledIcon name="nav_dots" {...props} />
      </CellBox>
    ),
  },
]
