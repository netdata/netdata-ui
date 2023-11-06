import React, { memo, useMemo } from "react"
import Flex from "@/components/templates/flex"
import Select from "@/components/select"
import { TextSmall } from "@/components/typography"

const HeaderGroupBy = ({ grouping, groupByColumns, onGroupBy, tableMeta, dataGa, dataColumns }) => {
  const groupByOptions = useMemo(
    () =>
      groupByColumns
        ? {
            default: { label: "None", value: "" },
            ...Object.keys(groupByColumns).reduce((acc, colId) => {
              const column = dataColumns.find(({ id }) => id === colId)

              return {
                ...acc,
                [colId]: {
                  label: groupByColumns[colId].name || column?.name || column.id,
                  value: colId,
                },
              }
            }, {}),
          }
        : null,
    [groupByColumns]
  )

  if (!groupByOptions) return

  return (
    <Flex
      alignItems="center"
      data-testid="tableGroupBy"
      gap={2}
      flex="grow"
      {...tableMeta.groupByContainerStyles}
    >
      <TextSmall data-testid="tableGroupByLabel" color="textLite" whiteSpace="nowrap">
        Group by
      </TextSmall>
      <Select
        data-ga={`${dataGa}::group-by-filter::table-filter`}
        data-testid="tableGroupByFilter"
        menuPortalTarget={document.body}
        onChange={({ value }) => onGroupBy(value)}
        options={Object.values(groupByOptions)}
        styles={{ size: "tiny", minWidth: 120 }}
        value={groupByOptions[grouping] || groupByOptions.default}
      />
    </Flex>
  )
}

export default memo(HeaderGroupBy)
