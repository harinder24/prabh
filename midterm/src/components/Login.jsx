import React from 'react'
import { Header, MainContentUserSignUpLogin } from './UserLoginAndSignup'

export default function Login() {
  return (
    <div>
        <Header btnType="Sign Up" navigateTo="/signup"/>
        <MainContentUserSignUpLogin btnType="Log In"/>
    </div>
  )
}
