import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { db } from '../../firebaseConfig/firebase'
import NavBtnBack from "../utils/NavBtnBack"
import FormNote from "../utils/FormNote"

const Create = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const date = new Date()
  const notesCollection = collection(db, 'notes')
  const data = {
    title: title,
    content: content,
    lastEdition: '',
    lastTitle: '',
    day: date.toLocaleDateString(),
    hour: date.toLocaleTimeString(),
    uid: user.uid,
  }

  const addNote = async (e) => {
    e.preventDefault()
    await addDoc(notesCollection, data)
    navigate('/myNotes')
  }
  return (
    <>
      <NavBtnBack path='/myNotes'/>
      <FormNote submitMethod={addNote} title={title} function1={setTitle} function2={setContent} content={content}/>
    </>
  )
}
export default Create