/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"
import React, { useState } from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { UserTableSchema } from "./mocks/mocked-table-schema"
import { EnhancedTable } from "./mocks/styled"

const initialState = [
  {
    user: { photo: "https://i.pravatar.cc/30", name: "Fry" },
    dots: "123",
    email: "noway@noway.com",
  },

  {
    user: { photo: "https://i.pravatar.cc/31", name: "Amy" },
    email: "amy@vong.com",
    dots: "123",
    disabled: true,
  },
  {
    user: {
      photo: "https://i.pravatar.cc/32",
      name: "dr. Zoidberg",
    },
    email: "amy@vong.com",
    dots: "123",
  },
]

const makeComponent = () => {
  const toggleSelectedItemClb = jest.fn()
  const selectedItemsClb = jest.fn()

  const Component = props => {
    const [groupBy, setGroupBy] = useState([])

    return (
      <>
        <button type="button" onClick={() => setGroupBy(["email"])}>
          Group by email
        </button>
        <EnhancedTable
          sortableBy={["user"]}
          controlledState={{ groupBy }}
          columns={UserTableSchema}
          data={initialState}
          itemIsDisabled={item => !!item.disabled}
          selectedItemsClb={selectedItemsClb}
          toggleSelectedItemClb={toggleSelectedItemClb}
          {...props}
        />
      </>
    )
  }

  return { toggleSelectedItemClb, selectedItemsClb, Component }
}
describe("Table component test", () => {
  it(" * should render a table", () => {
    const { Component, selectedItemsClb, toggleSelectedItemClb } = makeComponent()
    const { getByText, getAllByText, queryByTestId } = renderWithProviders(<Component />)
    expect(selectedItemsClb).toBeCalledWith([])
    expect(toggleSelectedItemClb).not.toBeCalled()

    expect(getByText("noway@noway.com")).toBeInTheDocument()
    expect(getAllByText("amy@vong.com")).toHaveLength(2)
    expect(queryByTestId("table-pagination")).not.toBeInTheDocument()
  })

  it(" * should select all rows", () => {
    const { Component, selectedItemsClb, toggleSelectedItemClb } = makeComponent()
    const { getByTitle } = renderWithProviders(<Component />)

    fireEvent.click(getByTitle("Toggle All Rows Selected"))
    expect(selectedItemsClb).toBeCalledWith([
      {
        dots: "123",
        email: "noway@noway.com",
        user: { name: "Fry", photo: "https://i.pravatar.cc/30" },
      },
      {
        dots: "123",
        email: "amy@vong.com",
        user: { name: "dr. Zoidberg", photo: "https://i.pravatar.cc/32" },
      },
    ])
    expect(toggleSelectedItemClb).not.toBeCalled()
  })

  it(" * should select rows", () => {
    const { Component, toggleSelectedItemClb } = makeComponent()
    const { getAllByTitle } = renderWithProviders(<Component />)

    fireEvent.click(getAllByTitle("Toggle Row Selected")[1])
    expect(toggleSelectedItemClb).not.toBeCalled()

    fireEvent.click(getAllByTitle("Toggle Row Selected")[0])
    expect(toggleSelectedItemClb).toBeCalledWith(
      {
        dots: "123",
        email: "noway@noway.com",
        user: {
          name: "Fry",
          photo: "https://i.pravatar.cc/30",
        },
      },
      true
    )
  })

  it(" * should group", () => {
    const { Component, selectedItemsClb, toggleSelectedItemClb } = makeComponent()
    const { getByText, getAllByTitle, getByTitle } = renderWithProviders(<Component />)

    fireEvent.click(getByText("Group by email"))
    expect(getAllByTitle("group-head")).toHaveLength(2)

    fireEvent.click(getByTitle("Toggle All Rows Selected"))
    expect(selectedItemsClb).toBeCalledWith([
      {
        dots: "123",
        email: "noway@noway.com",
        user: { name: "Fry", photo: "https://i.pravatar.cc/30" },
      },
      {
        dots: "123",
        email: "amy@vong.com",
        user: { name: "dr. Zoidberg", photo: "https://i.pravatar.cc/32" },
      },
    ])

    fireEvent.click(getAllByTitle("Toggle Row Selected")[0])
    expect(toggleSelectedItemClb).toBeCalledWith(
      {
        dots: "123",
        email: "noway@noway.com",
        user: {
          name: "Fry",
          photo: "https://i.pravatar.cc/30",
        },
      },
      false
    )
  })

  it(" * should render a table with pagination", () => {
    const { Component } = makeComponent()
    const { getByTestId } = renderWithProviders(
      <Component initialState={{ pageSize: 2 }} withPagination />
    )

    expect(getByTestId("table-pagination")).toBeInTheDocument()
  })
})
