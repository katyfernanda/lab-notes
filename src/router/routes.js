import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../components/views/Home'
import Login from '../components/views/Login'
import Register from '../components/views/Register'
import Show from '../components/views/Show'
import Create from '../components/views/Create'
import Edit from '../components/views/Edit'
import { useEffect } from 'react'
import ProtectedRoute from '../components/views/ProtectedRoute'

const Routes2 = () => {
  useEffect(()=>{
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/myNotes' element={<ProtectedRoute><Show/></ProtectedRoute>} />
          <Route path='/create' element={<ProtectedRoute><Create/></ProtectedRoute>} />
          <Route path='/edit/:id' element={<ProtectedRoute><Edit/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default Routes2