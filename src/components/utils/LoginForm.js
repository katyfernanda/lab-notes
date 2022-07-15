import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = (props) => {
  return (
    <>
      <Form className='form' onSubmit={props.handleSubmit}>
        <div className="containerText">
          <div className="text">Inicio de sesión</div>
        </div>
        <div className="groupInputs">
          <Form.Control type="text" className="format shadow1" placeholder="email@papitas.com" required name='email'
            onChange={props.handleChange} />
          <Form.Control type='password' className="format shadow1" placeholder="contraseña" name='password' required
            onChange={props.handleChange} />
        </div>
        <Button variant="outline-info" id='btnLogin' type="submit">
          Login
        </Button>
      </Form>
      {props.error && <p >{props.error}</p>
      }
    </>
  )
}

export default LoginForm