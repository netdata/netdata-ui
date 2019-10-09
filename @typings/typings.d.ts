declare module "*.md" {
  const content: string
  export default content
}

declare module "*.json" {
  const content: string
  export default content
}

declare module "!json!*" {
  const value: any
  export default value
}
