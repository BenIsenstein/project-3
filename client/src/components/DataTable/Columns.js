import { TypeColumnFilter, NumberRangeColumnFilter } from "./TabFilters";

export const columnHeaders = [
    {
        Header: 'Item',
        accessor: 'item',
        Filter: TypeColumnFilter,
        // width: 120
    },
    {
        Header: 'Task',
        accessor: 'task',
        Filter: TypeColumnFilter,
        disableFilters: true,
        // width: 120
    },

    {
        Header: 'Frequency (days)',
        accessor: 'frequency',
        Filter: NumberRangeColumnFilter,
        disableFilters: true,
        maxWidth: 90
    },
]

