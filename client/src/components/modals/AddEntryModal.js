import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../../UserContext'
import ReactDOM from 'react-dom'
import { Button, Form, Label, Input, Textarea, StyledDateTimePicker } from '../../common'
import { useForm } from "react-hook-form"
//import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'

const AddEntryModal = ({ isShowing, hide, reRenderList }) => {
  // Capture the current state of the logged in user
  let userContext = useContext(UserContext)
  
  // Preload the hidden input field for userid. Also pre-populate HOUSE value for now
  let user_id = "default"
  if (userContext.isLoggedIn) {
    user_id = userContext.user._id
  }

  const preLoadedValues = {
    userid: `${user_id}`,
    house: "1"  // hard code this for now, until Multiple-House functionality is added later
  }

  // const { register, formState: { errors }, handleSubmit, setValue } = useForm({})
  const { register, formState: { errors }, handleSubmit, setValue } = useForm({ defaultValues: preLoadedValues })
  const [date, setDate] = useState()

  // update 'date' input field whenever the piece of state is changed
  useEffect(() => setValue('date', date), [setValue, date])

  const onSubmit = async (data) => {
    let action = "/api/calendarEntry/add"
    let options = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }

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

    reRenderList()
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
          <p>New Event</p>
          <div>
              <Form
                onSubmit={handleSubmit(async (data) => await onSubmit(data))}
              >
                <Label htmlFor="item">Item</Label>
                <Input id="item" {...register("item", {required: "You must indicate an item."})} name="item"/>
                {errors.item && <p>{errors.item.message}</p>}

                <Label htmlFor="task">Task</Label>
                <Textarea 
                  id="task" {...register("task", {required: "You must indicate a task."})} 
                  name="task"
                />
                {errors.task && <p className="">{errors.task.message}</p>}

                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description" {...register("description", {required: "You must write a description."})} 
                  name="description"
                />
                {errors.description && <p>{errors.description.message}</p>}

                <Label htmlFor="date">Date</Label>
                <StyledDateTimePicker
                  id="date"
                  onChange={setDate}
                  value={date}
                />
                <input type='hidden' name='date' {...register('date', {required: "You must choose a date."})} />
                {errors.date && <p>{errors.date.message}</p>}

                {/* <label htmlFor="userid">UserID</label> */}
                <input type="hidden" id="userid" {...register("userid", {required: "You must specify a UserID."})} name="userid"/>
                {errors.userid && <p>{errors.userid.message}</p>}

                {/* <label htmlFor="house">House</label> */}
                <input type="hidden" id="house" {...register("house", {required: "You must specify a house."})} name="house"/>
                {errors.house && <p>{errors.house.message}</p>}

                <Button formSubmit constWidth important type="submit" value="add entry">Save</Button>
                <Button formSubmit constWidth onClick={() => hide()}>Cancel</Button>
              </Form>
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