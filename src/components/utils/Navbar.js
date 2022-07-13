import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css'

const NavLinks = () => {
  return (
    <>
      <Navbar >
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/login"><Button className='btnSignIn' variant='ligth'>Inicio de sesión</Button>
            </Nav.Link>
            <Nav.Link href="/register">Registrarse</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavLinks