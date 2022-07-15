import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BtnGoogleSignIn = (props) =>{
    return (
        <Form onSubmit={props.handleGoogle}>
          <Button variant="info" id='btnGoogle' type="submit" >
            Ingresa con Google
          </Button>
        </Form>
    )
}
export default BtnGoogleSignIn