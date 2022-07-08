import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Show from '../components/views/Show';
import Create from '../components/views/Create';
import Edit from '../components/views/Edit';

const routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default routes