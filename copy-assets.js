const cpx = require("cpx")
const { copyFileSync } = require("fs")

cpx.copy("src/components/icon/assets/**/*.svg", "lib/components/icon/assets/", {})

copyFileSync("src/mixins/types.d.ts", "lib/mixins/types.d.ts")
copyFileSync("src/components/radio-button/index.d.ts", "lib/components/radio-button/index.d.ts")

copyFileSync(
  "src/components/templates/mixins/index.d.ts",
  "lib/components/templates/mixins/index.d.ts"
)
copyFileSync("src/components/templates/box/index.d.ts", "lib/components/templates/box/index.d.ts")
copyFileSync("src/components/templates/flex/index.d.ts", "lib/components/templates/flex/index.d.ts")
copyFileSync(
  "src/components/templates/layer/index.d.ts",
  "lib/components/templates/layer/index.d.ts"
)

copyFileSync("src/components/typography/index.d.ts", "lib/components/typography/index.d.ts")
copyFileSync(
  "src/components/typography/mixins/index.d.ts",
  "lib/components/typography/mixins/index.d.ts"
)

copyFileSync("src/components/button/index.d.ts", "lib/components/button/index.d.ts")
copyFileSync("src/components/drops/mixins/index.d.ts", "lib/components/drops/mixins/index.d.ts")
copyFileSync("src/components/drops/drop/index.d.ts", "lib/components/drops/drop/index.d.ts")
copyFileSync("src/components/drops/menu/index.d.ts", "lib/components/drops/menu/index.d.ts")
copyFileSync("src/components/drops/tooltip/index.d.ts", "lib/components/drops/tooltip/index.d.ts")
copyFileSync("src/components/drops/popover/index.d.ts", "lib/components/drops/popover/index.d.ts")
copyFileSync("src/components/icon/index.d.ts", "lib/components/icon/index.d.ts")
copyFileSync("src/components/input/input.d.ts", "lib/components/input/input.d.ts")
copyFileSync("src/components/pill/index.d.ts", "lib/components/pill/index.d.ts")
copyFileSync("src/components/pill/alertMastercard.d.ts", "lib/components/pill/alertMastercard.d.ts")
copyFileSync("src/components/pill/mastercard.d.ts", "lib/components/pill/mastercard.d.ts")

copyFileSync("src/components/collapsible/index.d.ts", "lib/components/collapsible/index.d.ts")
copyFileSync("src/components/modal/index.d.ts", "lib/components/modal/index.d.ts")

copyFileSync("src/organisms/documentation/index.d.ts", "lib/organisms/documentation/index.d.ts")
copyFileSync("src/theme/index.d.ts", "lib/theme/index.d.ts")
