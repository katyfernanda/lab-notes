import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [ title, setTitle] = useState('')
    const [ content, setContent ] = useState('')
    const [ lastEdition, setLastEdition ] = useState('')
    const [ day, setDay ] = useState('')
    const [ hour, setHour ] = useState('')

    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) =>{
        e.preventDefault()
        const note = doc(db, 'notes', id)
        const data = {
            title: title,
            content: content,
            lastEdition: lastEdition,
            day: day,
            hour: hour,
        }
        await updateDoc(note, data)
        navigate('/')
    }
    const getNoteById = async(id) => {
        const note = await getDoc(doc(db, 'notes', id))
        console.log(note.data())
    }
    useEffect( () => {
        getNoteById(id)
    }, [])



    return (
        <div>Edit</div>
    )
}

export default Edit