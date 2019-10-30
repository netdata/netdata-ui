import React from "react"
import { storiesOf } from "@storybook/react"
import { H3 } from "./H3"
import { H4 } from "./H4"
import { H5 } from "./H5"
import { Text } from "./Text"
import { TextSmall } from "./TextSmall"
import { List, ListItem } from "./List"
import { Button } from "../button"
import { TextFemto } from "./TextFemto"
import { TextNano } from "./TextNano"

const headers = (
  <div>
    <H3>H3: Title Big. The five boxing wizards jump quickly.</H3>
    <H4>H4: Title Regular. The five boxing wizards jump quickly.</H4>
    <H5>H5: Title Small. The five boxing wizards jump quickly.</H5>
  </div>
)

const texts = (
  <div>
    <div>
      <Text>Text: (Regular) The five boxing wizards jump quickly.</Text>
    </div>
    <div>
      <TextSmall>TextSmall: The five boxing wizards jump quickly.</TextSmall>
    </div>
    <div>
      <TextNano>TextNano: The five boxing wizards jump quickly.</TextNano>
    </div>
    <div>
      <TextFemto>TextFemto: The five boxing wizards jump quickly.</TextFemto>
    </div>
  </div>
)

const controls = (
  <>
    <Button label="Button" />
  </>
)

storiesOf("COMPONENTS|Utils", module)
  .add("Typography", () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100vw",
        flexFlow: "column",
        alignItems: "left",
        padding: "20px",
        margin: "20px",
      }}
    >
      {headers}
      <br></br>
      <br></br>
      {texts}
      <br></br>
      <br></br>
      {controls}
    </div>
  ))
  .add("List", () => (
    <List style={{ width: "284px" }}>
      <ListItem>My list item 1</ListItem>
      <ListItem>My list item 2 and my list item 2-2</ListItem>
      <ListItem>My list item 3</ListItem>
      <ListItem>My list item 4</ListItem>
    </List>
  ))
