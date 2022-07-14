import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { useAuth } from "../../context/authContext"
import './Register.css';

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
      <div>
      <Nav.Link href="/"><Button variant="info" id='createAccount'>Volver</Button></Nav.Link>
      </div>
      <div className="allForm">
        <Form className='form' onSubmit={handleSubmit}>
        <div className="containerText">
            <div className="text">Crea una cuenta</div>
          </div>
          <div className="groupInputs">
            <Form.Control type="text" className="format shadow1" placeholder="email@papitas.com" required name='email'
              onChange={handleChange} />

         
            <Form.Control type='password' className="format shadow1" name='password' required
              onChange={handleChange} placeholder='contraseña desde 6 dígitos' />
</div>
          <Button variant="outline-info" type="submit" id='btnRegister'>
            Registrarse
          </Button>
        </Form>
        <div className="textError">
          {error && <p>{error}</p>
          }
        </div>
        </div>

    </>
  )
}
export default Register