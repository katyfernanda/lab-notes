import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RegisterForm = (props) => {
  return (
    <div className="allForm">
      <Form className='form' onSubmit={props.handleSubmit}>
        <div className="containerText">
          <div className="text">Crea una cuenta</div>
        </div>
        <div className="groupInputs">
          <Form.Control type="text" className="format shadow1" placeholder="email@papitas.com" required name='email'
            onChange={props.handleChange} />
          <Form.Control type='password' className="format shadow1" name='password' required
            onChange={props.handleChange} placeholder='contraseña desde 6 dígitos' />
        </div>
        <Button variant="outline-info" type="submit" id='btnRegister'>
          Registrarse
        </Button>
      </Form>
      <div className="textError">
        {props.error && <p>{props.error}</p>}
      </div>
    </div>
  )
}

export default RegisterForm