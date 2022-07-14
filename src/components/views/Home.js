import NavLinks from "../utils/Navbar"
import men from '../images/olvido-contrasena.png'
import takeNote from '../images/takeNote.png'
import './Home.css'

const Home = () => {


  return (
    <>
      <NavLinks />
      <section>
        <div className="content">
          <img src={takeNote} alt='logo'/>
            <h3>Anota tu nota!</h3>
            <p >TakeNote es el cuaderno digital para organizar tus pensamientos, descubrimientos e ideas y simplifica tu planeamiento de momentos especiales en tu vida.</p>
        </div>
        <div>
          <img src={men} className= 'men'alt='Hombre Olvidadizo'/>
        </div>
      </section>
    </>
  )
}
export default Home