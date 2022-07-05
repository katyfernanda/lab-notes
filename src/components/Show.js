import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Show.css';

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
  //estructura de nota
  const estructureNotes = () => {
   return notes.map(note => (
      <tr key = {note.id}>
        <td>{note.id}</td>
        <td>{note.content}</td>
        <td>
          <Link to={`/edit/${note.id}`} className='btn btn-light'>Editar</Link>
          <button onClick={() => { deleteNote(note.id)}} className='btn btn-danger'>Eliminar</button>
        </td>
      </tr>
    ))
  }
  //6 - se devuelve la vista
  return (
    <>
      <div>
        <Link to='/create' className='btn btn-outline-secondary'>Create</Link>
      </div>
      {notes.forEach(note => {
        <div>{note.id}</div>
      })
      }
      <table className='table table-dark table-hover'>
        <thead>
          <tr>
            <th>id</th>
            <th>Contenido</th>
            <th>Botones</th>
          </tr>
        </thead>
        <tbody>
          {estructureNotes()}
        </tbody>
      </table>
    </>
  )
}

export default Show