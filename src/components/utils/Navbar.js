import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css'

const NavLinks = () => {
  return (
    
      <Navbar className='justify-content-end format'>
          <Nav >
            <Nav.Link href="/login"><Button variant="outline-info" id='btnSignIn' >Inicio de sesión</Button></Nav.Link>
            <Nav.Link href="/register"><Button variant="info" id='createAccount'>Registrarse</Button></Nav.Link>
          </Nav>
      </Navbar>
      
  )
}

export default NavLinks