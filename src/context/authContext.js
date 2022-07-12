import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth'
import { auth, provider } from "../firebaseConfig/firebase"


const authContext = createContext()

const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('Aca no hay provider')
  return context
}

const AuthProvider = ({ children }) => {

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const google = async () => {
    await signInWithPopup(auth, provider)
  }

  const logOut = async () => {
    await signOut(auth)
    console.log('Cerró Sesión')
    localStorage.removeItem('currentUser')
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    })
  }, [])

  return (
    <authContext.Provider value={{ signUp, login, google, logOut }}>
      {children}
    </authContext.Provider>
  )
}


export { AuthProvider, useAuth, authContext}