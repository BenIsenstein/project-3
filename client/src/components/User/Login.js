import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import UserContext from "../../UserContext"
import { Form, Button } from "../../common"

const Login = () => {
  const userContext = useContext(UserContext)
  const { register, formState: { errors }, handleSubmit } = useForm({})

  return (
      <Form onSubmit={handleSubmit(async (data) => await userContext.logIn(data))}>
        <div className="signup-form">
          <div className="signup-form-content">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="username" // this is a hack so passportJS recognizes user's email as 'username'.
                id="email"
                {...register("username", {required: "You must input an email."})}
              />
              {errors.username && <p className="signup-form-error-message">{errors.username.message}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                {...register("password", {required: "You must input a password."})}
              />
              {errors.password && <p className="signup-form-error-message">{errors.password.message}</p>}
            </div>
            <div>
              <Button type='submit'>Log in</Button>
            </div>
          </div>
        </div>
      </Form>
  )
}

export default Login
