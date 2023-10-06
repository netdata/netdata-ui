// import React, { useState } from "react"
// import { text, boolean } from "@storybook/addon-knobs"
// import { Toggle } from "."

// export const Base = {
//   component: () => {
//     const [checked, setChecked] = useState(false)
//     const handleChange = e => {
//       setChecked(e.currentTarget.checked)
//     }
//     return (
//       <Toggle
//         labelRight={text("Label right", "Do you like greek salad?")}
//         disabled={boolean("Disabled", false)}
//         onChange={handleChange}
//         checked={checked}
//         colored={boolean("Colored", true)}
//       />
//     )
//   },
// }

// export const TwoOptions = {
//   component: () => {
//     const [checked, setChecked] = useState(false)
//     const handleChange = e => {
//       setChecked(e.currentTarget.checked)
//     }
//     return (
//       <Toggle
//         labelRight={text("Label right", "Light theme")}
//         labelLeft={text("Label left", "Dark theme")}
//         onChange={handleChange}
//         checked={checked}
//         disabled={boolean("Disabled", false)}
//         colored={boolean("Colored", false)}
//       />
//     )
//   },
// }

// export default {
//   component: Toggle,
// }
