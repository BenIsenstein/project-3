import React, { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import UserContext from "../../UserContext"
import { Form, Button } from "../../common"

const Signup = () => {
  const userContext = useContext(UserContext)
  const { register, formState: { errors }, watch, handleSubmit } = useForm({})
  const passwordValue = watch('password')

  async function onSubmit(data) {
    const alertError = () => alert("There was an error signing you up. We're fixing it as fast as we can.")

    data.dateCreation = new Date()
    delete data.confirmPassword

    let authUrl = "/api/auth/signup"
    let userUrl = "/api/user/signup"
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }

    try { 
      // attempt to create auth document  
      let authResponse = await fetch(authUrl, fetchOptions)
      let authObject = await authResponse.json()

      // if auth document creation fails, return
      if (!authObject.success) return alertError()

      // attempt to create user document
      let userResponse = await fetch(userUrl, fetchOptions)
      let userObject = await userResponse.json()

      // if user document creation fails, return
      if (!userObject.success) return alertError()

      alert('success with entire signup flow! login is next.')

      // log in
      let { email, password, firstName } = data
      let username = email

      // Log the user in
      //alert(`logging you in now, ${firstName}`)
      await userContext.logIn({ username, password })
      // <Form onSubmit={handleSubmit(async (data) => await userContext.logIn(data))}>
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
    <Form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
      <div className="signup-form">
        <div className="signup-form-content">
          <div className="form-control">
            <label htmlFor="firstName">
              First name
            </label>
            <input
              {...register("firstName", { required: "You must pick a first name." })}
              type="text"
              name="firstName"
              id="firstName"
            />
            {errors.firstName && <p className="signup-form-error-message">{errors.firstName.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="lastName">
              Last name
            </label>
            <input
              {...register("lastName", { required: "You must pick a last name." })}
              type="text"
              name="lastName"
              id="lastName"
            />
            {errors.lastName && <p className="signup-form-error-message">{errors.lastName.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { 
                required: "You must provide an email address." })}
              type="email"
              name="email"
              id="email"
            />
            {errors.email && <p className="signup-form-error-message">{errors.email.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="userType">
              What type of user are you?
            </label>
            <select
              {...register("userType", { required: "You must provide a user type." })}
              name="userType"
              id="userType"
            >
              <option value="homeManager">Home manager</option>
              <option value="serviceProvider">Service provider</option>
              <option value="insuranceBroker">Insurance broker</option>
            </select>
            {errors.userType && <p className="signup-form-error-message">{errors.userType.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="password">
              Password
            </label>
            <input
              {...register("password", {
                required: "You must provide a password.",
                validate: (value) =>
                  validatePass(value) ||
                  "The password must contain an uppercase letter, a lowercase letter, a number, and be at least 6 characters long."
              })}
              type="password"
              name="password"
              id="password"
            />
            {errors.password && <p className="signup-form-error-message">{errors.password.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">
              Confirm password
            </label>
            <div style={{ display: "flex", color: "red" }}>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => 
                    value === passwordValue || 
                    "The passwords do not match"
                })}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
              {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </div>
    </ Form>
  )
}

export default Signup
