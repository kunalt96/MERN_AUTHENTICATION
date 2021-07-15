import React, { useState, useEffect } from 'react'
import {
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Card,
  FormGroup,
  Form,
  Button,
  Input,
} from 'reactstrap'
import './Login.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import setAuthToken from '../setAuthToken'

function Login({
  isAuthenticated,
  setAuthentication,
  authenticate,
  verificationToken,
  setToken,
}) {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const changeForm = (e) => {
    const target = e.target.value
    const field = e.target.name
    console.log('in here')
    setFormData({ ...formData, [field]: target })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const { data } = await axios.post('http://localhost:4000/login', formData)
      if (data) {
        console.log(data)
        setAuthentication(true)
        setToken(data.token)
        setAuthToken(data.token)
        localStorage.setItem('x-auth-token', data.token)
      }
    } catch (e) {
      setAuthentication(false)
      console.log('e', e)
    }
  }
  if (isAuthenticated == true && verificationToken.length > 0) {
    return <Redirect to='/users' />
  }

  return (
    <Container>
      <Row className='align-login-form d-flex justify-content-center align-items-center'>
        <Col md={12} lg={4}>
          <Card>
            <CardBody>
              <CardTitle className='text-center'>Login Form</CardTitle>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Input
                    type='email'
                    name='email'
                    id='exampleEmail'
                    placeholder='Enter Email'
                    onChange={(e) => {
                      changeForm(e)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type='password'
                    name='password'
                    id='examplePassword'
                    placeholder='Enter Password'
                    onChange={(e) => {
                      changeForm(e)
                    }}
                  />
                </FormGroup>
                <Button color='primary'>Login</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
