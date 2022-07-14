import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/authContext"
import './Login.css'


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
      <div >
        <Nav.Link href="/"><Button variant="info" id='back'>Volver</Button></Nav.Link>
      </div>
      <div className="allForm">
        <Form className='form' onSubmit={handleSubmit}>
          <div className="containerText">
            <div className="text">Inicio de sesión</div>
          </div>
          <div className="groupInputs">
            <Form.Control type="text" className="format shadow1" placeholder="email@papitas.com" required name='email'
              onChange={handleChange} />
            <Form.Control type='password' className="format shadow1" placeholder="contraseña" name='password' required
              onChange={handleChange} />
          </div>
          <Button variant="outline-info" id='btnLogin' type="submit">
            Login
          </Button>
        </Form>
        {error && <p >{error}</p>
        }
        <Form onSubmit={handleGoogle}>
          <Button variant="info" id='btnGoogle' type="submit" >
            Ingresa con Google
          </Button>
        </Form>
        {error && <p >{error}</p>
        }
      </div>
    </>
  )
}

export default Login