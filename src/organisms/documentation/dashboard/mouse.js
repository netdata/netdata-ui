import React, { Fragment } from "react"
import { Text } from "src/components/typography"
import Section, { Container } from "./section"

const Mouse = () => (
  <Container>
    <Section title="Mouse Over / Hover" topBorder={false}>
      <Text>
        Mouse over on a chart to show, at its legend, the values for the timestamp under the mouse
        (the chart will also highlight the point at the chart).
      </Text>
      <Text>
        All the other visible charts will also show and highlight their values for the same
        timestamp.
      </Text>
    </Section>
    <Section title="Drag Chart Contents">
      <Text>
        Drag the contents of a chart, by pressing the left mouse button and moving the mouse,
      </Text>
      <Text>
        All the charts will follow soon after you let the chart alone (this little delay is by
        design: it speeds up your browser and lets you focus on what you are exploring).
      </Text>
      <Text>
        Once a chart is panned, auto refreshing stops for all charts. To enable it again, double
        click a panned chart.
      </Text>
    </Section>
    <Section title="Double Click">
      Double Click a chart to reset all the charts to their default auto-refreshing state.
    </Section>
    <Section title="SHIFT + Drag">
      <Text>
        While pressing the <b>SHIFT</b> key, press the left mouse button on the contents of a chart
        and move the mouse to select an area, to zoom in. The other charts will follow too. Zooming
        is performed in two phases:
      </Text>
      <Text margin={[4, 0, 0]}>
        - The already loaded chart contents are zoomed (low resolution)
      </Text>
      <Text>
        - New data are transferred from the netdata server, to refresh the chart with possibly more
        detail.
      </Text>
      <Text margin={[4, 0, 0]}>
        Once a chart is zoomed, auto refreshing stops for all charts. To enable it again, double
        click a zoomed chart.
      </Text>
    </Section>
    <Section title="Highlight Timeframe">
      <Text>
        While pressing the <b>ALT</b> key, press the left mouse button on the contents of a chart
        and move the mouse to select an area. The selected are will be highlighted on all charts.
      </Text>
    </Section>
    <Section title="SHIFT + Mouse Wheel">
      <Text>
        While pressing the <b>SHIFT</b> key and the mouse pointer is over the contents of a chart,
        scroll the mouse wheel to zoom in or out. This kind of zooming is aligned to center below
        the mouse pointer. The other charts will follow too.
      </Text>
      <Text>
        Once a chart is zoomed, auto refreshing stops for all charts. To enable it again, double
        click a zoomed chart.
      </Text>
    </Section>
    <Section title="Legend Operations">
      <Text>
        Click on the label or value of a dimension, will select / un-select this dimension.
      </Text>
      <Text>
        You can press any of the <b>SHIFT</b> or <b>CONTROL</b> keys and then click on legend labels
        or values, to select / un-select multiple dimensions.
      </Text>
    </Section>
  </Container>
)

export default Mouse
