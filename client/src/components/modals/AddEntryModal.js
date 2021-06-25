import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '../../common'
import { useForm } from "react-hook-form"

const AddEntryModal = ({ isShowing, hide }) => {
  const { register, formState: { errors }, handleSubmit } = useForm({})

  const onSubmit = async (data) => {
    let action = "/api/calendarEntry/add"
    let options = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }

    data.date = new Date().toString()

    try {
      let res = await fetch(action, options)
      let resObject = await res.json()

      hide()
      if (!resObject.success) alert("Your entry wasn't added for some reason. Please try again.")
    }
    catch(err) {
      console.log('error adding calendar entry: ', err)
      alert("There was an error adding your entry. We're fixing it as fast as we can.")
    }

  }

  if (isShowing) {
    return ReactDOM.createPortal(
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
              <form
                onSubmit={handleSubmit(async (data) => await onSubmit(data))}
              >
                <label htmlFor="item">Item</label>
                <input id="item" {...register("item", {required: "You must choose an item."})} name="item"/>
                {errors.item && <p className="">{errors.item.message}</p>}

                <label htmlFor="task">Task</label>
                <input id="task" {...register("task", {required: "You must choose a task."})} name="task"/>
                {errors.task && <p className="">{errors.task.message}</p>}

                <label htmlFor="description">Description</label>
                <input id="description" {...register("description", {required: "You must write a description."})} name="description"/>
                {errors.description && <p className="">{errors.description.message}</p>}

                <label htmlFor="date">Date</label>
                <input id="date" {...register("date", {required: "You must choose a date."})} name="date"/>
                {errors.date && <p className="">{errors.date.message}</p>}

                <input type="submit" value="add entry" />
              </form>
          </div>
          <div>
              <Button important>DONE</Button>
              <Button>Cancel</Button>
          </div>
        </div>
      </div>
    </React.Fragment>, document.body)
  }
  else {
    return null
  }
}

export default AddEntryModal