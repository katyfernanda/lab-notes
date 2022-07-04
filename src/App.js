//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';

// se debe importar el router
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path= '/' element={<Show />} />
        <Route path= '/create' element={<Create />} />
        <Route path= '/edit/:id' element={<Edit />} />
      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
