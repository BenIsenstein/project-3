import React, { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import "./Signup.css"
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"

const Signup = () => {
  const authContext = useContext(AuthenticationContext)
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm({})
  const passwordValue = watch('password')

  async function onSubmit(data) {
    let fetchUrl = "/api/user/signup"
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }

    try { 
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      // prompt them to logout if they're logged in
      if (resObject.isAlreadyLoggedIn) {
        let willTheyLogOut = window.confirm("You must be logged out to sign up. Logout?")
        if (willTheyLogOut) {await authContext.logOut()}
      }
      else {
        let { username, password } = data
        alert(resObject.message)
        await authContext.logIn({username, password})
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
    <form className="signup-form-container" onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
      <div className="signup-form">
      <div className="signup-form-content">
        <div className="form-control">
          <label htmlFor="username">
            Username
          </label>
          <input
            {...register("username", {
              validate: async (name) => await checkIsNameFree(name) || 'That name is taken.',
              required: "You must pick a username."
            })}
            type="text"
            name="username"
            id="username"
          />
          {errors.username && <p className="signup-form-error-message">{errors.username.message}</p>}
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
          <input className="signupButton" type="submit" value="Submit" />
        </div>
      </div>
    </div>
    </form>
  )

  async function checkIsNameFree(name) {
    let submission = {nameData: name}
    let fetchUrl = "/api/user/check-is-name-free" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(submission)
    }
    
    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()

      return resObject.result
    }
    catch (err) {
      console.error('Error validating name in MongoDBAtlas Cluster!', err)
    }
  }
}

export default Signup
