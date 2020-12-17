import { renderHookWithProviders } from "testUtilities"
import useDropElement from "./index"

it("renders", () => {
  const { result } = renderHookWithProviders(useDropElement)
  expect(result.current.parentNode).toBe(document.body)
})
