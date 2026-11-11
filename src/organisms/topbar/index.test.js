import { renderWithProviders, screen } from "testUtilities"
import Topbar from "."

const renderTopbar = props =>
  renderWithProviders(
    <Topbar mainChild={<span>Title</span>} {...props}>
      <button>One</button>
      <button>Two</button>
    </Topbar>
  )

describe("Topbar", () => {
  it("centres the main child and the actions vertically", () => {
    const { container } = renderTopbar()
    expect(container.firstChild).toHaveStyleRule("align-items", "center")
    expect(container.firstChild).toHaveStyleRule("justify-content", "space-between")
  })

  it("renders the main child before the actions", () => {
    renderTopbar()
    const title = screen.getByText("Title")
    const first = screen.getByRole("button", { name: "One" })
    expect(title.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it("keeps the existing action gaps", () => {
    renderTopbar()
    const actions = screen.getByRole("button", { name: "One" }).parentElement
    expect(actions).toHaveStyleRule("gap", "20px")
  })

  it("widens the action gap when extended", () => {
    renderTopbar({ extended: true })
    const actions = screen.getByRole("button", { name: "One" }).parentElement
    expect(actions).toHaveStyleRule("gap", "32px")
  })
})
