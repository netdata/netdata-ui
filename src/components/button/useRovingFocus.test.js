import React from "react"
import { renderWithProviders, screen, user } from "testUtilities"
import { IconButton, useRovingFocus } from "."

const actions = [
  { icon: "refresh", label: "Refresh" },
  { icon: "filter", label: "Filter" },
  { icon: "gear", label: "Settings" },
]

const Toolbar = ({ orientation }) => {
  const { getItemProps } = useRovingFocus({ count: actions.length, orientation })
  return (
    <div role="toolbar" aria-label="Actions" aria-orientation={orientation}>
      {actions.map(({ icon, label }, index) => (
        <IconButton key={icon} icon={icon} aria-label={label} {...getItemProps(index)} />
      ))}
    </div>
  )
}

const button = name => screen.getByRole("button", { name })

// Round 6 D4: one tab stop per toolbar, arrows move between its icon buttons.
describe("useRovingFocus", () => {
  it("gives the toolbar a single tab stop on the first item", async () => {
    renderWithProviders(<Toolbar />)
    expect(button("Refresh")).toHaveAttribute("tabindex", "0")
    expect(button("Filter")).toHaveAttribute("tabindex", "-1")
    await user().tab()
    expect(button("Refresh")).toHaveFocus()
  })

  it("moves with the horizontal arrows and wraps at both ends", async () => {
    renderWithProviders(<Toolbar />)
    const u = user()
    await u.tab()
    await u.keyboard("{ArrowRight}")
    expect(button("Filter")).toHaveFocus()
    expect(button("Filter")).toHaveAttribute("tabindex", "0")
    expect(button("Refresh")).toHaveAttribute("tabindex", "-1")
    await u.keyboard("{ArrowRight}{ArrowRight}")
    expect(button("Refresh")).toHaveFocus()
    await u.keyboard("{ArrowLeft}")
    expect(button("Settings")).toHaveFocus()
  })

  it("jumps to the ends with Home and End", async () => {
    renderWithProviders(<Toolbar />)
    const u = user()
    await u.tab()
    await u.keyboard("{End}")
    expect(button("Settings")).toHaveFocus()
    await u.keyboard("{Home}")
    expect(button("Refresh")).toHaveFocus()
  })

  it("uses the vertical arrows for a vertical toolbar", async () => {
    renderWithProviders(<Toolbar orientation="vertical" />)
    const u = user()
    await u.tab()
    await u.keyboard("{ArrowRight}")
    expect(button("Refresh")).toHaveFocus()
    await u.keyboard("{ArrowDown}")
    expect(button("Filter")).toHaveFocus()
    await u.keyboard("{ArrowUp}")
    expect(button("Refresh")).toHaveFocus()
  })

  it("remembers the last focused item as the tab stop", async () => {
    renderWithProviders(
      <>
        <Toolbar />
        <button type="button">After</button>
      </>
    )
    const u = user()
    await u.click(button("Settings"))
    await u.tab()
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus()
    await u.tab({ shift: true })
    expect(button("Settings")).toHaveFocus()
  })
})
