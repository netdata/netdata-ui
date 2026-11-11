import { Text } from "@/components/typography"
import Box from "."

export const Positions = () => (
  <Box position="relative" width="500px" height="500px" border={{ size: "1px", side: "all" }}>
    <Box position="absolute" top="5px" right="5px">
      {" "}
      Pinned to the top right with position absolute
    </Box>
    <Box position="fixed" top="5px" right="5px">
      <Box> Pinned to the viewport with position fixed</Box>
    </Box>
  </Box>
)

export const As = () => (
  <Box position="relative" width="500px" height="500px" border={{ size: "1px", side: "all" }}>
    <Box as={Text} position="absolute" left="25px" top="25px">
      system.cpu rendered as Text, with Box layout props
    </Box>
  </Box>
)

export const SX = () => (
  <Box
    sx={{
      width: "500px",
      position: "relative",
      height: "500px",
      border: "1px solid",
    }}
  >
    <Box as={Text} position="absolute" left="25px" top="25px">
      system.cpu rendered as Text, with Box layout props
    </Box>
  </Box>
)

export const Surface = () => (
  <Box column gap={2} width="320px" padding={[4]} background="elementBackground" border round>
    <Text strong>web-prod-03</Text>
    <Text color="textLite">system.cpu 42.7%</Text>
  </Box>
)

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

export default {
  title: "Components/Templates/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A plain block container with theme-aware props for spacing, size, border, radius and colour. Use it when you need a styled wrapper without flex layout; use Flex for rows and stacks.",
      },
    },
  },
  argTypes: {
    padding: prop(
      "Padding in theme units (4px each), CSS shorthand order.",
      "number[]",
      "undefined",
      "object"
    ),
    margin: prop("Margin in theme units, CSS shorthand order.", "number[]", "undefined", "object"),
    gap: prop(
      "Space between children, in theme units. Margin on all but the last child: right by default, bottom with column.",
      "number",
      "undefined",
      "number"
    ),
    width: prop(
      "Width. Number is theme units; an object sets { base, min, max }.",
      "number | string | object",
      "undefined",
      "text"
    ),
    height: prop("Height. Same forms as width.", "number | string | object", "undefined", "text"),
    overflow: prop(
      "Overflow. A string, or { vertical, horizontal }.",
      "string | object",
      "undefined",
      "text"
    ),
    background: prop("Theme colour key.", "string", "undefined", "text"),
    border: prop(
      "true for a 1px border, or { side, size, type, color }.",
      "boolean | string | object",
      "undefined",
      "object"
    ),
    round: prop(
      "Radius. true is 4px, a number is theme units, or { side, size }.",
      "boolean | number | string | object",
      "undefined",
      "object"
    ),
    opacity: prop("Opacity.", "number", "undefined", "number"),
    position: prop("CSS position.", "string", "undefined", "text"),
    top: prop("Offset for positioned boxes.", "string", "undefined", "text"),
    right: prop("Offset for positioned boxes.", "string", "undefined", "text"),
    bottom: prop("Offset for positioned boxes.", "string", "undefined", "text"),
    left: prop("Offset for positioned boxes.", "string", "undefined", "text"),
    zIndex: prop("CSS z-index.", "number", "undefined", "number"),
    cursor: prop("CSS cursor.", "string", "undefined", "text"),
    alignSelf: prop("Cross-axis alignment inside a flex parent.", "string", "undefined", "text"),
    as: prop("Render as another element or component.", "ElementType", '"div"', "text"),
    sx: prop("Styled-system style object for one-off overrides.", "object", "undefined", "object"),
  },
}
