import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Show.css';

const Show = () => {
    //1 - configurar los hooks
     const [notes, setNotes] = useState( [] )

    //2 - referenciamos a la DB firestores
     const notesCollection = collection(db, 'notes')

    //3 - function para mostrar todos los docs
     const getNotes = async () => {
         const querySnapshot = await getDocs(notesCollection) 
         const arrayData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
         setNotes(arrayData)
         console.log(arrayData);
     }

    //4 - function para eliminar un doc

    //5 - usamos useEffect
    useEffect(() => {
         getNotes()
    }, [])

    //6 - se devuelve la vista

    const showData =  () => {
      let conc = '<table class="default">'
      notes.forEach(note => {
        conc += '<tr>'  
        conc += '<td>id:'+note.id +' content:'+note.content+'</td>'
        conc += '</tr>'   
      });
      conc += '</table>' 
      conc += '<button type="button" class="btn btn-primary">Primary</button> ' 

      return conc
    }
  
    return (
        <div>potatoes
          <div dangerouslySetInnerHTML={{ __html: showData() }} />
        </div>
        
    )
}
export default Show