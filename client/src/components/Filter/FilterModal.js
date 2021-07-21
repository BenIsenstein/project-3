import React, { useState } from 'react'
import { FlexSection, Button, FilterIcon } from "../../common"

import ConfirmModal from "../Modals/ConfirmModal"
import useConfirmModal from "../Modals/useConfirmModal"
import CalendarFilter from './CalendarFilter'

const FilterModal = ({ handleFilterChange }) => {
    const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()

    const [checkedAll, setCheckedAll] = useState(false)
    const [checked, setChecked] = useState({
        active: true,
        completed: false
    })

    return (
        <FlexSection justifyEnd>
            <ConfirmModal
                isConfirmModalShowing={isConfirmModalShowing}
                hideConfirmModal={toggleConfirmModal}
                confirmPrompt='Filter'
                actionOnConfirm={() => handleFilterChange(checked.active, checked.completed, checkedAll)}
                modalContent={<CalendarFilter             
                    checkedAll={checkedAll}
                    setCheckedAll={setCheckedAll}
                    checked={checked}
                    setChecked={setChecked} 
                />}
            />
            <Button onClick={toggleConfirmModal}><FilterIcon />FILTER</Button>
        </FlexSection>
    )
}

export default FilterModal