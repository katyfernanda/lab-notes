import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
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
              onChange={handleChange} placeholder='Mínimo 6 dígitos' />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Form>
        <div className="textError">
          {error && <p>{error}</p>
          }
        </div>
      </Card>
    </>
  )
}
export default Register