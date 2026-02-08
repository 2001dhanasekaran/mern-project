import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", color: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if(loading) return;
        e.preventDefault();
        const userCredentials = { email, password };
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
                userCredentials,
                { withCredentials: true }
            );
            const responseData = response.data;
            setMessage({ text: "Login successful", color: "success" });
            setEmail("");
            setPassword("");
            navigate(responseData.role === "admin" ? "/admin" : "/home");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage({ text: `Error: ${error.response.data.message}`, color: "danger" });
            } else {
                setMessage({ text: "There was an error with login, please try again!", color: "danger" });
            }
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="mb-3 text-center">Login</h2>
                {message.text && <div className={`alert alert-${message.color}`}>{message.text}</div>}
                <form onSubmit={handleSubmit} className="text-start mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <label htmlFor="password" className="form-label mt-2">Password</label>
                    <input type="password" className="form-control" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <button type="submit" 
                        className="btn btn-primary w-100 mt-4" 
                        disabled={loading}>{
                            loading ?(
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" 
                                        role="status" aria-hidden="true">
                                    </span>
                                    Logging in...
                                </>    ):(
                                    "Login"                        
                            )
                        }
                    </button>
                </form>
                <Link to='/register'className='text-dark' title="Click to Register">Not Registered</Link>
            </div>
        </div>
    );
};

export default Login;
