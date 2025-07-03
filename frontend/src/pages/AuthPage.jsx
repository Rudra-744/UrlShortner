import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useState } from 'react'

const AuthPage = () => {
    const [Login, setLogin] = useState(true);
  return (
    <div>
        {Login ? <LoginForm state={setLogin}/> : <RegisterForm state={setLogin}/>}
      </div>
  ) 
}

export default AuthPage