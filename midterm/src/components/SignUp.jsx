import React from 'react'
import { Header, MainContentUserSignUpLogin } from './UserLoginAndSignup'

export default function SignUp() {
  return (
    <div>
        <Header btnType="Login In" navigateTo="/login"/>
        <MainContentUserSignUpLogin btnType="Sign Up"/>
    </div>
  )
}
