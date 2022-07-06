import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap';
import './Show.css';
import CardGroup from 'react-bootstrap/CardGroup';

const Show = () => {
  //1 - configurar los hooks
  const [notes, setNotes] = useState([])
  //2 - referenciamos a la DB firestores
  const notesCollection = collection(db, 'notes')
  //3 - function para mostrar todos los docs
  const getNotes = async () => {
    const querySnapshot = await getDocs(notesCollection)
    const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setNotes(arrayData)
    console.log(arrayData);
  }
  //4 - function para eliminar un doc
  const deleteNote = async (id) => {
    console.log(id)
    const noteDoc = doc(db, 'notes', id);
    await deleteDoc(noteDoc)
    getNotes()
  }
  //5 - usamos useEffect
  useEffect(() => {
    getNotes()
  }, [])
  //estructura condicional
  const estructureLastEdition = (lastEdition, lastTitle) => {
    if ((lastEdition && lastTitle !==undefined)&&(lastEdition.length > 0 || lastTitle.length > 0)) {
      console.log(lastEdition, lastTitle)
      return (<Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <small className="text-muted">
              Contenido anterior
            </small>
          </Accordion.Header>
          <Accordion.Body>
            <small><strong><p>{lastTitle}</p></strong></small>
            <small><p>{lastEdition}</p></small>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      )
    }
  }
  //estructura de nota
  const estructureNotes = () => {
    return notes.map(note => (
      <div key={note.id}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
            <small className="text-muted">
              Última edición: {note.day}, {note.hour}
            </small>
          </div>
          <div className="card-footer" >
            {estructureLastEdition(note.lastEdition, note.lastTitle)}
            <div className="footerCard">
              <div className="btn-group btn-group-sm" role="group" >
                <Link to={`/edit/${note.id}`} className='btn btn-outline-primary'>Editar</Link>
                <button onClick={() => { deleteNote(note.id) }} className="btn btn-danger " >Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }
  //6 - se devuelve la vista
  return (
    <>
      <div>
        <Link to='/create' className='btn btn-outline-secondary'>Create</Link>
      </div>
      <CardGroup>
      {estructureNotes()}
      </CardGroup>
    </>
  )
}

export default Show