import React, { Fragment } from "react"
import { Text } from "@/components/typography"
import Section, { Container } from "./section"

const Mouse = () => (
  <Container>
    <Section title="Single tap" topBorder={false}>
      <Text>
        Single Tap on the contents of a chart to show, at its legend, the values for the timestamp
        tapped (the chart will also highlight the point at the chart).
      </Text>
      <Text>
        All the other visible charts will also show and highlight their values for the same
        timestamp.
      </Text>
    </Section>
    <Section title="Drag Chart Contents">
      <Text>Touch and Drag the contents of a chart to pan it horizontally.</Text>
      <Text>
        All the charts will follow soon after you let the chart alone (this little delay is by
        design: it speeds up your browser and lets you focus on what you are exploring).
      </Text>
      <Text>
        Once a chart is panned, auto refreshing stops for all charts. To enable it again, double tap
        a panned chart.
      </Text>
    </Section>
    <Section
      title={
        <Fragment>
          <Text strong>Zoom</Text>
          <Text margin={[0, 0, 0, 1]}>(does not work on firefox and IE/Edge)</Text>
        </Fragment>
      }
    >
      <Text>With two fingers, zoom in or out.</Text>
      <Text>
        Once a chart is zoomed, auto refreshing stops for all charts. To enable it again, double
        click a zoomed chart.
      </Text>
    </Section>
    <Section title="Double Tap">
      Tap on the label or value of a dimension, will select / un-select this dimension.
    </Section>
  </Container>
)

export default Mouse
