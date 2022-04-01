import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './pages/login.page';
import RegisterForm from './pages/register.page';
import Dashboard from './pages/Dashboard.page';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './protected/protectedRoute';
import { Navigate } from 'react-router-dom';


import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import ChangePassword from './pages/changePassword.page';
import PostContextProvider from './contexts/PostsContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to='/login' />} />
            <Route element={<ProtectedRoute />} >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </Router>
  )
}
export default App;