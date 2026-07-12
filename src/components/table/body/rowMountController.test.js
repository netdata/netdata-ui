import { createRowMountController } from "./rowMountController"

describe("row mount controller", () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it("mounts three queued rows per interval", () => {
    const controller = createRowMountController()
    const first = jest.fn()
    const second = jest.fn()
    const third = jest.fn()
    const fourth = jest.fn()

    controller.schedule(first)
    controller.schedule(second)
    controller.schedule(third)
    controller.schedule(fourth)

    jest.advanceTimersByTime(23)
    expect(first).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
    expect(third).toHaveBeenCalledTimes(1)
    expect(fourth).not.toHaveBeenCalled()

    jest.advanceTimersByTime(24)
    expect(fourth).toHaveBeenCalledTimes(1)
  })

  it("pauses queued mounts while scrolling", () => {
    const controller = createRowMountController()
    const callback = jest.fn()

    controller.schedule(callback)
    controller.setScrolling(true)
    jest.advanceTimersByTime(1_000)
    expect(callback).not.toHaveBeenCalled()

    controller.setScrolling(false)
    jest.advanceTimersByTime(24)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("cancels its timer and queued mounts when disposed", () => {
    const controller = createRowMountController()
    const callback = jest.fn()

    controller.schedule(callback)
    controller.dispose()
    jest.advanceTimersByTime(1_000)

    expect(callback).not.toHaveBeenCalled()
    expect(jest.getTimerCount()).toBe(0)
  })
})
