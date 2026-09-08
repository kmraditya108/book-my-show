import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

const UserContext = createContext({
    isLoggedIn: false,
    role: null,
    email: null,
    loginUser: () => { },
    resetUserContext: () => { }
});

export const UserContextProvider = (props) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    const loginUser = async (userCredential) => {
        console.log("userCredential >> ", userCredential);

        try {
            const res = await axios.post('http://localhost:8080/login', { ...userCredential });
            console.log("res >> ", res, res?.data?.payload);
            // setUser(res?.data?.payload)
            setToken(res?.data?.payload?.token);
            setIsLoggedIn(true);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const resetUserContext = () => {
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
    }

    useEffect(() => {
        console.log("user >> ", user);
        if (isLoggedIn) {
            (async () => {
                const userData = await axios.get('http://localhost:8080/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(userData?.data?.payload)
                console.log("userData >> ", userData);
            })()
        }
    }, [isLoggedIn]);

    const context = {
        isLoggedIn: isLoggedIn,
        role: user?.role,
        email: user?.email,
        token: token,
        loginUser: loginUser,
        resetUserContext: resetUserContext
    }
    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;