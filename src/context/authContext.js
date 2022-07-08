import { createContext, useContext } from "react"

const authContext = createContext()
 
const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('Aca no hay provider')
    return context
}

const AuthProvider = ({ children }) => {
    const user = {
        login: true,
    }
    return (
        <authContext.Provider value={{ user }}>
            {children}
        </authContext.Provider>
    )
}

export { AuthProvider, useAuth }