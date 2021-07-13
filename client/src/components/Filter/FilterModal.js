import { FlexSection, Button } from "../../common"

import ConfirmModal from "../Modals/ConfirmModal"
import useConfirmModal from "../Modals/useConfirmModal"
import CalendarFilter from './CalendarFilter'

const FilterModal = () => {
    const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()

    return (
        <FlexSection justifyEnd>
            <ConfirmModal
                isConfirmModalShowing={isConfirmModalShowing}
                hideConfirmModal={toggleConfirmModal}
                confirmPrompt='Filter'
                modalContent={<CalendarFilter />}
            />
            <Button onClick={toggleConfirmModal}>FILTER</Button>
        </FlexSection>
    )
}

export default FilterModal