declare module "*.svg" {
  const content: any
  export default content
}

// tslint:disable:no-namespace
declare namespace jest {
  interface Matchers<R> {
    // @ts-ignore
    toHaveStyleRule: import("node_modules/jest-styled-components/typings/index.d.ts").jest.Matchers["toHaveStyleRule"]
  }
}
