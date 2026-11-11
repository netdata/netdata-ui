import { renderWithProviders, screen, user } from "testUtilities"
import Table from "./table"

const data = [{ name: "Web", status: "Ready" }]
const name = { id: "name", header: "Name", cell: ({ getValue }) => getValue(), hasActions: true }
const status = { id: "status", header: "Status", cell: ({ getValue }) => getValue() }

it.each([false, true])(
  "puts the actions into the marked column with direct cells=%s",
  async directCellContent => {
    const edit = jest.fn()
    const openRow = jest.fn()
    renderWithProviders(
      <Table
        data={data}
        dataColumns={[name, status]}
        rowActions={{ edit: { handleAction: edit } }}
        onClickRow={openRow}
        virtualizeOptions={{ directCellContent }}
      />
    )

    const action = await screen.findByTestId("netdata-table-action-edit")
    expect(screen.getByTestId("netdata-table-cell-name")).toContainElement(action)
    expect(screen.queryByTestId("netdata-table-cell-actions")).toBeNull()
    await user().click(action)
    expect(edit).toHaveBeenCalledTimes(1)
    expect(openRow).not.toHaveBeenCalled()
  }
)

it("puts the action column back when the marked leaf is hidden", async () => {
  renderWithProviders(
    <Table
      data={data}
      dataColumns={[{ id: "server", header: "Server", columns: [name, status] }]}
      columnVisibility={{ name: false }}
      rowActions={{ edit: { handleAction: jest.fn() } }}
    />
  )

  const action = await screen.findByTestId("netdata-table-action-edit")
  expect(screen.getByTestId("netdata-table-cell-actions")).toContainElement(action)
})

it("keeps confirmation and disabled states when row actions overflow", async () => {
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, "clientWidth")
  const clientWidth = jest
    .spyOn(Element.prototype, "clientWidth", "get")
    .mockImplementation(function () {
      return this.dataset?.testid === "action-cell" ? 60 : descriptor.get.call(this)
    })
  const remove = jest.fn()
  const info = jest.fn()

  try {
    renderWithProviders(
      <Table
        data={data}
        dataColumns={[name, status]}
        rowActions={{
          delete: { handleAction: remove },
          info: { handleAction: info, isDisabled: true },
          edit: { handleAction: jest.fn() },
        }}
      />
    )

    const more = await screen.findByRole("button", { name: "3 more row actions" })
    await user().click(more)
    expect(screen.getByRole("button", { name: "Information" })).toBeDisabled()
    await user().click(screen.getByRole("button", { name: "Delete" }))
    expect(remove).not.toHaveBeenCalled()
    await user().click(screen.getByTestId("confirmationDialog-confirmAction"))
    expect(remove).toHaveBeenCalledTimes(1)
    expect(info).not.toHaveBeenCalled()
  } finally {
    clientWidth.mockRestore()
  }
})
