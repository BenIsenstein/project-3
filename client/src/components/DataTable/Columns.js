import { TypeColumnFilter, NumberRangeColumnFilter } from "./Filters";

export const columnHeaders = [
    {
        Header: 'Item',
        accessor: 'item',
        Filter: TypeColumnFilter,
        sticky: 'left'
    },
    {
        Header: 'Task',
        accessor: 'task',
        Filter: TypeColumnFilter,
        sticky: 'left'
    },

    {
        Header: 'Frequency',
        accessor: 'frequency',
        Filter: NumberRangeColumnFilter,
        disableFilters: true,
        sticky: 'left',
        width: 80
    },
]

