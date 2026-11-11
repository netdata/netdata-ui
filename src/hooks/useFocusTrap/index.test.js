import { useRef, useState } from "react"
import { render, screen, userEvent } from "testUtilities"
import { getFocusCandidates, useFocusTrap } from "."

const Picker = () => {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState(null)
  const restoreFocus = useRef(null)
  useFocusTrap(container, { restoreFocus })

  return (
    <>
      <button ref={restoreFocus} onClick={() => setOpen(true)}>
        Open picker
      </button>
      <button>Outside</button>
      {open ? (
        <div role="dialog" ref={setContainer}>
          <button aria-hidden="true">Hidden choice</button>
          <button tabIndex={-1}>Non-tabbable choice</button>
          <button>First choice</button>
          <button onClick={() => setOpen(false)}>Close picker</button>
        </div>
      ) : null}
    </>
  )
}

it("focuses the first choice, wraps in both directions, and restores the opener", async () => {
  const user = userEvent.setup()
  render(<Picker />)
  const open = screen.getByRole("button", { name: "Open picker" })
  const outside = screen.getByRole("button", { name: "Outside" })
  await user.click(open)

  const first = screen.getByRole("button", { name: "First choice" })
  const last = screen.getByRole("button", { name: "Close picker" })
  expect(first).toHaveFocus()
  await user.tab({ shift: true })
  expect(last).toHaveFocus()
  await user.tab()
  expect(first).toHaveFocus()
  await user.tab()
  expect(last).toHaveFocus()
  await user.click(outside)
  await user.tab({ shift: true })
  expect(last).toHaveFocus()
  await user.keyboard("{Enter}")
  expect(open).toHaveFocus()
})

it("keeps the hidden-input selector policy explicit and retains opted-in tabindex candidates", () => {
  render(
    <div data-testid="candidates">
      <button type="button" disabled>
        Disabled
      </button>
      <input type="hidden" data-testid="implicit-hidden" />
      <input type="hidden" tabIndex={0} data-testid="explicit-hidden" />
      <a href="/docs" data-testid="link">
        Docs
      </a>
      <button type="button" tabIndex={-1} data-testid="programmatic">
        Opted out
      </button>
    </div>
  )
  const node = screen.getByTestId("candidates")
  const explicit = screen.getByTestId("explicit-hidden")
  const implicit = screen.getByTestId("implicit-hidden")
  const link = screen.getByTestId("link")
  const programmatic = screen.getByTestId("programmatic")
  expect(getFocusCandidates(node)).toEqual([explicit, link, programmatic])
  expect(getFocusCandidates(node, { includeHiddenInputs: true })).toEqual([
    implicit,
    explicit,
    link,
    programmatic,
  ])
})
