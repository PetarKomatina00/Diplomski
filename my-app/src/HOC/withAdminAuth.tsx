import React from 'react'
import { jwtDecode } from 'jwt-decode'
const withAdminAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const localToken = localStorage.getItem("token") ?? "";
        if (localToken) {
            const decode: {
                role: string;
            } = jwtDecode(localToken);
            if (decode.role !== "ADMIN") {
                window.location.replace("/accessDenied")
                return null;
            }
        }
        else{
            window.location.replace("/login")
            return null;
        }
        return <WrappedComponent {...props} />
    }
}
export default withAdminAuth