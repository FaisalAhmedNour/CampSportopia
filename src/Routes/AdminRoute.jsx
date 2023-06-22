import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { Spinner } from "@material-tailwind/react";

const AdminRoute = ({ children }) => {

    const { loading, isAdmin } = useContext(AuthContext)
    const location = useLocation()
    // console.log(isAdmin, loading)

    if (loading) {
        return <div className="h-screen"><Spinner className="h-8 w-8 mx-auto mt-52" /></div>
    }

    if (isAdmin) {
        return children;
    }

    console.log('here2');

    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>;
};

export default AdminRoute;