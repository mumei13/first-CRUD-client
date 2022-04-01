import { React, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd';

import { AuthContext } from '../contexts/AuthContext';
import AlertMessage from '../components/AlertMessage';
import './css/login_register.scss'

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext)

  // Router
  const navigate = useNavigate()

  /* Local State
  *  Define a variable to save form data
  */
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [alert, setAlert] = useState(null)

  const { username, email, password, confirmPassword } = registerForm


  // Function to get data and check with database
  // Get data and save to variable registerForm

  const onChangeRegisterForm = e =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })

  // Check with database

  const onFinish = async e => {
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' })
      setTimeout(() => setAlert(null), 5000)
      return
    }

    try {
      const registerData = await registerUser(registerForm)
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message })
        setTimeout(() => setAlert(null), 5000)
      } else {

        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Noti when fail
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='body'>
      <div className='form-middle'>
        <h1>Register</h1>
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item>
            <AlertMessage info={alert} />
          </Form.Item>
          <Form.Item onChange={onChangeRegisterForm}
            value={username}
            label="Username"
            name="username"
            placeholder='Username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input name="username" />
          </Form.Item>
          <Form.Item onChange={onChangeRegisterForm}
            value={email}
            label="Email"
            name="email"
            placeholder='Your Email'
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}>
            <Input name="email" />
          </Form.Item>
          <Form.Item onChange={onChangeRegisterForm}
            value={password}
            label="Password"
            name="password"
            placeholder='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password name="password" />
          </Form.Item>
          <Form.Item onChange={onChangeRegisterForm}
            value={confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            placeholder='Confirm Password'
            rules={[
              {
                required: true,
                message: 'Please input your password again!',
              },
            ]}>
            <Input.Password name="confirmPassword" />
          </Form.Item>
          <Form.Item>
            <Button variant='success' htmlType='submit'>Register</Button>
          </Form.Item>
          <Form.Item>
            <p>Have account?
              <Link to='../login'>
                <button variant='info' className='btn'>Login</button>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterForm