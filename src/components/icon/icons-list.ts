let requiredSvgs

if (require.context) {
  requiredSvgs = require.context("./assets", false, /\.svg$/)
} else {
  const requireContext = require("require-context")
  requiredSvgs = requireContext("../../src/components/icon/assets", false, /\.svg$/)
}

export const iconsList = requiredSvgs.keys().reduce((svgFiles, path) => {
  const iconName = path.slice(2).replace(".svg", "")
  svgFiles[iconName] = requiredSvgs(path).default
  return svgFiles
}, {})
