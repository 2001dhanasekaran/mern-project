import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Calling session API:", `${process.env.REACT_APP_BACKEND_URL}/api/user/session`);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/session`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("User session data:",data);
                    setUserRole(data.role);
                } else {
                    setUserRole(null);
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <h5>Loading...</h5>;
    if (requiredRole && userRole !== requiredRole) {
        console.log(`User role (${userRole}) does not match required role (${requiredRole}), redirecting`)
        return <Navigate to="/unauthorized" replace />;
    }

    if (!userRole) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
