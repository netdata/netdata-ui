// import React, { useState } from "react"
// import { action } from "@storybook/addon-actions"
// import { text, boolean, select, number } from "@storybook/addon-knobs"
// import { Tabs, Tab } from "."

// const makeOnChange = {
//   no: undefined,
//   yes: action("Tab changed"),
// }

// const TabContentExample = props => <i>all in italics: {props.children}</i>

// const makeTabContentSelect = {
//   TabContentExample,
//   b: "b",
// }

// export const BaseTabs = {
//   component: () => {
//     const hasOnChange = select("Controlled (onChange)", ["no", "yes"], "no")
//     const selectTabContent = select("Tab content wrapper", ["TabContentExample", "b"], "b")
//     const small = boolean("small", false)

//     return (
//       <Tabs
//         onChange={makeOnChange[hasOnChange]}
//         selected={number("Selected tab", 0, { min: 0, max: 3 })}
//         TabContent={makeTabContentSelect[selectTabContent]}
//         noDefaultBorder={boolean("noDefaultBorder", false)}
//       >
//         <Tab
//           label={text("Tab label", "LABEL")}
//           disabled={boolean("Tab is disabled", false)}
//           small={small}
//         >
//           Hello
//         </Tab>
//         <Tab label="Hi again" small={small}>
//           Hello again
//         </Tab>
//         <Tab label="Bye" small={small}>
//           Goodbye
//         </Tab>
//         <Tab label="Goodbye" small={small}>
//           Fairwell
//         </Tab>
//       </Tabs>
//     )
//   },
// }

// export const TabsRouter = {
//   component: () => {
//     const [path, setPath] = useState("/a")
//     const paths = ["/a", "/b", "/c", "/d"]
//     const selected = paths.findIndex(p => p === path)

//     return (
//       <Tabs
//         onChange={index => {
//           setPath(paths[index])
//         }}
//         selected={selected}
//       >
//         <Tab label="hi">Hello</Tab>
//         <Tab disabled label="Hi again">
//           Hello again
//         </Tab>
//         <Tab label="Bye">Goodbye</Tab>
//         <Tab label="Goodbye">Fairwell</Tab>
//       </Tabs>
//     )
//   },
// }

// export default {
//   component: Tabs,
// }
