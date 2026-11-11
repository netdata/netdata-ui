import { renderWithProviders, screen, user } from "testUtilities"
import { Tab, Tabs } from "."

it("selects and labels a vertical panel with keyboard navigation", async () => {
  renderWithProviders(
    <Tabs orientation="vertical">
      <Tab label="Info">Info panel</Tab>
      <Tab label="Unavailable" disabled />
      <Tab label="Nodes">Nodes panel</Tab>
    </Tabs>
  )
  const keyboard = user()
  const info = screen.getByRole("tab", { name: "Info" })
  const nodes = screen.getByRole("tab", { name: "Nodes" })
  expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical")
  await keyboard.tab()
  expect(info).toHaveFocus()
  expect(screen.getByRole("tabpanel", { name: "Info" })).toHaveTextContent("Info panel")

  await keyboard.keyboard("{ArrowDown}")
  expect(nodes).toHaveFocus()
  expect(nodes).toHaveAttribute("aria-selected", "true")
  expect(screen.getByRole("tabpanel", { name: "Nodes" })).toHaveTextContent("Nodes panel")
  expect(screen.getByRole("tabpanel").id).toBe(nodes.getAttribute("aria-controls"))

  await keyboard.keyboard("{ArrowRight}")
  expect(nodes).toHaveFocus()
  await keyboard.keyboard("{ArrowUp}")
  expect(info).toHaveFocus()
  await keyboard.keyboard("{End}")
  expect(nodes).toHaveFocus()
  await keyboard.keyboard("{Home}")
  expect(info).toHaveFocus()
})
