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

  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  const signUp = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredentials.user.uid)
  }

  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials.user.uid)
  }

  const google = async () => {
    const userCredentials = await signInWithPopup(auth, provider)
    console.log(userCredentials.user.uid)
  }

  const logOut = async () => {
    await signOut(auth)
    console.log('Cerró Sesión')
    localStorage.removeItem('currentUser')
  }

  useEffect(() => {
    console.log('aqui useEffect')
    onAuthStateChanged(auth, currentUser => {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    })
  }, [])

  return (
    <authContext.Provider value={{ signUp, login, google, user, logOut, loading }}>
      {children}
    </authContext.Provider>
  )
}


export { AuthProvider, useAuth, authContext}