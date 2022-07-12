import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig/firebase"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const Edit = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  console.log(user.uid)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
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
      title: formTitle,
      content: formContent,
      lastEdition: content,
      lastTitle: title,
      day: date.toLocaleDateString(),
      hour: date.toLocaleTimeString(),
      uid: user.uid,
    }
    await updateDoc(note, data)
    navigate('/myNotes')
  }
  const getNoteById = async (id) => {
    const note = await getDoc(doc(db, 'notes', id))
    if (note.data() !== undefined) {
      const { title, content } = note.data()
      setTitle(title)
      setContent(content)
      setFormContent(content)
      setFormTitle(title)
    } else {
      console.error('no existe esta nota que trataste de meter por el url')
      navigate('/myNotes')
    }
  }
  useEffect(() => {
    getNoteById(id)
  }, [])

  return (
  <div>
      <div>
        <Link to='/myNotes' className='btn btn-outline-secondary'>Notas</Link>
      </div>
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
      </div>
    
  )
}


export default Edit