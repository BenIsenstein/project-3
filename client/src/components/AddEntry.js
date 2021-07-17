import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../UserContext'
import { Form, Button, Label, Input, Textarea, StyledDateTimePicker, FlexSection } from '../common'
import { useForm } from "react-hook-form"
import FormTemplate from './FormTemplate/FormTemplate'

const AddEntry = () => {
  const history = useHistory()

  const onSubmit = async (data) => {
    data.house = "House placeholder"
    data.completed = false

    try {
      let action = "/api/calendarEntry/add"
      let options = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }
      let res = await fetch(action, options)
      let resObject = await res.json()

      if (!resObject.success) alert("Your entry wasn't added for some reason. Please try again.")
    }
    catch (err) {
      console.log('error adding calendar entry: ', err)
      alert("There was an error adding your entry. We're fixing it as fast as we can.")
    }

    history.push(`/calendar`)
  }

  const inputs = [
    {
      name: "item",
      registerOptions: { required: "You must choose an item." },
      labelText: "",
      maxLength: '50'
    },
    {
      name: "task",
      registerOptions: { required: "You must choose a task." },
      labelText: "",
      maxLength: '50'
    },
    {
      name: "description",
      registerOptions: { required: "You must write a description." },
      labelText: "",
      as: Textarea
    },
    {
      name: "date",
      registerOptions: { required: "You must choose a date." },
      labelText: ""
    }
  ]

  return <FormTemplate 
    titleText="New Task" 
    inputs={inputs} 
    addModeCancel={history.goBack} 
    onSubmit={onSubmit} 
  />
}

// // Capture the current state of the logged in user
  // let userContext = useContext(UserContext)

  // // Preload the hidden input field for userid. Also pre-populate HOUSE value for now
  // let user_id = "default"
  // if (userContext.user !== undefined) {
  //   user_id = userContext.user._id
  // }

  // const preLoadedValues = {
  //   userid: `${user_id}`,
  //   house: "1"  // hard code this for now, until Multiple-House functionality is added later
  // }

  // // const { register, formState: { errors }, handleSubmit, setValue } = useForm({})
  // const { register, formState: { errors }, handleSubmit, setValue } = useForm({ defaultValues: preLoadedValues })
  // const [date, setDate] = useState()

  // // update 'date' input field whenever the piece of state is changed
  // useEffect(() => setValue('date', date), [setValue, date])

  // return (
  //   <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
  //     <Label htmlFor="item">Item</Label>
  //     <Input
  //       maxLength='50'
  //       id="item" {...register("item", { required: "You must choose an item." })} 
  //       name="item" />
  //     {errors.item && <p className="">{errors.item.message}</p>}

  //     <Label htmlFor="task">Task</Label>
  //     <Input
  //       maxLength='50'
  //       id="task" {...register("task", { required: "You must choose a task." })}
  //       name="task" />
  //     {errors.task && <p className="">{errors.task.message}</p>}

  //     <Label htmlFor="description">Description</Label>
  //     <Textarea
  //       id="description" {...register("description", {required: "You must write a description." })} 
  //       name="description" />
  //     {errors.description && <p className="">{errors.description.message}</p>}

  //     <Label htmlFor="date">Date</Label>
  //     <StyledDateTimePicker
  //       id="date"
  //       onChange={setDate}
  //       value={date}
  //     />
  //     <Input type='hidden' name='date' {...register('date', { required: "You must choose a date." })} />
  //     {errors.date && <p className="">{errors.date.message}</p>}

  //     {/* <Label htmlFor="userid">UserID</Label> */}
  //     <Input type="hidden" id="userid" {...register("userid", { required: "You must specify a UserID." })} name="userid" />
  //     {errors.userid && <p className="">{errors.userid.message}</p>}

  //     {/* <Label htmlFor="house">House</Label> */}
  //     <Input type="hidden" id="house" {...register("house", { required: "You must specify a house." })} name="house" />
  //     {errors.house && <p className="">{errors.house.message}</p>}

  //     <FlexSection fullWidth marginTop1em>
  //       <Button fullWidth important type="submit" value="add entry">Save</Button>
  //       <Button fullWidth onClick={() => history.goBack()}>Cancel</Button>        
  //     </FlexSection>

  //   </Form>
  // )
export default AddEntry