import React from "react"
import { Button } from "@/components/button"
import {
  H0,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  TextHuge,
  TextBigger,
  TextBig,
  Text,
  TextSmall,
  TextMicro,
  TextNano,
  TextFemto,
  List,
  ListItem,
} from "."

const headers = (
  <div>
    <H0>H0: Title Enourmous. The five boxing wizards jump quickly.</H0>
    <H1>H1: Title Huge. The five boxing wizards jump quickly.</H1>
    <H2>H2: Title Bigger. The five boxing wizards jump quickly.</H2>
    <H3>H3: Title Big. The five boxing wizards jump quickly.</H3>
    <H4>H4: Title Regular. The five boxing wizards jump quickly.</H4>
    <H5>H5: Title Small. The five boxing wizards jump quickly.</H5>
    <H6>H6: Title Big. The five boxing wizards jump quickly.</H6>
  </div>
)

const texts = (
  <div>
    <div>
      <TextHuge>TextHuge: The five boxing wizards jump quickly.</TextHuge>
    </div>
    <div>
      <TextBigger>TextBigger: The five boxing wizards jump quickly.</TextBigger>
    </div>
    <div>
      <TextBig>TextBig: The five boxing wizards jump quickly.</TextBig>
    </div>
    <div>
      <Text>Text: (Regular) The five boxing wizards jump quickly.</Text>
    </div>
    <div>
      <TextSmall>TextSmall: The five boxing wizards jump quickly.</TextSmall>
    </div>
    <div>
      <TextMicro>TextMicro: The five boxing wizards jump quickly.</TextMicro>
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

export const Typography = () => (
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
    <br />
    <br />
    {texts}
    <br />
    <br />
    {controls}
  </div>
)

export const BaseList = () => (
  <List style={{ width: "284px" }}>
    <ListItem>My list item 1</ListItem>
    <ListItem>My list item 2 and my list item 2-2</ListItem>
    <ListItem>My list item 3</ListItem>
    <ListItem>My list item 4</ListItem>
  </List>
)

export default {
  component: Text,
}
