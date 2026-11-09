import React, { useRef, useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import useFocusAfterCommit from "."

const Fixture = ({ focus, label = "Open" }) => {
  const [open, setOpen] = useState(false)
  const target = useRef(null)
  const focusAfterCommit = useFocusAfterCommit(focus)
  return (
    <>
      <button
        onClick={() => {
          focusAfterCommit(() => target.current)
          setOpen(true)
        }}
      >
        {label}
      </button>
      {open ? (
        <div ref={target} tabIndex={-1} data-testid="target">
          <button>Nested action</button>
        </div>
      ) : null}
    </>
  )
}

describe("useFocusAfterCommit", () => {
  it("focuses a target mounted by the next commit", async () => {
    const user = userEvent.setup()
    render(<Fixture />)

    await user.click(screen.getByRole("button", { name: "Open" }))

    expect(document.activeElement).toBe(screen.getByTestId("target"))
  })

  it("supports caller-defined focus behavior", async () => {
    const user = userEvent.setup()
    render(<Fixture focus={target => target.querySelector("button")?.focus()} />)

    await user.click(screen.getByRole("button", { name: "Open" }))

    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Nested action" }))
  })

  it("does not repeat a focus request after a later render", async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Fixture />)

    await user.click(screen.getByRole("button", { name: "Open" }))
    await user.click(screen.getByRole("button", { name: "Nested action" }))
    rerender(<Fixture label="Opened" />)

    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Nested action" }))
  })
})
