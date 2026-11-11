import { renderWithProviders, screen } from "testUtilities"
import Tabs from "."

const Probe = ({ collapsed, onResize, parentRef, label }) => (
  <span data-testid={label} data-collapsed={String(collapsed)}>
    {typeof onResize}-{parentRef ? "ref" : "noref"}
  </span>
)

describe("Navigation Tabs", () => {
  it("hands collapse state, resize callback and the strip ref to each child", () => {
    renderWithProviders(
      <Tabs>
        <Probe label="one" />
        <Probe label="two" />
      </Tabs>
    )
    expect(screen.getByTestId("one")).toHaveAttribute("data-collapsed", "false")
    expect(screen.getByTestId("one")).toHaveTextContent("function-ref")
    expect(screen.getByTestId("two")).toHaveTextContent("function-ref")
  })

  it("passes collapse state to subTabs", () => {
    renderWithProviders(
      <Tabs subTabs={<Probe label="sub" />}>
        <Probe label="one" />
      </Tabs>
    )
    expect(screen.getByTestId("sub")).toHaveAttribute("data-collapsed", "false")
  })

  it("spreads extra props onto the strip", () => {
    renderWithProviders(
      <Tabs data-testid="strip">
        <Probe label="one" />
      </Tabs>
    )
    expect(screen.getByTestId("strip")).toContainElement(screen.getByTestId("one"))
  })
})
