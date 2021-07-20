import React, { useEffect } from 'react'
import { FlexSection } from "../../common"
import FilterItem from './FilterItem'

const CalendarFilter = ({ checkedAll, setCheckedAll, checked, setChecked }) => {
    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
            const newState = {...prevState}
            newState[inputName] = !prevState[inputName]
            return newState
        })
    }

    const selectAll = (value) => {
        setCheckedAll(value)
        setChecked((prevState) => {
            const newState = {...prevState}
            for (const inputName in newState) {
                newState[inputName] = value
            }
            return newState
        })
    }

    useEffect(() => {
        let areNoneChecked = Object.values(checked).every(entry => entry === false)

        if (areNoneChecked) toggleCheck('active')
    }, [checked])

    // useEffect(() => {
    //     let allChecked = true
    //     for (const inputName in checked) {
    //         if (checked[inputName] === false) {
    //             allChecked = false
    //         }
    //     }
    //     if (allChecked) {
    //         setCheckedAll(true)
    //     } else {
    //         setCheckedAll(false)
    //     }
    // }, [checked])
    
    return (
        <FlexSection column alignStart>
            <p>Status:</p>
            <FilterItem item='active' checked={checked['active']} onChange={() => toggleCheck('active')} />
            <FilterItem item='completed' checked={checked['completed']} onChange={() => toggleCheck('completed')} />
            {/* <FilterItem item='all' checked={checkedAll} onChange={(e) => selectAll(e.target.checked)} />       */}
        </FlexSection>
    )
}

export default CalendarFilter