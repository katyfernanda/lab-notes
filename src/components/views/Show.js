import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Show.css';
import { db } from '../../firebaseConfig/firebase'
import LastEdition from '../utils/LastEdition';
import { useAuth } from '../../context/authContext';
import EstructureNotes from '../utils/EstructureNotes'
import BtnLogOut from '../utils/BtnLogOut';


const Show = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const { logOut } = useAuth()
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  //1 - configurar los hooks
  const [notes, setNotes] = useState([])
  //2 - referenciamos a la DB firestores
  const notesCollection = collection(db, 'notes')
  const notesCollectionOrder = query(notesCollection, orderBy('day', 'desc'), orderBy('hour', 'desc'), where("uid", "==", user.uid))
  //3 - function para mostrar todos los docs
  const getNotes = async () => {
    const querySnapshot = await getDocs(notesCollectionOrder)
    const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setNotes(arrayData)
  }
  //4 - function para eliminar un doc
  const deleteNote = async (id) => {
    const noteDoc = doc(db, 'notes', id);
    await deleteDoc(noteDoc)
    getNotes()
  }
  //5 - usamos useEffect
  useEffect(() => {
    getNotes()
  }, [])

  //6 - se devuelve la vista
  return (
    <div className='containerShow'>
      <BtnLogOut handleLogOut={handleLogOut}/>
      <EstructureNotes notes={notes} LastEdition={LastEdition} deleteNote={deleteNote} />
    </div>
  )
}

export default Show