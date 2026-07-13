import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { useSortable } from "@dnd-kit/sortable"
import SortableItem from "./item"

jest.mock("@dnd-kit/sortable", () => ({
  ...jest.requireActual("@dnd-kit/sortable"),
  useSortable: jest.fn(),
}))

const renderedRefs = []
const Item = ({ ref }) => {
  renderedRefs.push(ref)
  return <span ref={ref} data-testid="sortable-item" />
}

const useSortableWithStateRef = () => {
  const [, setNodeRef] = React.useState(null)

  return {
    attributes: {},
    isDragging: false,
    isSorting: false,
    listeners: {},
    setActivatorNodeRef: jest.fn(),
    setNodeRef,
    transform: null,
    transition: null,
  }
}

describe("SortableItem", () => {
  beforeEach(() => {
    renderedRefs.length = 0
  })

  it("keeps its callback ref stable when the sortable ref updates state", () => {
    useSortable.mockImplementation(useSortableWithStateRef)

    renderWithProviders(<SortableItem draggable id="node" index={0} itemProps={{}} Item={Item} />)

    expect(screen.getByTestId("sortable-item")).toBeInTheDocument()
    expect(renderedRefs.length).toBeGreaterThan(1)
    expect(new Set(renderedRefs).size).toBe(1)
  })
})
