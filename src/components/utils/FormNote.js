import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const FormNote = (props) => {
  return (
    <div className="allForm">
      <Form className="formEdit" onSubmit={props.submitMethod} >
        {window.location.pathname === '/create' ?
          <div className="containerText">
            <div className="textTitle">Crear nueva nota</div>
          </div>
          : <div className="containerText">
            <div className="text">Editar</div>
          </div>
        }
        <div className="containerText">
          <div className="text">Título</div>
        </div>
        <Form.Control type="text" className="shadow1" required value={props.title}
          onChange={(e) => {
            props.function1(e.target.value)
          }} />
        <div className="containerText">
          <div className="text">Contenido</div>
        </div>
        <Form.Control name='content' className="shadow1" as="textarea" style={{ height: '100px' }} required value={props.content}
          onChange={(e) => {
            props.funtion2(e.target.value)
          }} />
        {window.location.pathname === '/create' ?
          <Button variant="outline-info" type="submit" id='btnUpdate'>
            Crear
          </Button>
          : <Button variant="outline-info" type="submit" id='btnUpdate'>
            Actualizar
          </Button>
        }
      </Form>
    </div>
  )
}
export default FormNote