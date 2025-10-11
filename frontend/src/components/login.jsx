import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", color: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = { email, password };

        try {
            const response = await axios.post("/api/user/login",
                userCredentials,
                { withCredentials: true }
            );

            setMessage({ text: "Login successful", color: "success" });
            setEmail("");
            setPassword("");
            navigate(response.data.role === "admin" ? "/admin" : "/home");
        } catch (error) {
            console.error("Login Error:", error);
            if (error.response) {
                setMessage({
                    text: `Error: ${error.response.data.message}`,
                    color: "danger",
                });
            } else {
                setMessage({
                    text: "There was an error with login, please try again!",
                    color: "danger",
                });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="mb-3 text-center">Login</h2>
                {message.text && (
                    <div className={`alert alert-${message.color}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="text-start mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="form-label mt-2">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
                </form>
                <Link
                    to="/register"
                    className="text-dark"
                    title="Click to Register"
                >
                    Not Registered
                </Link>
            </div>
        </div>
    );
};

export default Login;