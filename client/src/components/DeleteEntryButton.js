import React from "react"

export default function DeleteEntryButton ( {entryId} ) {
    function VerifyDelete() {
  //      confirm("Press a button!")
    }

    return ( 
    <div>
        <button 
        className='delete-button'
        type='button'
        onClick={VerifyDelete()}
>
        Delete
        </button>
    </div>
    )
}


