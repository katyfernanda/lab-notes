import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const date = new Date()
  const notesCollection = collection(db, 'notes')
  const data = {
    title: title,
    content: content,
    lastEdition: '',
    day: date.toLocaleDateString(),
    hour: date.toLocaleTimeString()
  }

  const addNote = async (e) => {
    e.preventDefault()
    await addDoc(notesCollection, data)
    navigate('/')
  }
  return (
    <>
      <h1>Crear nota</h1>
      <div className="card">
        <form onSubmit={addNote}>
          <div className="card-body">
            <label>Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Contenido</label>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="footerCard">
            <button type='submit' className='btn btn-primary'>Crear nota</button>
          </div>
        </form>
      </div>
    </>


  )
}
export default Create