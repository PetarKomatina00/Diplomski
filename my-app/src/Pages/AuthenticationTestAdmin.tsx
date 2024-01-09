import React from 'react'
import withAdminAuth from '../HOC/withAdminAuth'

function AuthenticationTestAdmin() {
  return (
    <div>Only by admin</div>
  )
}
export default withAdminAuth(AuthenticationTestAdmin)