import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [messageAuth, setMessageAuth] = useState(null)
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        if (token) {
            fetch(`http://localhost:3000/api/users/profile`, {
                headers: {
                    "token": token
                }
            }).then(res => res.json())
                .then(data => {
                    setUser(data)
                })
                .catch(err => {
                    setIsLoggedOut(true)
                })
        }
    }, [token])

    useEffect(() => {
        if (messageAuth) {
          setTimeout(() => {
            setMessageAuth(null);
          }, 3000);
        }
      }, [messageAuth])

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setIsLoggedOut(true);

        setMessageAuth("Sesión cerrada correctamente.");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout, setIsLoggedOut, messageAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}