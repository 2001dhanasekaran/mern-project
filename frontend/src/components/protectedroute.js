import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Calling session API:", `${process.env.REACT_APP_BACKEND_URL}/api/user/session`);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/session`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const data = response.data;
                    console.log("User session data:", data);
                    if (data?.role) {
                        setUserRole(data.role);
                    } else {
                        setUserRole(null);
                    }
                } else {
                    setUserRole(null);
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
                setUserRole(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <h5>Loading...</h5>;

    if (!userRole) {
        console.log("No session found, redirecting to login page");
        return <Navigate to="/" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        console.log(`User role (${userRole}) does not match required role (${requiredRole}), redirecting`);
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;