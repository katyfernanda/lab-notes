import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import LastEdition from'../utils/LastEdition'; 
import './Show.css';
import CardGroup from 'react-bootstrap/CardGroup';

const Show = () => {
  //1 - configurar los hooks
  const [notes, setNotes] = useState([])
  //2 - referenciamos a la DB firestores
  const notesCollection = collection(db, 'notes')
  const notesCollectionOrder=query(notesCollection, orderBy('day', 'desc'), orderBy('hour', 'desc'))
  //3 - function para mostrar todos los docs
  const getNotes = async () => {
    const querySnapshot = await getDocs(notesCollectionOrder)
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
            {LastEdition(note.lastEdition, note.lastTitle)}
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