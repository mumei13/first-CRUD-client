import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoginForm from '../pages/login.page'
import NavbarMenu from '../components/NavbarMenu'
import { AuthContext } from '../contexts/AuthContext'

function ProtectedRoute() {
    const {
        authState: { isAuthenticated }
    } = useContext(AuthContext)

    return (
        (isAuthenticated) ? (
            <>
                <NavbarMenu />
                <Outlet />
            </>
        ) : <LoginForm path='/login' />
    )
}

export default ProtectedRoute