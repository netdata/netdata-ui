import React from "react"
import { assignRef, mergeRefs } from "./mergeRefs"

describe("mergeRefs", () => {
  describe("assignRef", () => {
    it("handles null refs gracefully", () => {
      expect(() => assignRef(null, "value")).not.toThrow()
      expect(() => assignRef(undefined, "value")).not.toThrow()
    })

    it("calls function refs with value", () => {
      const functionRef = jest.fn()
      const value = "test value"

      assignRef(functionRef, value)

      expect(functionRef).toHaveBeenCalledWith(value)
    })

    it("assigns value to object refs", () => {
      const objectRef = React.createRef()
      const value = "test value"

      assignRef(objectRef, value)

      expect(objectRef.current).toBe(value)
    })

    it("throws error for invalid object refs", () => {
      const invalidRef = { current: null }
      Object.defineProperty(invalidRef, "current", {
        set() {
          throw new Error("Cannot set current")
        },
      })

      expect(() => assignRef(invalidRef, "value")).toThrow(
        "Cannot assign value 'value' to ref '[object Object]'"
      )
    })

    it("handles different value types", () => {
      const functionRef = jest.fn()
      const objectRef = React.createRef()

      const values = [null, undefined, 0, "", false, {}, []]

      values.forEach(value => {
        assignRef(functionRef, value)
        assignRef(objectRef, value)

        expect(functionRef).toHaveBeenCalledWith(value)
        expect(objectRef.current).toBe(value)

        functionRef.mockClear()
      })
    })
  })

  describe("mergeRefs", () => {
    it("returns a function", () => {
      const merged = mergeRefs()
      expect(typeof merged).toBe("function")
    })

    it("calls all provided refs", () => {
      const ref1 = jest.fn()
      const ref2 = jest.fn()
      const ref3 = React.createRef()

      const merged = mergeRefs(ref1, ref2, ref3)
      const value = "test element"

      merged(value)

      expect(ref1).toHaveBeenCalledWith(value)
      expect(ref2).toHaveBeenCalledWith(value)
      expect(ref3.current).toBe(value)
    })

    it("handles empty refs list", () => {
      const merged = mergeRefs()

      expect(() => merged("value")).not.toThrow()
    })

    it("handles null and undefined refs", () => {
      const validRef = jest.fn()
      const merged = mergeRefs(null, validRef, undefined)

      merged("value")

      expect(validRef).toHaveBeenCalledWith("value")
    })

    it("handles mixed ref types", () => {
      const functionRef = jest.fn()
      const objectRef = React.createRef()
      const nullRef = null

      const merged = mergeRefs(functionRef, objectRef, nullRef)
      const element = document.createElement("div")

      merged(element)

      expect(functionRef).toHaveBeenCalledWith(element)
      expect(objectRef.current).toBe(element)
    })

    it("continues executing even if one ref throws", () => {
      const goodRef = jest.fn()
      const badRef = () => {
        throw new Error("Bad ref")
      }
      const anotherGoodRef = jest.fn()

      const merged = mergeRefs(goodRef, badRef, anotherGoodRef)

      expect(() => merged("value")).toThrow("Bad ref")
      expect(goodRef).toHaveBeenCalledWith("value")
    })

    it("works with React component refs", () => {
      const Component = React.forwardRef((props, ref) => {
        return <div ref={ref} />
      })

      const ref1 = React.createRef()
      const ref2 = React.createRef()
      const merged = mergeRefs(ref1, ref2)

      merged("element")

      expect(ref1.current).toBe("element")
      expect(ref2.current).toBe("element")
    })

    it("handles callback refs that update state", () => {
      const setElement1 = jest.fn()
      const setElement2 = jest.fn()

      const merged = mergeRefs(setElement1, setElement2)
      const element = "test element"

      merged(element)

      expect(setElement1).toHaveBeenCalledWith(element)
      expect(setElement2).toHaveBeenCalledWith(element)
    })
  })
})
