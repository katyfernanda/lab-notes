import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavLinks = () => {
    return (
        <>
<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Anótate con tu nota</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">Inicio de sesión</Nav.Link>
            <Nav.Link href="/register">Registrarse</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    </>
    )
}

export default NavLinks