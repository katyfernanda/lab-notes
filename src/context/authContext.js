import { createContext, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebaseConfig/firebase"

const authContext = createContext()
 
const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('Aca no hay provider')
    return context
}

const AuthProvider = ({ children }) => {
  
    const signUp = async (email, password) => {
      console.log(email, password)
      await createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password)
    }

    return (
        <authContext.Provider value={{ signUp, login }}>
            {children}
        </authContext.Provider>
    )
}


export { AuthProvider, useAuth, authContext }