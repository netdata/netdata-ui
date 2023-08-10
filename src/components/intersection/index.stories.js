import React from "react"
import Flex from "src/components/templates/flex"
import Intersection from "."

export const Simple = {
  component: () => (
    <Flex height="3000px" column>
      <Intersection fallback="visible outside the viewport" padding={[8, 15]} border>
        Visible inside the viewport. Scroll down and see the inspect element
      </Intersection>
    </Flex>
  ),
}

export default {
  component: Intersection,
}
