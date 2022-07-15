import { Link } from "react-router-dom"
import CardGroup from 'react-bootstrap/CardGroup';
//estructura de nota
const estructureNotes = (props) => {
  return (
    <CardGroup>{
      props.notes.map(note => (
        <div key={note.id}>
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.content}</p>
              <small className="text-muted">
                Última edición: {note.day}, {note.hour}
              </small>
            </div>
            <div className="card-footer changeFooter" >
              {props.LastEdition(note.lastEdition, note.lastTitle)}
              <div className="footerCard">
                <button onClick={() => { props.deleteNote(note.id) }} className="btn btn-outline-danger " >🗑️</button>
                <Link to={`/edit/${note.id}`} className='btn btn-outline-primary'>✏️</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </CardGroup>
  )
}

export default estructureNotes