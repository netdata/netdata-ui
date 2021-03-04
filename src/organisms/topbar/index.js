import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { useToggle } from "react-use"
import { H5 } from "src/components/typography"
import { Icon } from "src/components/icon"
import { Button } from "src/components/button"
import Flex from "src/components/templates/flex"
import Layer from "src/components/templates/layer"
import General from "./general"
import Dashboard from "./dashboard"

const Topbar = ({ extended = false, children, mainChild }) => {
  return (
    <Flex justifyContent="between">
      {mainChild}
      <Flex alignItems="center" gap={extended ? 8 : 5}>
        {children}
      </Flex>
    </Flex>
  )
}

export default Topbar
