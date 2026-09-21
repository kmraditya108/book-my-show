import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

import { getCookies, resetCookies, setCookies } from '../utils/cookies.js'
import useHttps from "../customHooks/useHttps.jsx";
import { fetchProfile, loginUser as loginApi } from "../lib/apis.js";
import useHttp from "../customHooks/useHttp.jsx";

const UserContext = createContext({
    isLoggedIn: false,
    role: null,
    email: null,
    usersList: null,
    login: () => { },
    resetUserContext: () => { },
    getUserLists: () => { }
});

export const UserContextProvider = (props) => {
    const navigate = useNavigate();
    const { isLoading, error, responseData, sendRequest: loginRequestHandler } = useHttps(loginApi);
    const { isLoading: profileIsLoading, error: profileError, data: profileResponseData, sendRequest: profileRequestHandler } = useHttp(fetchProfile, false)

    const [user, setUser] = useState();
    const [usersList, setUsersList] = useState();
    const [token, setToken] = useState();

    const login = async (userCredential) => {
        await loginRequestHandler(userCredential);
    }

    // 1. Case-1: When user undergoes login via login form
    useEffect(() => {
        if (!isLoading && responseData?.payload) {
            localStorage.setItem('token', responseData?.payload?.token);
            setToken(responseData?.payload?.token);
            resetCookies();
            setCookies(`token=${responseData?.payload?.token}`)
            
            profileRequestHandler();
        }
    }, [isLoading, responseData]);

    useEffect(() => {
        if (!isLoading && error) {
            setToken();
            resetCookies();
            // console.log("error >> ", error.message);
        }
    }, [isLoading, error]);

    const resetUserContext = () => {
        setUser(null);
        setToken(null);
        resetCookies();
        localStorage.removeItem('token');
    }

     useEffect(() => {
        if (!profileIsLoading && profileResponseData) {
            
            setUser(profileResponseData?.payload)
            navigate('/');
        }
    }, [profileIsLoading, profileResponseData]);


    // Case-2: When user is already logged-in and revisit to the site.
    useEffect(()=>{
        if(getCookies('token')){
            console.clear();
            profileRequestHandler();
        }
    }, [])


    const getUserLists = async () => {
        // try {
        //     const userListRes = await axios.get('http://localhost:8080/users/all', {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     });
        //     // console.log("userListRes >>> ", userListRes?.data?.payload);
        //     setUsersList(usersList)
        //     setTimeout(() => navigate('/users-list', usersList), 100);

        // } catch (error) {
        //     console.error('Error while fetching users list details : ' + error);
        // }
        navigate('/users-list');
    }

    const context = {
        isLoggedIn: user ? true : false,
        role: user?.role,
        email: user?.email,
        token: token,
        usersList: usersList,
        login: login,
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