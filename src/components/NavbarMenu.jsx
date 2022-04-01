import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import React, { useContext } from 'react'

import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import './NavBarMenu.scss'


const NavbarMenu = () => {
    let navigate = useNavigate();
    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => {
        logoutUser()
        navigate('/login')
    }

    return (
        <div id='navbar'>
            <Menu className='Menu Menu-direction-row' selectedKeys={["1"]} mode="horizontal">
                <Menu.Item className='' key='dashboard'>
                    <Link to='dashboard'>To Learn</Link>
                </Menu.Item>
                <Menu.Item className='' key='change-password'>
                    <Link to='change-password'>Change Password</Link>
                </Menu.Item>
                <Menu.Item className='hide-on-mobile welcome-user' key='web-welcome' title>
                    Welcome {username}
                </Menu.Item>
                <Menu.Item key='logout' className='menu-right' onClick={logout} danger icon={<LogoutOutlined />}>
                    Logout
                </Menu.Item>
            </Menu>
        </div >
    )
}

export default NavbarMenu