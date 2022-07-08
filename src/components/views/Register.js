import { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { auth } from "../../firebaseConfig/firebase"

const Register = () => {
  const [user, setUser] = useState({
    email:'',
    password:'',
  });
  const handleChange = ({target:{name, value}}) => setUser({...user, [name]: value})
  

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
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
            <Form.Control type= 'password' name='password' style={{ height: '100px' }} required
              onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Form>
      </Card>
    </>

  )
}
export default Register