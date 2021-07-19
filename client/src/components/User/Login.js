import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import UserContext from "../../UserContext"
import { Form, Button, Label, Input, PasswordInput } from "../../common"

const Login = () => {
  const userContext = useContext(UserContext)
  const { register, formState: { errors }, handleSubmit } = useForm({})

  return (
      <Form authForm onSubmit={handleSubmit(async (data) => await userContext.logIn(data))}>

              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                name="username" // this is a hack so passportJS recognizes user's email as 'username'.
                id="email"
                {...register("username", {required: "Email is missing."})}
              />
              {errors.username && <p>{errors.username.message}</p>}

              <Label htmlFor="password">Password</Label>
              <PasswordInput 
                type="password" 
                name="password" 
                id="password"
                {...register("password", {required: "Password is missing."})}
              />
              {errors.password && <p>{errors.password.message}</p>}

              <Button formSubmit type='submit'>Log in</Button>
      </Form>
  )
}

export default Login
