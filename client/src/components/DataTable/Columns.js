import { TypeColumnFilter, NumberRangeColumnFilter } from "./TabFilters";

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
        Header: 'Frequency (in days)',
        accessor: 'frequency',
        Filter: NumberRangeColumnFilter,
        disableFilters: true,
        sticky: 'left',
        width: 80
    },
]

