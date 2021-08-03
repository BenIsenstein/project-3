import { useHistory, useParams } from 'react-router-dom'
import { Button, TrashIcon } from '../common'

import ConfirmModal from './Modals/ConfirmModal'
import useConfirmModal from './Modals/useConfirmModal'

const DeactivateHome = ({ home, ...props }) => {
  const {isConfirmModalShowing, toggleConfirmModal} = useConfirmModal()
  const history = useHistory()

  // deactivate Home
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
      <ConfirmModal
        isConfirmModalShowing={isConfirmModalShowing}
        hideConfirmModal={toggleConfirmModal}
        modalContent="Do you really wish to deactivate this home?"
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
        { props.iconButton ? <TrashIcon /> : 'Deactivate' }       
      </Button>
  </>
}

export default DeactivateHome