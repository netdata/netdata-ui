import "jest-styled-components"
import { renderWithProviders, screen, user, within } from "testUtilities"
import { waitFor } from "@testing-library/react"
import { DarkTheme } from "@/theme/dark"
import { DefaultTheme } from "@/theme/default"
import { getRgbColor } from "@/theme"
import Table from "@/components/table/table"

const data = [{ id: "node-1", name: "Node 1" }]
const dataColumns = [
  { id: "name", accessorKey: "name", header: "Name", cell: ({ getValue }) => getValue() },
]

const renderTable = (theme, actions, props) =>
  renderWithProviders(
    <Table
      data={data}
      dataColumns={dataColumns}
      enableSelection
      enableColumnVisibility
      bulkActions={actions}
      getRowId={row => row.id}
      {...props}
    />,
    { theme }
  )

it.each([DefaultTheme, DarkTheme])(
  "reveals the selection count and enables bulk actions",
  async theme => {
    const download = jest.fn()
    const acknowledge = jest.fn()
    renderTable(theme, {
      acknowledge: {
        handleAction: acknowledge,
        icon: "checkmark_s",
        tooltipText: "Acknowledge selected",
        confirmation: false,
      },
      download: { handleAction: download, alwaysEnabled: true },
    })
    const actor = user()
    const track = screen.getByRole("group", { name: "Table actions" })
    const acknowledgeButton = within(track).getByRole("button", { name: "Acknowledge selected" })
    const downloadButton = within(track).getByRole("button", { name: "Download" })
    const columnsButton = within(track).getByRole("button", { name: "Columns" })

    expect(acknowledgeButton).toBeDisabled()
    expect(acknowledgeButton.querySelector('[title="checkmark_s"]')).not.toBeNull()
    expect(downloadButton.querySelector('[title="download"]')).not.toBeNull()
    expect(columnsButton.querySelector('[title="columns"]')).not.toBeNull()
    expect(downloadButton).toHaveStyleRule("min-width", "24px", { modifier: "&&" })
    expect(downloadButton).toHaveStyleRule("border-radius", "50%")
    expect(track).toHaveStyleRule("background-color", getRgbColor("textLite", 0.06)({ theme }))
    await actor.click(downloadButton)
    expect(download).toHaveBeenCalledWith([], expect.anything())

    const checkbox = within(screen.getByTestId("netdata-table-row")).getByRole("checkbox")
    await actor.click(checkbox)
    await waitFor(() => expect(checkbox).toBeChecked())
    expect(within(track).getByRole("status")).toHaveTextContent("1 selected")
    expect(track).toHaveAttribute("data-selected")
    expect(track).toHaveStyleRule("background-color", getRgbColor("primary", 0.06)({ theme }), {
      modifier: "[data-selected]",
    })
    expect(acknowledgeButton).toBeEnabled()
    await actor.click(acknowledgeButton)
    expect(acknowledge).toHaveBeenCalledWith([data[0]], expect.anything())

    await actor.click(checkbox)
    expect(within(track).getByRole("status")).toBeEmptyDOMElement()
    expect(acknowledgeButton).toBeDisabled()
  }
)

it("keeps the columns menu operable with the keyboard", async () => {
  renderTable(DarkTheme, { download: { handleAction: () => {}, alwaysEnabled: true } })
  const actor = user()
  const download = screen.getByRole("button", { name: "Download" })
  const columns = screen.getByRole("button", { name: "Columns" })

  await actor.click(download)
  await actor.tab()
  expect(columns).toHaveFocus()
  await actor.keyboard("{Enter}")
  expect(screen.getByText("Show columns")).toBeInTheDocument()
  expect(columns).toHaveAttribute("aria-expanded", "true")
})

it("keeps explicit hollow columns and labeled add controls outside the compact track", () => {
  renderTable(
    DarkTheme,
    {
      download: { handleAction: () => {}, alwaysEnabled: true },
      addEntry: { handleAction: () => {}, label: "Connect node" },
    },
    { columnVisibilityFlavour: "hollow" }
  )

  const track = screen.getByRole("group", { name: "Table actions" })
  expect(within(track).getByRole("button", { name: "Download" })).toBeInTheDocument()
  expect(track).not.toContainElement(screen.getByRole("button", { name: "Columns" }))
  expect(track).not.toContainElement(screen.getByRole("button", { name: "Connect node" }))
})
