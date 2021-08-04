import { useHistory, useParams } from 'react-router-dom'
import { Button, TrashIcon } from '../common'

import ConfirmModal from './Modals/ConfirmModal'
import useConfirmModal from './Modals/useConfirmModal'

const DeactivateHome = ({ home, activatedHomesLength, ...props }) => {
  const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()
  const history = useHistory()

  // activate home
  const activateHome = async () => {    
    try {
      let options = {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({activated: true})
      }
      let res = await fetch(`/api/home/update/${home._id}`, options)
      let resObject = await res.json()
      
      if (!resObject.success) return alert("Your home details wasn't deactivated for some reason. Please try again.")
      history.push('/account')
    }
    catch(err) {
      console.log('error updating calendar entry: ', err)
      alert("There was an error deactivating your home details. We're fixing it as fast as we can.")
    }
  }

  // deactivate home
  const deactivateHome = async () => {    
    try {
      let options = {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({activated: false})
      }
      let res = await fetch(`/api/home/update/${home._id}`, options)
      let resObject = await res.json()
      
      if (!resObject.success) return alert("Your home details wasn't deactivated for some reason. Please try again.")
      history.push('/account')
    }
    catch(err) {
      console.log('error updating calendar entry: ', err)
      alert("There was an error deactivating your home details. We're fixing it as fast as we can.")
    }
  }

  return <>
      {home.activated === true && activatedHomesLength > 1 && <>
          <ConfirmModal
            isConfirmModalShowing={isConfirmModalShowing}
            hideConfirmModal={toggleConfirmModal}
            modalContent="This action removes this home from your calendar. Do you wish to proceed?"
            confirmPrompt='Deactivate'
            actionOnConfirm={deactivateHome}
          />
          <Button 
            icon={props.iconButton} 
            formSubmit={props.formSubmit}
            fullWidth={props.fullWidth}
            fullHeight={props.fullHeight}
            onClick={toggleConfirmModal}
            {...props}
          >
            Deactivate      
          </Button>
      </>}

      {home.activated === false && <>
          <ConfirmModal
            isConfirmModalShowing={isConfirmModalShowing}
            hideConfirmModal={toggleConfirmModal}
            modalContent="This action brings this home back on your calendar. Do you wish to proceed?"
            confirmPrompt='Activate'
            actionOnConfirm={activateHome}
          />
          <Button 
            icon={props.iconButton} 
            formSubmit={props.formSubmit}
            fullWidth={props.fullWidth}
            fullHeight={props.fullHeight}
            onClick={toggleConfirmModal}
            {...props}
          >
            Activate      
          </Button>
      </>}
  </>
}

export default DeactivateHome