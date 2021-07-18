import React from 'react'
import { Alert, Container, Col, Row } from 'reactstrap'

function AlertBox({ children, variant }) {
  return (
    <Alert color={variant} className='mt-3'>
      {children}
    </Alert>
  )
}

export default AlertBox
