import { useState } from "react"

const Login = () => {

  const [ user, setUser ] = useState({
    email: '',
    password: '',
  })

  return (
    <div>
      <form>
        <input type='email' name='email' id='email'></input>
        <input type='password' name='password' id='password'></input>
      </form>
    </div>
  )
}

export default Login