import React from 'react'

const FilterContext = React.createContext({
    active: true,
    completed: false
})

export default FilterContext