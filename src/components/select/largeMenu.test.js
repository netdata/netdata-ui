import { renderWithProviders, screen, user, fireEvent } from "testUtilities"
import Select from "."

const flat = Array.from({ length: 300 }, (_, i) => ({ label: `system.ctx${i}`, value: `ctx${i}` }))
const grouped = [
  { label: "Host labels", options: flat.slice(0, 150) },
  { label: "Chart labels", options: flat.slice(150) },
]

const open = async (props = {}) => {
  const labels = jest.fn(option => option.label)
  renderWithProviders(
    <Select aria-label="sel" classNamePrefix="rs" options={flat} formatOptionLabel={labels} {...props} />
  )
  await user().click(screen.getByRole("combobox"))
  return labels
}

const rows = () => [...document.querySelectorAll(".rs__option")]
const rules = () => [...document.styleSheets].flatMap(sheet => [...sheet.cssRules])
const hoverRuleOf = row =>
  rules().find(rule => [...row.classList].some(name => rule.selectorText === `.${name}:hover`))

describe("Select with many options", () => {
  it("does no option work when the pointer moves over a row", async () => {
    const labels = await open()
    const combobox = screen.getByRole("combobox")
    const active = combobox.getAttribute("aria-activedescendant")
    labels.mockClear()

    fireEvent.mouseMove(rows()[2])
    fireEvent.mouseOver(rows()[2])

    expect(labels).not.toHaveBeenCalled()
    expect(combobox.getAttribute("aria-activedescendant")).toBe(active)
  })

  it("highlights the row under the pointer through the stylesheet", async () => {
    await open()

    expect(hoverRuleOf(rows()[2]).style.backgroundColor).not.toBe("")
  })

  it("still selects the row that is clicked", async () => {
    const onChange = jest.fn()
    await open({ onChange })

    await user().click(rows()[2])

    expect(onChange).toHaveBeenCalledWith(flat[2], expect.anything())
  })

  it("keeps a custom option free of pointer work too", async () => {
    const Option = ({ innerProps, children }) => (
      <div {...innerProps} className="rs__option">
        {children}
      </div>
    )
    const labels = await open({ components: { Option } })
    labels.mockClear()

    fireEvent.mouseMove(rows()[2])
    fireEvent.mouseOver(rows()[2])

    expect(labels).not.toHaveBeenCalled()
  })

  it("mounts only the rows near the viewport of a grouped list", async () => {
    await open({ options: grouped })

    expect(rows().length).toBeLessThan(40)
    expect(rows().length).toBeGreaterThan(0)
    expect(screen.getByText("Host labels")).toBeVisible()
  })

  it("mounts every row of a short list", async () => {
    await open({ options: [{ label: "A", options: flat.slice(0, 60) }, { label: "B", options: flat.slice(60, 120) }] })

    expect(rows()).toHaveLength(120)
    expect(screen.getByText("B")).toBeVisible()
  })

  it("keeps a grouped list navigable by keyboard across groups", async () => {
    const onChange = jest.fn()
    await open({ options: [{ label: "A", options: flat.slice(0, 2) }, { label: "B", options: flat.slice(2, 4) }], onChange })

    await user().keyboard("{ArrowDown}{ArrowDown}{Enter}")

    expect(onChange).toHaveBeenCalledWith(flat[2], expect.anything())
  })

  it("shows a footer note below the scrolling list", async () => {
    await open({ menuFooter: "Nodes without the label never match." })
    const footer = screen.getByText("Nodes without the label never match.")

    expect(document.querySelector(".rs__menu")).toContainElement(footer)
    expect(document.querySelector(".rs__menu-list")).not.toContainElement(footer)
    expect(footer).toHaveClass("rs__menu-footer")
  })
})

it("keeps the heading of the group being read in view while scrolling", async () => {
  await open({ options: grouped })
  const list = document.querySelector(".rs__menu-list")

  Object.defineProperty(list, "scrollTop", { configurable: true, value: 20000 })
  fireEvent.scroll(list)

  expect(await screen.findByText("Host labels")).toBeVisible()
  expect(list.querySelector('[data-index="0"]')).not.toBeInTheDocument()
  expect(screen.queryByText("Chart labels")).not.toBeInTheDocument()
})
