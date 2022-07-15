import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

const BtnLogOut = (props) => {
  return (
    <div>
      <Nav.Link><Button variant="info" id='btnLogout' onClick={() => props.handleLogOut()}>Cerrar sesión</Button></Nav.Link>
    </div>
  )
}

export default BtnLogOut