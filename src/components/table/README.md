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
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortableBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
  autoResetGroupBy?: boolean
  controlledState?: {
    columnOrder?: string[]
    groupBy?: string[] // For now we allow only single field grouping
    // any other controlled fields for react-table state
  }
  initialState?: {
    sortBy?: [{ id: string; desc: Boolean }]
  }
  renderGroupHead?: ({ row }: { row: any }) => ReactNode
}
```

- `selectedItemClb` - selected item callback. This one used for calling something whenever any row in table is selected
- `columns` - This is where all the layout happens. As example user table `columns` provided below. As basis `react-table` **columns** used here.
- `data` - collection of table rows as js objects. Each first level key of object should reference to `accessor` fild described in columns.
- `sortableBy` - describes which columns could provide sorting API. Values should be referenced to `columns` `accessor`
- any`autoReset...` props are `false` by default, pass `true` if the selection
  and sorting order of rows need to be cleared through the re-renders when `data` prop changes.
- `controlledState` - an object could be passed to override table instance state. Currently used
  for grouping. Should be used only to replace table hooks/defaults, any other custom state should be handled externally.
- `initialState` - object to define table instance initial state, according to its API. For now used
  only for initial sort order
- `renderGroupHead` - custom rendering for row indicating a header group

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

### Typical usage:

May vary. Fun aside, component usage practices are volatile right now.
Consult the `table.stories.tsx` to get ideas about application-level usage.
