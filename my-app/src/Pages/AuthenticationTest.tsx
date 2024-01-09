import React from 'react'
import withAuth from '../HOC/withAuth'

function AuthenticationTest() {
  return (
    <div>This can be accessed by anyone.</div>
  )
}

export default withAuth(AuthenticationTest)