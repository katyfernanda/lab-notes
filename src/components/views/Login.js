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
  const { login } = useAuth()
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
      navigate('/notes')
    } catch (error) {
      console.log(error.code)
      ifError(error.code)
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

    </>

  )
}

export default Login