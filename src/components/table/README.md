## Table component

The implementation based on `react-table` lib and pretty generic at moment.

**CAUTION:** in future this component will most likely be refactored

**KNOWN ISSUES**

`Row selection plugin doesn't work well with grouping right now.`
The solution might be to fake materialized sub rows with real ones
from flattened array, or to render groups some other way.

### Props:

```typescript
interface TableProps<T, RT = any> {
  groupsOrderSettings?: GroupsOrderSettings
  layoutType?: "table" | "block"
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortableBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
  autoResetGroupBy?: boolean
  autoResetFilters?: boolean
  // initializer for table instance state, according to react-table signature
  initialState?: {
    sortBy?: [{ id: string; desc: boolean }]
  }
  controlledState?: {
    columnOrder?: string[]
    groupBy?: string[] // For now we allow only single field grouping
    // any other controlled fields for react-table state
  }
  renderGroupHead?: (props: {
    row: any
    layoutType: "block" | "table"
    prepareRow: Function
    selectedRowIds: any
    customProps?: Object
  }) => ReactNode
  callbackRef?: (node: any) => void
  groupByFn?: Function
  disableGlobalFilter?: boolean
  globalFilter?: string | FilterFunction // string can refer to one of filterTypes
  // https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
  filterTypes?: { [filterID: string]: FilterFunction }
}
```

- `selectedItemClb` - selected item callback. This one used for calling something whenever any row in table is selected
- `columns` - This is where all the layout happens. As example user table `columns` provided below. As basis `react-table` **columns** used here.
- `data` - collection of table rows as js objects. Each first level key of object should reference to `accessor` fild described in columns.
- `sortableBy` - describes which columns could provide sorting API. Values should be referenced to `columns` `accessor`
- any`autoReset...` props are `false` by default, pass `true` if the selection
  and sorting order of rows need to be cleared through the re-renders when `data` prop changes.
- `controlledState` - an object could be passed to override table instance state. Currently used
  for grouping and filtering. Should be used only to replace table hooks/defaults, any other custom state should be handled externally.
- `initialState` - object to define table instance initial state, according to its API. For now used
  only for initial sort order
- `renderGroupHead` - custom rendering for row indicating a header group, defaults to empty row with group name
- `callbackRef` - callback function should be passed to establish ref to the Table when it's will be rendered
- `groupByFn` - function used to group rows, defaults to one `react-table` is using
- `groupsOrderSettings` - config object to define order of groups by grouping id (refers to column id/accessor),
  default sort order used if the prop not provided. Keep in mind, that provided custom `priority` in the config
  object, should be bigger that `0` to avoid JS falsy value condition.
- `filterTypes` - custom set of filtering functions
- `globalFilter` - custom function for global filtering

This is setup of first **column** with the selection checkbox

### Note on accessors and object values

When row has object value in some column, which we want to render, and also to sort/group by,
there are certain ways to solve that.

- Default (look `mocked-table-schema.tsx`) - through accessor in column props, which is effectievly
  a path to desired value (should be primitive). Grouping and sorting by the id of this column will
  be done `by value, made available by the accessor`. Keep in mind, that rendering of complex cells
  from object should now `rely on row.original` or other means of accessing object data.

- Leaving accessor pointing to object, and providing custom sort/groupBy functions. More tricky,
  and the library doc is somewhat uncertain about various cases.

### Passing custom props to the table

Any additional props passed to the table are available to access from columns schema rendering in runtime
So, if you need to pass a handler for some button inside the cell, feel free to do it.

### Typical usage:

May vary. Fun aside, component usage practices are volatile right now.
Consult the `table.stories.tsx` to get ideas about application-level usage.
