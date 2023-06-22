import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { Spinner } from "@material-tailwind/react";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <div className="h-screen"><Spinner className="h-8 w-8 mx-auto mt-52" /></div>
    }

    if (user) {
        return children;
    }

    // console.log('here');
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>;
};

export default PrivateRoute;