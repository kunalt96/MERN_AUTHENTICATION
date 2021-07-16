import React, { useState } from 'react'
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

function Register({
  isAuthenticated,
  verificationToken,
  setToken,
  setAuthentication,
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const changeForm = (e) => {
    const target = e.target.value
    const field = e.target.name
    setFormData({ ...formData, [field]: target })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const { data } = await axios.post(
        'http://localhost:4000/register',
        formData
      )
      setToken(data.token)
      setAuthentication(true)
      setAuthToken(data.token)
      localStorage.setItem('x-auth-token', data.token)
    } catch (err) {
      console.log('e', err)
      setFormData({ email: '', password: '', name: '' })
      setToken('')
      setAuthentication(false)
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
              <CardTitle className='text-center'>Register Here</CardTitle>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Input
                    type='text'
                    name='name'
                    id='exampleName'
                    placeholder='Enter Name'
                    onChange={(e) => {
                      changeForm(e)
                    }}
                  />
                </FormGroup>
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
                <Button color='success'>Sign Up</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
