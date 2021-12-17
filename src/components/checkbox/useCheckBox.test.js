import { renderHookWithProviders } from "testUtilities"
import useCheckBox from "./useCheckBox"

it("renders", () => {
  const disabled = false
  const { result } = renderHookWithProviders(() => useCheckBox({ disabled }))
  expect(result.current).not.toBeUndefined()
})
