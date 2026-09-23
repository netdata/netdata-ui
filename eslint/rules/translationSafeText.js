const isDroppedWhitespace = node =>
  node.type === "JSXText" && /^\s*$/.test(node.value) && node.value.includes("\n")

const isMeaningfulText = node => node.type === "JSXText" && !isDroppedWhitespace(node)

const yields = node => {
  switch (node.type) {
    case "Literal":
      if (typeof node.value === "string") return new Set([node.value === "" ? "empty" : "text"])
      if (typeof node.value === "number") return new Set(["text"])
      if (node.value === null || typeof node.value === "boolean") return new Set(["empty"])
      return new Set(["unknown"])
    case "TemplateLiteral":
      return new Set(["text"])
    case "Identifier":
      return new Set([node.name === "undefined" ? "empty" : "unknown"])
    case "JSXElement":
      return new Set(["element"])
    case "JSXFragment":
      return new Set([node.children.some(isMeaningfulText) ? "text" : "element"])
    case "LogicalExpression":
      if (node.operator === "&&") return new Set([...yields(node.right), "empty"])
      return new Set([...yields(node.left), ...yields(node.right)])
    case "ConditionalExpression":
      return new Set([...yields(node.consequent), ...yields(node.alternate)])
    default:
      return new Set(["unknown"])
  }
}

const describeChild = child => {
  if (child.type === "JSXText") return { conditional: false, yields: new Set(["text"]), certainText: true }
  if (child.type === "JSXExpressionContainer") {
    if (child.expression.type === "JSXEmptyExpression") return null
    const childYields = yields(child.expression)
    return {
      conditional:
        child.expression.type === "LogicalExpression" ||
        child.expression.type === "ConditionalExpression",
      yields: childYields,
      certainText: childYields.has("text") && !childYields.has("unknown"),
    }
  }
  return { conditional: false, yields: new Set(["element"]), certainText: false }
}

const checkChildren = (context, node) => {
  const children = node.children
    .filter(child => !isDroppedWhitespace(child))
    .map(child => ({ child, info: describeChild(child) }))
    .filter(({ info }) => info)

  if (children.length < 2) return

  children.forEach(({ child, info }, index) => {
    if (!info.conditional) return
    const toggles =
      info.yields.has("empty") ||
      (info.yields.has("element") && (info.yields.has("text") || info.yields.has("unknown")))
    if (!toggles) return

    const next = children[index + 1]
    const removesText = info.yields.has("text")
    const insertsBeforeText = !!next && next.info.certainText
    if (removesText || insertsBeforeText) context.report({ node: child, messageId: "unsafe" })
  })
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow conditional text next to other children; it crashes React when the page is translated",
    },
    messages: {
      unsafe:
        "Conditional text next to other children crashes when the page is translated. Merge the pieces into one string, or wrap every text piece in its own element.",
    },
    schema: [],
  },
  create: context => ({
    JSXElement: node => checkChildren(context, node),
    JSXFragment: node => checkChildren(context, node),
  }),
}
