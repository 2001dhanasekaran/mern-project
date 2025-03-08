import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", color: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
                credentials: "include",
            });

            if (response.ok) {
                const responseData = await response.json();
                setMessage({ text: "Login successful", color: "success" });
                setEmail("");
                setPassword("");
                navigate(responseData.role === "admin" ? "/admin" : "/home");
            } else {
                const errorData = await response.json();
                setMessage({ text: `Error: ${errorData.message}`, color: "danger" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            setMessage({ text: "There was an error with login, please try again!", color: "danger" });
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
                        required
                    />
                    <label htmlFor="password" className="form-label mt-2">Password</label>
                    <input type="password" className="form-control" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
                </form>
                <Link to='/register'className='text-dark' title="Click to Register">Not Registered</Link>
            </div>
        </div>
    );
};

export default Login;
