import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/authContext"
import './Register.css';
import RegisterForm from "../utils/RegisterForm";
import NavBtnBack from "../utils/NavBtnBack";

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })
  const ifError = (responseError) => {
    return responseError === 'auth/invalid-email' ? setError('Correo inválido') : setError('Constraseña demasiado corta')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(user.email, user.password)
      navigate('/myNotes')
    } catch (error) {
      ifError(error.code)
    }
  }
  return (
    <>
      <NavBtnBack path='/'/>
      <RegisterForm handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
    </>
  )
}
export default Register