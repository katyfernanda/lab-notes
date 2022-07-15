import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';

const NavBtnBack = (props) => {
  return (
    <div>
      <Nav.Link href={props.path}><Button variant="info" id='createAccount'>Volver</Button></Nav.Link>
    </div>
  )
}

export default NavBtnBack