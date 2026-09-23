const v8 = require("node:v8")
globalThis.structuredClone ??= value => v8.deserialize(v8.serialize(value))

const { RuleTester } = require("eslint")
const rule = require("./translationSafeText")

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
})

ruleTester.run("translation-safe-text", rule, {
  valid: [
    "<span>{`${title ? '• ' : ''}${name}`}</span>",
    "<span>{title ? 'a' : 'b'}{name}</span>",
    "<span>{cond && <b>x</b>}<span>y</span></span>",
    "<span>{cond && <span>x</span>}<b>y</b></span>",
    "<span>{cond ? 'x' : null}</span>",
    "<span>{cond && <b/>}{other}</span>",
  ],
  invalid: [
    { code: "<span>{title ? '• ' : ''}{name}</span>", errors: [{ messageId: "unsafe" }] },
    { code: "<span>{cond && <b>x</b>}text</span>", errors: [{ messageId: "unsafe" }] },
    { code: "<span>{cond && 'x'}<b>y</b></span>", errors: [{ messageId: "unsafe" }] },
    { code: "<span>{n} item{n > 1 ? 's' : ''}</span>", errors: [{ messageId: "unsafe" }] },
    { code: "<p>{cond && <>on node <b/></>}.</p>", errors: [{ messageId: "unsafe" }] },
    { code: "<p>a <b/> {cond && `x`}</p>", errors: [{ messageId: "unsafe" }] },
  ],
})
