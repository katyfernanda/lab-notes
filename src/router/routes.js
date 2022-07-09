import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../components/views/Home'
import Login from '../components/views/Login'
import Register from '../components/views/Register'
import Show from '../components/views/Show'
import Create from '../components/views/Create'
import Edit from '../components/views/Edit'

const routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/notes' element={<Show/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/edit/:id' element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default routes