import shadow from "src/components/templates/mixins/shadow"
import borderMixIn from "src/components/templates/mixins/border"

export default ({ _hover, theme }) => {
  let pseudo = ""
  if (_hover) {
    const { boxShadow, border } = _hover
    const shadowProp = boxShadow ? shadow({ boxShadow, theme }) : ""
    const borderProps = border ? borderMixIn({ theme, border }) : ""

    pseudo = `
    &:hover {
        ${shadowProp};
        ${borderProps};
    }`
  }

  return pseudo
}
