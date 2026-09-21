import { useContext } from "react";
import UserContext from "../context/user-context";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
    const {isLoggedIn} = useContext(UserContext);

    if(!isLoggedIn){
        <Navigate to={'/login'} replace/>
    }

    return <Outlet/>;
}

export default ProtectedLayout;