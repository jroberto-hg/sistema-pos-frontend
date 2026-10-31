import { useState } from 'react'
import { LoginView } from './modules/auth/view/LoginView'
import { DashBoardLayout } from './app/DashboardLayout';

export function App() {
  // Estado para saber si el usuario ha iniciado sesión
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
        return <LoginView onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <DashBoardLayout onLogout={() => setIsAuthenticated(true)} />;
}

export default App;
