import React, { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()
const useAuth = () => useContext(AuthContext);



function AuthContextJSX({ children }) {
    const [loginData, setLoginData] = React.useState({})
    const navigate = useNavigate()

    React.useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }

            fetch("http://localhost:5000/api/v1/auth/isAuthenticate", requestOptions)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    const isLoggedIn = data.success;
                    const user = data.data.user;
                    setLoginData({ isLoggedIn, user })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [])

    function loginContextFunction(data) {
        const isLoggedIn = data.success;
        const user = data.data._id;
        setLoginData({ isLoggedIn, user })
    }

    function logoutContextFunction() {
        localStorage.removeItem("token")
        setLoginData({ "isLoggedIn": false, "user": null })
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ loginData, loginContextFunction, logoutContextFunction }}>
            {children}
        </AuthContext.Provider >
    );
}

export { useAuth, AuthContextJSX };