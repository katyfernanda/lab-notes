import routes from './router/routes';
import { AuthProvider } from './context/authContext'

function App() {
  return (
    <AuthProvider>
      {routes()}
    </AuthProvider>
  );
}

export default App;
