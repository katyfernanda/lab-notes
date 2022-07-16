import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig/firebase"
import './Edit.css'
import NavBtnBack from "../utils/NavBtnBack"
import FormNote from "../utils/FormNote"

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
    <>
      <NavBtnBack path='/myNotes'/>
      <FormNote submitMethod={update} title={formTitle} function1={setFormTitle} function2={setFormContent} content={formContent}/>
    </>
  )
}


export default Edit