const cpx = require("cpx")
const { copyFileSync } = require("fs")

cpx.copy("src/components/icon/assets/*.svg", "lib/components/icon/assets/", {})

copyFileSync("src/mixins/types.d.ts", "lib/mixins/types.d.ts")
copyFileSync("src/components/radio-button/index.d.ts", "lib/components/radio-button/index.d.ts")

copyFileSync(
  "src/components/templates/mixins/index.d.ts",
  "lib/components/templates/mixins/index.d.ts"
)
copyFileSync("src/components/templates/flex/index.d.ts", "lib/components/templates/flex/index.d.ts")
