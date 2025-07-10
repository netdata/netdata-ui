import { isFunction, isArray, isObject, isEmptyObject } from "./assertions"

describe("assertions", () => {
  describe("isFunction", () => {
    it("returns true for functions", () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(function () {})).toBe(true)
      expect(isFunction(async () => {})).toBe(true)
      expect(isFunction(Math.max)).toBe(true)
    })

    it("returns false for non-functions", () => {
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction({})).toBe(false)
      expect(isFunction([])).toBe(false)
      expect(isFunction("string")).toBe(false)
      expect(isFunction(123)).toBe(false)
      expect(isFunction(true)).toBe(false)
    })
  })

  describe("isArray", () => {
    it("returns true for arrays", () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray(new Array())).toBe(true)
      expect(isArray(Array.from("abc"))).toBe(true)
    })

    it("returns false for non-arrays", () => {
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray({})).toBe(false)
      expect(isArray("string")).toBe(false)
      expect(isArray(123)).toBe(false)
      expect(isArray(true)).toBe(false)
      expect(isArray(() => {})).toBe(false)
    })
  })

  describe("isObject", () => {
    it("returns true for objects", () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ key: "value" })).toBe(true)
      expect(isObject(new Date())).toBe(true)
      expect(isObject(new RegExp(""))).toBe(true)
    })

    it("returns true for functions", () => {
      expect(isObject(() => {})).toBe(true)
      expect(isObject(function () {})).toBe(true)
    })

    it("returns false for arrays", () => {
      expect(isObject([])).toBe(false)
      expect(isObject([1, 2, 3])).toBe(false)
    })

    it("returns false for primitives", () => {
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject("string")).toBe(false)
      expect(isObject(123)).toBe(false)
      expect(isObject(true)).toBe(false)
    })
  })

  describe("isEmptyObject", () => {
    it("returns true for empty objects", () => {
      expect(isEmptyObject({})).toBe(true)
      expect(isEmptyObject(new Object())).toBe(true)
    })

    it("returns false for objects with properties", () => {
      expect(isEmptyObject({ key: "value" })).toBe(false)
      expect(isEmptyObject({ length: 0 })).toBe(false)
    })

    it("returns false for non-objects", () => {
      expect(isEmptyObject([])).toBe(false)
      expect(isEmptyObject(null)).toBe(false)
      expect(isEmptyObject(undefined)).toBe(false)
      expect(isEmptyObject("")).toBe(false)
      expect(isEmptyObject(0)).toBe(false)
      expect(isEmptyObject(false)).toBe(false)
    })

    it("returns true for functions with no enumerable properties", () => {
      expect(isEmptyObject(() => {})).toBe(true)
      expect(isEmptyObject(function () {})).toBe(true)
    })

    it("returns false for objects with inherited properties", () => {
      function Constructor() {}
      Constructor.prototype.inherited = "value"
      const instance = new Constructor()

      expect(isEmptyObject(instance)).toBe(true) // only checks own properties
    })

    it("returns false for objects with non-enumerable properties", () => {
      const obj = {}
      Object.defineProperty(obj, "hidden", {
        value: "secret",
        enumerable: false,
      })

      expect(isEmptyObject(obj)).toBe(true) // Object.keys only gets enumerable properties
    })
  })
})
