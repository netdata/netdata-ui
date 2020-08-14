## Table component

Implementation based on `react-table` lib.

**KNOWN ISSUES**

`Row selection plugin doesn't work well with grouping right now.`
The solution might be to fake materialized sub rows with real ones
from flattened array, or to render groups some other way.

### Props:

```typescript
type FilterFunction<T> = (rows: T[], id: string | string[], filterValue: any) => T[]

type ColumnSort = { id: string; desc: Boolean }

interface TableInstanceState {
  sortBy?: ColumnSort[]
  hiddenColumns?: string[]
  groupBy?: string[]
  columnOrder?: string[]
  globalFilter?: any
}

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
  initialState?: TableInstanceState
  controlledState?: TableInstanceState
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
  globalFilter?: string | FilterFunction<T> // string can refer to one of filterTypes
  // https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
  filterTypes?: { [filterID: string]: FilterFunction<T> }
  dataResultsCallback: (rows: T[]) => void
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
- `dataResultsCallback` - callback with unwrapped results array, excluding group headers

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

Consult the `table.stories.tsx` to get ideas about application-level usage.

## Virtualized table

Made a standalone component, reusing common hooks / code with standard table.
Solution based on `react-window` library.
Implementation was tested only with `block layout`.

### Props

Accepts props just as ordinary table, plus virtialized settings to define relevant
behaviour. `callbackRef` prop won't be used by virtualized table instance, but an `react-window` virtual
list component, so we can find the instance by ref, and use item sizes cach invalidation imperative control,
provided with `.resetAfterIndex`.

```typescript
type GetItemSize = (index: number, orderedRows: any) => number

interface VTableProps<T, RT = any> extends TableProps<T, RT> {
  virtualizedSettings: {
    width: number
    height: number
    itemSize: number | GetItemSize
    variableSize?: boolean
    overscanCount?: number
    verticalGutter?: number
    itemKey?: (index: number, data: any) => string
    rendererHash?: string
    innerRef?: any
    outerRef?: any
    onItemsRendered?: (
      renderData: {
        overscanStartIndex: number
        overscanStopIndex: number
        visibleStartIndex: number
        visibleStopIndex: number
      },
      orderedRows: Row<T>[]
    ) => void
    onScroll?: (scrollData: {
      scrollDirection: "forward" | "backward"
      scrollOffset: number
      scrollUpdateWasRequested: boolean
    }) => void
    useIsScrolling?: boolean
  }
}
```

Virtualized settings are mostly replicating `react-window` underlying components props.
https://react-window.now.sh/#/api/FixedSizeList
https://react-window.now.sh/#/api/VariableSizeList

Exclusions:

- `variableSize` - controls if the table will use `FixedSizeList` or `VariableSizeList`

- `verticalGutter` - controls vertical whitespace between rows, through correction of
  "top" absolute position style and item height, provided by virtual list instance.
  Note - group headers are excluded from this logic and don't have gutters, as well as
  first row next to them - goal here is to allow easier customization of groups.
  Also, `verticalGutter` value should be added to each item calculated height, to maintain
  sizes accurate.

- `itemKey` - works the same way as default `react-window` lists prop with same name, but
  our wrapper always puts `{orderedRows}` inside `data` argument object, which contains
  flattened and ordered array of all rows (including group headers), which could be used
  for generating keys.

- `rendererHash` - hash used as dependency for memoizing virtualized row renderer callback function.
  Could be used to determine, if the function should be re-created to render a changed data, but without
  direct connection to the data object on instance level

- `onItemsRendered` - we add the flattened `orderedRows` to callback args, so the app-level component
  is able to interact with them.

**Note on tradeoffs and usage**

1. Requires numeric width and height of the container. `useMeasure` from `react-use` handles
   this.

2. Requires unwrapping of groups to flat list for rendering, as otherwise groups can't be virtualized.
   `unwrapGroupedRows` from utils is exported to handle this with addition of `isVirtualGroupHeader: true`
   to the row object. Should be memoized based on rows/grouping changes. Right now this operation
   is `made by default` on the component's side, but this could change if we want to merge component
   with original Table.

3. The important detail is that `itemSize` getter function relies on `index` to get the height,
   and in our case we unwrap the grouped rows in the flat list, so the indexes from original data array
   won't help with calculating heights for grouped rows. Right now the solution offered is to use
   a modified `itemSize` getter function, which should rely on index, and collection of unwrapped rows.
   So, when constructing a "map of heights" for list items, don't forget a fallback for `group headers`.
