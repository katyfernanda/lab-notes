import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/authContext"


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
    }else if(responseError === 'auth/user-not-found'){
      setError('Email no registrado')
    }else {
      setError('Contraseña incorrecta')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await login(user.email, user.password)
      console.log(response)
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
      <div>
        <Link to='/' className='btn btn-outline-secondary'>Home</Link>
      </div>
      <Card className="text-center" bg='ligth' >
        <Card.Header>Crea tu cuenta</Card.Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Card.Title><Form.Label>Email</Form.Label></Card.Title>
            <Form.Control type="text" required name='email'
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Card.Title><Form.Label>Contraseña</Form.Label></Card.Title>
            <Form.Control type='password' name='password' required
              onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        {error && <p >{error}</p>
        }
      </Card>
      <Card className="text-center" bg='ligth' >
        <Card.Header>Ingresa con Google</Card.Header>
        <Form onSubmit={handleGoogle}>
          <Button variant="primary" type="submit">
            GOOGLE
          </Button>
        </Form>
        {error && <p >{error}</p>
        }
      </Card>
    </>
  )
}

export default Login