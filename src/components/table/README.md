## Table component

The implementation based on `react-table` lib and pretty generic at moment.

**CAUTION:** in future this component will most likely be refactored

### Props:

```typescript
interface TableProps<T, RT = any> {
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortedBy?: string[]
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
}
```

- `selectedItemClb` - selected item callback. This one used for calling something whenever any row in table is selected
- `columns` - This is where all the layout happens. As example user table `columns` provided below. As basis `react-table` **columns** used here.
- `data` - collection of table rows as js objects. Each first level key of object should reference to `accessor` fild described in columns.
- `sortedBy` - describes which columns could provide sorting API. Values should be referenced to `columns` `accessor`
- `autoResetSelectedRows`, `autoResetSortBy` - `true` by default, pass `false` if the selection
  and sorting order of rows need to be persisted through the re-renders when `data` prop changes.

This is setup of first **column** with the selection checkbox

```typescript
const columns = [
  {
    id: "selection",
    accessor: "selection",
    Header: ({ getToggleAllRowsSelectedProps }) => {
      const { checked, onChange } = getToggleAllRowsSelectedProps()
      return <Checkbox checked={checked} onChange={onChange} />
    },
    Cell: ({ row }) => {
      const { checked, onChange } = row.getToggleRowSelectedProps()
      return (
        <RowBox>
          <CellBox>
            <Checkbox checked={checked} onChange={onChange} />
          </CellBox>
        </RowBox>
      )
    },
  },
]
```

### Typical usage:

```JSX
export const SimpleTable = () => {
   <Table
    sortedBy={["user"]}
    columns={UserTableSchema}
    data={[
      {
        user: { photo: "https://i.pravatar.cc/30", name: "Fry", mail: "noway@noway.com" },
        dots: "123",
      },
      {
        user: { photo: "https://i.pravatar.cc/31", name: "Amy", mail: "amy@vong.com" },
        dots: "123",
      },
      {
        user: {
          photo: "https://i.pravatar.cc/32",
          name: "dr. Zoidberg",
          mail: "drZ@planetmail.com",
        },
        dots: "123",
      },
    ]}
    selectedItemsClb={items => console.log(items)}
  />
}
```
