import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

import {setCookies} from '../utils/cookies.js'

const UserContext = createContext({
    isLoggedIn: false,
    role: null,
    email: null,
    usersList: null,
    loginUser: () => {},
    resetUserContext: () => {},
    getUserLists: () => {}
});

export const UserContextProvider = (props) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [usersList, setUsersList] = useState();
    const [token, setToken] = useState();

    const loginUser = async (userCredential) => {
        console.log("userCredential >> ", userCredential);

        try {
            const res = await axios.post('http://localhost:8080/users/login', { ...userCredential });
            console.log("res >> ", res, res?.data?.payload, '\n  Token >>>>> ', res?.data?.payload?.token);
            // setUser(res?.data?.payload)

            setToken(res?.data?.payload?.token);
            // document.cookie = `token=${res?.data?.payload?.token};`;
            setCookies(`token=${res?.data?.payload?.token}`)
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
                const userData = await axios.get('http://localhost:8080/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(userData?.data?.payload)
                console.log("userData >> ", userData);
            })()
        }
    }, [isLoggedIn]);

    const getUserLists = async() => {
        try {
            const userListRes = await axios.get('http://localhost:8080/users/all', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("userListRes >>> ", userListRes?.data?.payload);
            setUsersList(usersList)
            setTimeout(()=>navigate('/users-list'),100);

        } catch (error) {
            console.error('Error while fetching users list details : '+error);
        }
        
    }

    const context = {
        isLoggedIn: isLoggedIn,
        role: user?.role,
        email: user?.email,
        token: token,
        usersList: usersList,
        loginUser: loginUser,
        resetUserContext: resetUserContext,
        getUserLists: getUserLists,
    }
    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;