import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { db } from "../../firebaseConfig/firebase"
import './Edit.css'
import NavBtnBack from "../utils/NavBtnBack"

const Edit = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
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
    if (note.data() !== undefined && note.data().uid === user.uid) {
      const { title, content } = note.data()
      setTitle(title)
      setContent(content)
      setFormContent(content)
      setFormTitle(title)
    } else {
      console.error('no existe o no tienes acceso a la nota que trataste ingresar')
      navigate('/myNotes')
    }
  }
  useEffect(() => {
    getNoteById(id)
  }, [])

  return (
    <div>
      <NavBtnBack path='MyNotes'/>
      <div className="allForm">
        <Form className="formEdit" onSubmit={update} >
          <div className="containerText">
            <div className="text">Título</div>
          </div>
          <Form.Control type="text" className="shadow1" required value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value)
            }} />
          <div className="containerText">
            <div className="text">Contenido</div>
          </div>
          <Form.Control name='content' className="shadow1" as="textarea" style={{ height: '100px' }} required value={formContent}
            onChange={(e) => {
              setFormContent(e.target.value)
            }} />
          <Button variant="outline-info" type="submit" id='btnUpdate'>
            Actualizar
          </Button>
        </Form>
      </div>

    </div>

  )
}


export default Edit