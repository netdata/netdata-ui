import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Side } from "../refresh/layout"
import { RampNodeTypes, TodayNodeTypes } from "./nodeTypes"
import { InsightTypes as InsightScene } from "./insightTypes"

export default {
  title: "Proposals/Hues",
  parameters: { layout: "padded" },
}

// The preview frame centres stories in a 100vh box, so a tall story scrolls itself to keep "Today" reachable.
const Scroll = styled(Flex).attrs({ column: true, gap: 8, padding: [4] })`
  max-height: 100vh;
  overflow-y: auto;
`

const Options = ({ children }) => <Scroll>{children}</Scroll>

export const NodeTypes = () => (
  <Options>
    <Side
      title="Today"
      note="Parents blue/indigo, Children lilac (= anomalyText), Standalone yellow120 (reads as warning). Parents 1 of 179 floors to 0% and draws no segment."
    >
      <TodayNodeTypes />
    </Side>
    <Side
      title="A"
      note="Three neutral steps (grey100/140/170, mirrored in dark): node type is structure, not status, so no hue; legend text in text. Its greys sit close to Offline/Stale."
    >
      <RampNodeTypes ramp="neutral" swatch="dot" />
    </Side>
    <Side
      title="B"
      note="One blue in three lightnesses (blue90/130/170, mirrored in dark): one category hue, but blue130 is primaryAI, so it reads as AI."
    >
      <RampNodeTypes ramp="blue" swatch="dot" />
    </Side>
    <Side
      title="C"
      note="A's neutral steps with square swatches: round dots stay the status grammar, so the node-type greys no longer read as Offline/Stale."
    >
      <RampNodeTypes ramp="neutral" swatch="square" />
    </Side>
  </Options>
)

export const InsightTypes = () => (
  <Options>
    <Side
      title="Today"
      note="Six hues (insightsPurple/Green/Yellow/Violet/Blue/Red) on titles and labels; icons use their baked *_colored fills. First tile per group shown hovered."
    >
      <InsightScene schemeKey="today" />
    </Side>
    <Side
      title="A"
      note="Neutral labels, every glyph in primaryAI: one AI accent instead of six competing hues."
    >
      <InsightScene schemeKey="A" />
    </Side>
    <Side
      title="B"
      note="Neutral glyphs; only Alert investigation keeps red (error), since it is triggered by an alert."
    >
      <InsightScene schemeKey="B" />
    </Side>
    <Side
      title="C"
      note="Neutral glyphs everywhere; primaryAI appears once per group header (ai sparkle), so a dense panel carries a single accent."
    >
      <InsightScene schemeKey="C" />
    </Side>
  </Options>
)
