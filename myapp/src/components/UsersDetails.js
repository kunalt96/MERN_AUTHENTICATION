import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from 'reactstrap'
import './Login.css'
import axios from 'axios'

function UsersDetails({ isAuthenticated, verificationToken }) {
  const [userData, setUserData] = useState(false)

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/auth')
        setUserData(data)
      } catch (err) {
        console.log('e', err)
      }
    }
    getUserDetails()
  }, [isAuthenticated, verificationToken])

  return (
    <Container>
      <Row className='align-login-form d-flex justify-content-center align-items-center'>
        <Col md={12} lg={6}>
          {userData ? (
            <>
              <Card>
                <CardBody>
                  <CardTitle>User Details</CardTitle>
                  <h3>
                    User Name:{' '}
                    <span className='font-weight-normal'>{userData.name}</span>
                  </h3>
                  <p>User Email: {userData.email}</p>
                </CardBody>
              </Card>
            </>
          ) : (
            <>
              <Spinner type='grow' color='secondary' />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default UsersDetails
