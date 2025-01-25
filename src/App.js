import './App.css';
import Login from './Pages/Login';
import StudentPage from './Pages/StudentPage';
import Navbar from './Components/Navbar';
import { AuthProvider } from './Utils/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

import { BrowserRouter , Route , Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/StudentPage" element={
          <ProtectedRoute> 
            <StudentPage />
          </ProtectedRoute>
        } /> 
      </Routes>

    </AuthProvider>
    </BrowserRouter>   
     
  
  );
}

export default App;
