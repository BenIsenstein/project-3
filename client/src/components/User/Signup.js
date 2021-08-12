import React, { useContext } from "react"
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UserContext from "../../UserContext"
import { Form, Button, Label, Input, PasswordInput, Select } from "../../common"
import { validatePassWithMessage } from "../../functions"
import stringRandomizer from "../../functions/stringRandomizer"

const Signup = () => {
  let history = useHistory()
  const userContext = useContext(UserContext)
  const { register, formState: { errors }, watch, handleSubmit } = useForm({})
  const passwordValue = watch('password')

  const accountInputs = [
    {
      name: "firstName",
      registerOptions: { required: "You must input a first name." },
      labelText: "First Name"
    },
    {
      name: "lastName",
      registerOptions: { required: "You must input a last name." },
      labelText: "Last Name",
    },
    {
      name: "email",
      registerOptions: { required: "You must input an email address." },
    },
    //  {
    //   name: "userType",
    //   registerOptions: { required: "You must input an account type." },
    //   labelText: "You are a",
    // },
    {
      name: 'password',
      registerOptions: {
        required: "You must provide a password.",
        validate: (value) => validatePassWithMessage(value)
      }

    },
    {
      name: 'confirmPassword',
      registerOptions: {}
    }
  ]

  async function onSubmit(data) {
    const alertError = () => alert("There was an error signing you up. We're fixing it as fast as we can.")
    let method = 'post'
    let headers = { "content-type": "application/json" }
    let body
    data.dateSignedUp = new Date()
    delete data.confirmPassword

    try { 
      // attempt to create user document
      body = JSON.stringify(data)
      let userResponse = await fetch("/api/user/signup", { method, headers, body })
      if (userResponse.status === 409) return alert("We already have an account with that email address. Try logging in.")

      // if user document creation fails, return
      let userObject = await userResponse.json()
      if (!userObject.success) return alertError()

      // attempt to create auth document, with the userId from newly created user document
      console.log('fetching to /api/auth/signup')
      let randomString = stringRandomizer(10)
      body = JSON.stringify({ ...data, userId: userObject.userId, confirmCode: randomString, confirmed: false })
      let authResponse = await fetch("/api/auth/signup", { method, headers, body })
      let authObject = await authResponse.json()

      // if auth document creation fails, return
      if (!authObject.success) return alertError()
      else{
        //alert(`Thanks for signing up ${data.firstName}! You'll be logged in now..`)
        // Log the user in
        // console.log('logging in new user')
        // await userContext.logIn({ username: data.email, password: data.password })

        // Send confirmation email to user via SendInBlue
        let action = "/api/sendEmail/user"  // For the GROUP email API Endpoint, replace 'user' with 'group'

        let options = {
          method: 'post',
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            "type": "welcome",  // TYPE is choice of: 'test', 'reminder', 'welcome', 'emailChange', 'overdue'.
            "email": `${data.email}`,
            "userid": `${userObject.userId}`,
            "firstname": `${data.firstName}`,
            "activationcode": `${randomString}`
          })
        }
    
        try {
          let res = await fetch(action, options)
          let resObject = await res.json()
          console.log("Response from server = ", resObject)
          if (!resObject.success) alert("Your call to the sendEmail API failed for some reason. Please try again.")
        }
        catch (err) {
          console.log('error calling sendEmail API: ', err)
          alert("There was an error calling the sendEmail API. We're fixing it as fast as we can.")
        }


        // Send user to the WELCOME page while we await their email confirmation
        history.push("/welcome")

        // Log the user in
        // console.log('logging in new user')
        // await userContext.logIn({ username: data.email, password: data.password })

      }

      
    }
    catch(err) {
      console.log('Error signing up: ', err)
      alert("There was an error signing you up. We're fixing it as fast as we can.")
    }
  }



  function validatePass(password) {
    return (
      /.{6,}$/.test(password) &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[0-9]+/.test(password)
    )
  }

  return (
    <Form authForm onSubmit={handleSubmit(async (data) => await onSubmit(data))}>

      <Label htmlFor="firstName">First Name</Label>
      <Input
        {...register("firstName", { required: "You must enter a first name." })}
        type="text"
        name="firstName"
        id="firstName"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <Label htmlFor="lastName">Last Name</Label>
      <Input
        {...register("lastName", { required: "You must enter a last name." })}
        type="text"
        name="lastName"
        id="lastName"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <Label htmlFor="email">Email</Label>
      <Input
        {...register("email", { 
          required: "You must provide a valid email address." })}
        type="email"
        name="email"
        id="email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <Label hidden htmlFor="userType">I am a(n):</Label>
      <Select
        hidden
        {...register("userType", { required: "You must pick an account type." })}
        name="userType"
        id="userType"
      >
        <option value="homeManager">Home Manager</option>
        {/* <option value="serviceProvider">Service Provider</option>
        <option value="insuranceBroker">Insurance Broker</option> */}
      </Select>
      {errors.userType && <p>{errors.userType.message}</p>}

      <Label htmlFor="password">Password</Label>
      <PasswordInput
        {...register("password", {
          required: "You must provide a password.",
          validate: (value) =>
            validatePass(value) ||
            "The password must contain an uppercase letter, a lowercase letter, a number, and be at least 6 characters long."
        })}
        passwordInput
        type="password"
        name="password"
        id="password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <PasswordInput
        {...register("confirmPassword", {
          required: true,
          validate: (value) => 
            value === passwordValue || 
            "The passwords do not match."
        })}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <Button formSubmit type='submit'>CREATE YOUR ACCOUNT</Button>
    </ Form>
  )
}

export default Signup
