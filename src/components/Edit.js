import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Edit = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [lastEdition, setLastEdition] = useState('')
    const [day, setDay] = useState('')
    const [hour, setHour] = useState('')
    const [formTitle, setFormTitle] = useState('')
    const [formContent, setFormContent] = useState('')
 

    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
      console.log(e)
      const date = new Date()
        e.preventDefault()
        const note = doc(db, 'notes', id)
        const data = {
            title: title,
            content: e.target.elements.content.value,
            lastEdition: content,
            day: date.toLocaleDateString(),
            hour: date.toLocaleTimeString(),
        }
        await updateDoc(note, data)
        navigate('/')
    }
    const getNoteById = async (id) => {
        const note = await getDoc(doc(db, 'notes', id))
        if (note.data() !== undefined) {
            console.log(note.data())
            setTitle(note.data().title)
            setContent(note.data().content)
            setLastEdition(note.data().lastEdition)
            setDay(note.data().day)
            setHour(note.data().hour)
            setFormContent(note.data().content)
            setFormTitle(note.data().title)
        } else {
            console.log('La nota no existe')
        }
    }
    useEffect(() => {
        getNoteById(id)
    }, [])

    return (
        <Card className="text-center" bg='ligth' >
          <Card.Header>Editar nota</Card.Header>
          <Form onSubmit={update} >
            <Form.Group className="mb-3">
              <Card.Title><Form.Label>Título</Form.Label> </Card.Title>
              <Form.Control type="text" required value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value)
                }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Card.Title><Form.Label>Contenido</Form.Label></Card.Title>
              <Form.Control name='content' as="textarea" style={{ height: '100px' }} required value={formContent}
                onChange={(e) => {
                  setFormContent(e.target.value)
                }} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Actualizar
            </Button>
          </Form>
        </Card>
    )
}


export default Edit