import "jest-styled-components"
import { renderWithProviders, screen, fireEvent, waitFor } from "testUtilities"
import Table from "../../../table"

const data = [{ id: "node-1", name: "Node 1", cpu: 3 }]
const dataColumns = [
  { id: "name", header: "Name", name: "Name", cell: ({ getValue }) => getValue() },
  { id: "cpu", header: "CPU", name: "CPU", cell: ({ getValue }) => getValue() },
]

const openMenu = () => {
  renderWithProviders(
    <Table data={data} dataColumns={dataColumns} enableColumnVisibility getRowId={row => row.id} />
  )
  fireEvent.click(screen.getByRole("button", { name: "Columns" }))
  return screen.getByText("Show columns").parentElement.parentElement
}

describe("Table columns menu", () => {
  it("uses the shared 6px menu radius", () => {
    expect(openMenu()).toHaveStyleRule("border-radius", "6px")
  })

  it("lists every hideable column with its visibility checked", () => {
    openMenu()

    expect(screen.getByLabelText("Name").checked).toBe(true)
    expect(screen.getByLabelText("CPU").checked).toBe(true)
  })

  it("filters the column list by search query", async () => {
    openMenu()

    fireEvent.change(screen.getByPlaceholderText("Search columns..."), { target: { value: "cp" } })

    // The search input debounces its onChange.
    await waitFor(() => expect(screen.queryByLabelText("Name")).toBeNull())
    expect(screen.getByLabelText("CPU")).toBeInTheDocument()
  })
})
