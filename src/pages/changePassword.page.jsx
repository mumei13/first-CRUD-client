import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Form, Input, Button } from 'antd';

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constants';
import setAuthToken from "../utils/setAuthToken";
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from '../components/AlertMessage';
import './css/login_register.scss'

const initialState = {
    password: '',
    confirmPassword: ''
}

function ChangePassword() {

    const [alert, setAlert] = useState(null)
    const {
        // authState: {
        //     user: { username }
        // },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => logoutUser()

    const [data, setData] = useState(initialState)

    const { password, confirmPassword } = data

    const handleChangeInput = event => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    let navigate = useNavigate();

    const handleChangePass = async formPw => {
        const token = setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME))
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' })
            setTimeout(() => setAlert(null), 5000)
            return
        } else {
            try {
                const res = await axios.post(`${apiUrl}/auth/change-password`, { password: data.password }, { header: { Authorization: token } })
                if (res.statusText === "OK") {
                    logout()
                    navigate('/login')
                }
                setData({ ...data, success: res.data.message })

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='form-middle'>
            <h1>Change Password</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleChangePass}
                autoComplete="off"
            >
                <Form.Item>
                    <AlertMessage info={alert} />
                </Form.Item>

                <Form.Item
                    onChange={handleChangeInput}
                    value={password}
                    label="Password"
                    name="password"
                    placeholder='Password'
                    rules={[
                        {
                            required: true,
                            message: 'Please fill your password!',
                        },
                    ]}>
                    <Input.Password name="password" />
                </Form.Item>
                <Form.Item
                    onChange={handleChangeInput}
                    value={confirmPassword}
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    rules={[
                        {
                            required: true,
                            message: 'Please fill your password again!',
                        },
                    ]}>
                    <Input.Password name="confirmPassword" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>Change Password</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePassword
