import Routes2 from './router/routes';
import { AuthProvider } from './context/authContext'

function App() {
  return (
    <AuthProvider>
      < Routes2 />
    </AuthProvider>
  );
}

export default App;
