import React from 'react'
const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const localToken = localStorage.getItem("token")
        if (!localToken) {
            window.location.replace("/login")
            return null;
        }
        return <WrappedComponent {...props} />
    }
}
export default withAuth