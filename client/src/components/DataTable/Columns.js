import { TypeColumnFilter, NumberRangeColumnFilter } from "./TabFilters";

const mediaQuery = window.matchMedia('(min-width: 641px)')
let textFieldWidth = 130
let numberFieldWidth = 80

if (mediaQuery.matches) {
    textFieldWidth = 250
    numberFieldWidth = 150
}

export const columnHeaders = [
    {
        Header: 'Item',
        accessor: 'item',
        Filter: TypeColumnFilter,
        width: textFieldWidth
    },
    {
        Header: 'Task',
        accessor: 'task',
        Filter: TypeColumnFilter,
        disableFilters: true,
        width: textFieldWidth
    },

    {
        Header: 'Frequency (days)',
        accessor: 'frequency',
        Filter: NumberRangeColumnFilter,
        disableFilters: true,
        maxWidth: numberFieldWidth
    },
]

