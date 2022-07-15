import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/authContext"
import './Login.css'
import BtnGoogleSignIn from "../utils/BtnGoogleSignIn";
import LoginForm from "../utils/LoginForm";
import NavBtnBack from "../utils/NavBtnBack";


const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { login, google } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })
  const ifError = (responseError) => {
    if (responseError === 'auth/invalid-email') {
      setError('Correo inválido')
    } else if (responseError === 'auth/user-not-found') {
      setError('Email no registrado')
    } else {
      setError('Contraseña incorrecta')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/myNotes')
    } catch (error) {
      console.log(error.code)
      ifError(error.code)
    }
  }
  const handleGoogle = async (e) => {
    e.preventDefault()
    try {
      const response = await google()
      console.log(response)
      navigate('/myNotes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBtnBack path='/'/>
      <div className="allForm">
        <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
        <BtnGoogleSignIn handleGoogle={handleGoogle} />
      </div>
    </>
  )
}

export default Login