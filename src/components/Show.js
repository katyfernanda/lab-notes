import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Show = () => {
    //1 - configurar los hooks
    const [notes, setNotes] = useState([])

    //2 - referenciamos a la DB firestores
    const notesCollection = collection(db, 'notes')

    //3 - function para mostrar todos los docs
    const getNotes = async () => {
        const data = await getDocs(notesCollection)
        console.log(data)
    }

    //4 - function para eliminar un doc

    //5 - usamos useEffect
    useEffect(() => {
        getNotes()

    }, [])

    //7 - se devuelve la vista


    return (
        <div>Show</div>
    )
}
export default Show