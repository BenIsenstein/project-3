import { FlexSection, Button } from "../../common"

import ConfirmModal from "../Modals/ConfirmModal"
import useConfirmModal from "../Modals/useConfirmModal"
import CalendarFilter from './CalendarFilter'

const FilterModal = ({ checkedAll, setCheckedAll, checked, setChecked}) => {
    const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()

    return (
        <FlexSection justifyEnd>
            <ConfirmModal
                isConfirmModalShowing={isConfirmModalShowing}
                hideConfirmModal={toggleConfirmModal}
                confirmPrompt='Filter'
                actionOnConfirm={() => {}}
                modalContent={<CalendarFilter             
                    checkedAll={checkedAll}
                    setCheckedAll={setCheckedAll}
                    checked={checked}
                    setChecked={setChecked} 
                />}
            />
            <Button onClick={toggleConfirmModal}>FILTER</Button>
        </FlexSection>
    )
}

export default FilterModal