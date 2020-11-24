export default ({ truncate }) =>
  truncate &&
  `
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
