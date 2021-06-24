import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '../../common'

const AddEntryModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Add New Calendar Entry
        </p>
        <div>
            ...INSERT FORM HERE...
        </div>
        <div>
            <Button>SAVE</Button>
            <Button>Cancel</Button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null

export default AddEntryModal