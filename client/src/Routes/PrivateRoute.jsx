import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useState();
    const location = useLocation();

    if (loading) return <p>Loading ......</p>

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{from : location}} replace={true} ></Navigate>
};

export default PrivateRoute;