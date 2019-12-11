## Table component

The implementation based on top of `react-table` lib and pretty generic at moment.

**CAUTION:** in future this component will most likely will be refactored

### Props:

```typescript
interface TableProps<T, RT = any> {
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortedBy?: string[]
}
```

- `selectedItemClb` - selected item callback. This one used for calling something whenever any row in table is selected
- `coulmns` - This is where all the layout happens. As example user table `columns` provided below. As basis `react-table` **columns** used here.
- `data` - collection of table rows as js objects. Each first level key of object should reference to `accessor` fild described in colums.
- `sortedBy` - describs which colums could provide sorting API. Values should be referenced to `coulumnss` `accessor`

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
