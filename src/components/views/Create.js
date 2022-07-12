import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { db } from '../../firebaseConfig/firebase'
import { useAuth } from "../../context/authContext"

const Create = () => {
  const { user } = useAuth()
  console.log(user.uid)
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
    uid: user
  }

  const addNote = async (e) => {
    e.preventDefault()
    await addDoc(notesCollection, data)
    navigate('/')
  }
  return (
    <>
      <div>
        <Link to='/notes' className='btn btn-outline-secondary'>Notas</Link>
      </div>
      <Card className="text-center" bg='ligth' >
        <Card.Header>Nueva nota</Card.Header>
        <Form onSubmit={addNote} >
          <Form.Group className="mb-3">
            <Card.Title><Form.Label>Título</Form.Label> </Card.Title>
            <Form.Control type="text" required value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Card.Title><Form.Label>Contenido</Form.Label></Card.Title>
            <Form.Control as="textarea" style={{ height: '100px' }} required value={content}
              onChange={(e) => setContent(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear nota
          </Button>
        </Form>
      </Card>
    </>
  )
}
export default Create