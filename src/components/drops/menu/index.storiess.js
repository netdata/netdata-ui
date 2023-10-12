// import React, { useState } from "react"
// import { action } from "@storybook/addon-actions"
// import { boolean } from "@storybook/addon-knobs"
// import Flex from "@/components/templates/flex"
// import Tooltip from "@/components/drops/tooltip"
// import { Button } from "@/components/button"
// import { Icon } from "@/components/icon"
// import { Text } from "@/components/typography"
// import Menu from "."

// const Simple = props => (
//   <Menu
//     dropTitle={<Text>Fight Club characters</Text>}
//     dropTitlePadding={[2]}
//     label="Character"
//     items={[
//       { value: "narrator", label: "The Narrator", onClick: action("narrator") },
//       { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//       { value: "singer", label: "Marla Singer", onClick: action("singer") },
//     ]}
//     {...props}
//   />
// )

// export const MenuSimple = {
//   component: () => (
//     <Simple
//       onOpen={action("open")}
//       onClose={action("close")}
//       caret={boolean("caret", true)}
//       icon={boolean("icon", false) && <Icon name="add_user" />}
//     />
//   ),
// }

// export const Controlled = {
//   component: () => {
//     const [value, setValue] = useState("durgen")
//     return <Simple onChange={setValue} value={value} label={value} />
//   },
// }

// const ItemButton = ({ item, onItemClick }) => (
//   <Button key={item.value} label={item.label} onClick={onItemClick} />
// )
// export const RenderItem = {
//   component: () => <Simple onOpen={action("open")} onClose={action("close")} Item={ItemButton} />,
// }

// export const RenderDropdown = {
//   component: () => (
//     <Simple
//       Dropdown={({ value, onItemClick, items, Item }) => (
//         <Flex background="mainBackgroundDisabled" padding={[2]}>
//           Characters are: {items.map(({ value }) => value).join(", ")}
//         </Flex>
//       )}
//     />
//   ),
// }

// export const RenderMenuButton = {
//   component: () => (
//     <Simple>
//       <Button label="characters" />
//     </Simple>
//   ),
// }

// export const RenderDropdownFooter = {
//   component: () => (
//     <Simple onOpen={action("open")} onClose={action("close")} Footer={() => <Flex>Footer</Flex>} />
//   ),
// }

// export const Aligns = {
//   component: () => (
//     <Flex gap={4} alignItems="start" column>
//       <Menu
//         border
//         label="Large Dropdown (right)"
//         items={[
//           {
//             value: "narrator",
//             label: "The Narrator character of the movie",
//             onClick: action("narrator"),
//           },
//           { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//           { value: "singer", label: "Marla Singer", onClick: action("singer") },
//         ]}
//         dropProps={{ align: { top: "bottom", right: "right" } }}
//       />
//       <Menu
//         border
//         label="Large Dropdown"
//         items={[
//           {
//             value: "narrator",
//             label: "The Narrator character of the movie",
//             onClick: action("narrator"),
//           },
//           { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//           { value: "singer", label: "Marla Singer", onClick: action("singer") },
//         ]}
//       />
//       <Menu
//         border
//         label="The is a very large label (right)"
//         items={[
//           { value: "narrator", label: "The Narrator", onClick: action("narrator") },
//           { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//           { value: "singer", label: "Marla Singer", onClick: action("singer") },
//         ]}
//         dropProps={{ align: { top: "bottom", right: "right" } }}
//       />
//       <Menu
//         border
//         label="The is a very large label"
//         items={[
//           { value: "narrator", label: "The Narrator", onClick: action("narrator") },
//           { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//           { value: "singer", label: "Marla Singer", onClick: action("singer") },
//         ]}
//       />
//     </Flex>
//   ),
// }

// export const WithTooltip = {
//   component: () => (
//     <Flex gap={4} column>
//       <Tooltip align="top" content="Menu tooltip">
//         <Menu
//           label="Tooltip with menu"
//           items={[
//             { value: "narrator", label: "The Narrator", onClick: action("narrator") },
//             { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//             { value: "singer", label: "Marla Singer", onClick: action("singer") },
//           ]}
//         />
//       </Tooltip>

//       <Menu
//         items={[
//           { value: "narrator", label: "The Narrator", onClick: action("narrator") },
//           { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
//           { value: "singer", label: "Marla Singer", onClick: action("singer") },
//         ]}
//       >
//         <Tooltip align="top" content="Menu tooltip">
//           Menu with tooltip
//         </Tooltip>
//       </Menu>
//     </Flex>
//   ),
// }

// export default {
//   component: Menu,
// }
