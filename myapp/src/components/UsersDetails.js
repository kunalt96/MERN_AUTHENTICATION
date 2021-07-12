import React from 'react'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import './Login.css'

function UsersDetails() {
  return (
    <Container>
      <Row className='align-login-form d-flex justify-content-center align-items-center'>
        <Col md={12} lg={6}>
          <Card>
            <CardBody>
              <CardTitle>User Details</CardTitle>
              <h3>
                User Name:{' '}
                <span className='font-weight-normal'>Kunal Tiwari</span>
              </h3>
              <p>User Email: example@gmail.com</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UsersDetails
