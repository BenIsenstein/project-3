import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FlexSection } from '../../common'

const ConfirmModal = ({ isConfirmModalShowing, hideConfirmModal, message, actionOnConfirm }) => {

  // buttonResponse = false
  if(isConfirmModalShowing) {
    return (
      ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-confirm-overlay"/>
          <div className="modal-confirm-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal-confirm">
              <div className="modal-confirm-header">
                <button type="button" className="modal-confirm-close-button" data-dismiss="modal" aria-label="Close" onClick={hideConfirmModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* <h3>
                Confirm Action
              </h3> */}
              <p>
                {message}
              </p>
              <FlexSection fullWidth justifyCenter>
                <Button fullWidth onClick={() => {
                  hideConfirmModal();
                  actionOnConfirm();
                }}>
                  Delete
                </Button>
                <Button fullWidth important onClick={()=>{
                  hideConfirmModal()
                }}>
                  Cancel
                </Button>
              </FlexSection>
            </div>
          </div>
        </React.Fragment>, document.body
      )
    )
  }
  else {
    return (null)
  }
}

export default ConfirmModal