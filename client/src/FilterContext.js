import React from 'react'

const FilterContext = React.createContext({
    active: true,
    completed: false,
    homes: [
        {id: "610b16cb1417d44f936d5be1", nickname: "homy"},
        {id: "610b16cb1417d44f936d5be0", nickname: "old"}
    ]
})

export default FilterContext