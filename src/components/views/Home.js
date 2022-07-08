import { useAuth } from "../../context/authContext"

const Home = () => {
    const {user} = useAuth()
    console.log(user)
    const {login} = user
    console.log(login)

return (
    <div> home</div>
)
}
export default Home