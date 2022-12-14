import React, { useState, useEffect, useRef } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { readmeCleanup } from "utils/readme"
import Flex from "src/components/templates/flex"
import readme from "./README.md"
import Drop from "./index"

const story = storiesOf("Drops/Drop", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

const Simple = props => {
  const ref = useRef()

  const [, setShowDrop] = useState(false)
  useEffect(() => {
    setTimeout(() => setShowDrop(true), 200)
  }, [])

  return (
    <Flex {...props}>
      <Flex ref={ref} background="disabled" padding={[4]}>
        Target
      </Flex>
      {ref.current && (
        <Drop
          target={ref.current}
          align={{ top: "bottom", left: "left" }}
          onEsc={action("onEsc")}
          onClickOutside={action("onClickOutside")}
        >
          <Flex background="border" padding={[6]}>
            Drop Contents
          </Flex>
        </Drop>
      )}
    </Flex>
  )
}

story.add("Simple", Simple, subData)

const positions = [
  { top: "top" },
  { top: "top", right: "left" },
  { top: "top", right: "right" },
  { top: "top", left: "left" },
  { top: "top", left: "right" },
  { top: "bottom" },
  { top: "bottom", right: "left" },
  { top: "bottom", right: "right" },
  { top: "bottom", left: "left" },
  { top: "bottom", left: "right" },
  { bottom: "bottom" },
  { bottom: "bottom", right: "left" },
  { bottom: "bottom", right: "right" },
  { bottom: "bottom", left: "left" },
  { bottom: "bottom", left: "right" },
  { bottom: "top" },
  { bottom: "top", right: "left" },
  { bottom: "top", right: "right" },
  { bottom: "top", left: "left" },
  { bottom: "top", left: "right" },
  { right: "right" },
  { left: "left" },
  {},
]

const DropBox = ({ position }) => {
  const ref = useRef()

  const [, setShowDrop] = useState(false)
  useEffect(() => {
    setShowDrop(true)
  }, [])

  return (
    <Flex margin={[4]}>
      <Flex ref={ref} background="disabled" padding={[1]} width={{ min: 10 }}>
        {Object.keys(position)
          .map(d => `${d[0]}-${position[d][0]}`)
          .join(", ")}
      </Flex>
      {ref.current && (
        <Drop target={ref.current} align={position} stretch={false}>
          <Flex background="border" padding={[1]}></Flex>
        </Drop>
      )}
    </Flex>
  )
}

story.add(
  "Positions",
  () => {
    return (
      <Flex flexWrap>
        {positions.map((position, index) => (
          <DropBox key={index} position={position} />
        ))}
      </Flex>
    )
  },
  subData
)

story.add("Scroll Container", () => {
  return (
    <Flex height="400px" border overflow="auto">
      <Flex height="1000px" width="400px">
        <Simple height="100px" />
      </Flex>
    </Flex>
  )
})

story.add(
  "Stretch",
  () => {
    const Component = ({ label, stretch }) => {
      const ref = useRef()

      const [, setShowDrop] = useState(false)
      useEffect(() => {
        setTimeout(() => setShowDrop(true), 100)
      }, [])

      return (
        <Flex margin={[10]}>
          <Flex ref={ref} background="disabled" padding={[2, 8]}>
            {stretch === false && "No stretch"}
            {stretch === "align" && "align stretch"}
            {stretch === undefined && "width stretch"}
          </Flex>
          {ref.current && (
            <Drop target={ref.current} align={{ top: "bottom", left: "left" }} stretch={stretch}>
              <Flex background="border" padding={[2]}>
                {label}
              </Flex>
            </Drop>
          )}
        </Flex>
      )
    }

    return (
      <Flex flexWrap>
        <Component label="content" />
        <Component label="very very very big content" />
        <Component stretch="align" label="content" />
        <Component stretch="align" label="very very very big content" />
        <Component stretch={false} label="content" />
        <Component stretch={false} label="very very very big content" />
      </Flex>
    )
  },
  subData
)

story.add(
  "Boundaries",
  () => {
    const ref = useRef()

    const [, setShowDrop] = useState(false)
    useEffect(() => {
      setTimeout(() => setShowDrop(true), 200)
    }, [])

    return (
      <Flex>
        <Flex ref={ref} background="disabled" padding={[4]}>
          Target
        </Flex>
        {ref.current && (
          <Drop target={ref.current} align={{ top: "bottom", left: "left" }}>
            <Flex background="border" padding={[6]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s
            </Flex>
          </Drop>
        )}
        {ref.current && (
          <Drop target={ref.current} align={{ bottom: "top", right: "right" }}>
            <Flex background="border" padding={[6]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s
            </Flex>
          </Drop>
        )}
      </Flex>
    )
  },
  subData
)
