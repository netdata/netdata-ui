import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import Intersection from "."

export const Basic = () => (
  <Flex height="3000px" column>
    <Intersection fallback="visible outside the viewport" padding={[8, 15]} border>
      Visible inside the viewport. Scroll down and see the inspect element
    </Intersection>
  </Flex>
)

const nodes = Array.from({ length: 30 }, (_, i) => `node-${String(i + 1).padStart(2, "0")}.prod`)

export const DeferredList = () => (
  <Flex column gap={2} width="360px">
    {nodes.map(node => (
      <Intersection
        key={node}
        height="96px"
        border
        round
        padding={[3]}
        fallback={() => <TextSmall color="textLite">Loading {node}</TextSmall>}
      >
        {() => (
          <Flex column gap={1}>
            <Text strong>{node}</Text>
            <TextSmall color="textLite">system.cpu 42.7%</TextSmall>
          </Flex>
        )}
      </Intersection>
    ))}
  </Flex>
)

export const EarlyRootMargin = () => (
  <Flex height="3000px" column>
    <Intersection
      rootMargin="400px"
      fallback="Rendered 400px before it enters the viewport"
      border
      padding={[4]}
    >
      Content mounted early so it is ready when scrolled to
    </Intersection>
  </Flex>
)

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

export default {
  title: "Components/Intersection",
  component: Intersection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Renders its children only while it is inside the viewport and a fallback otherwise. Use it to defer expensive content, such as charts in a long list of nodes, until the user scrolls to it.",
      },
    },
  },
  argTypes: {
    height: prop("Height while visible.", "string | number | object", '"100%"', "text"),
    width: prop("Width.", "string | number | object", '"100%"', "text"),
    fallback: prop(
      "Content shown while out of view. May be a function.",
      "ReactNode | () => ReactNode",
      "null",
      "text"
    ),
    root: {
      description:
        "Element used as the viewport for the observer. Defaults to the browser viewport.",
      control: false,
      table: { type: { summary: "Element | null" }, defaultValue: { summary: "undefined" } },
    },
    rootMargin: prop(
      "Margin around the root, as in IntersectionObserver.",
      "string",
      '"0px"',
      "text"
    ),
    threshold: prop(
      "Share of the element that must be visible, 0 to 1.",
      "number | number[]",
      "0",
      { type: "number", min: 0, max: 1, step: 0.1 }
    ),
    onVisibility: {
      description: "Called when visibility changes.",
      control: false,
      action: "onVisibility",
      table: { type: { summary: "(visible: boolean) => void" } },
    },
    children: {
      description: "Content rendered while visible. May be a function.",
      control: false,
      table: { type: { summary: "ReactNode | () => ReactNode" } },
    },
  },
}
