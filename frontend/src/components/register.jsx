import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', color: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const data = { userName, email, password };
        setLoading(true);

        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
                data
            );

            setMessage({ text: "Registration successful!", color: 'success' });
            navigate('/');

        } catch (error) {
            setMessage({
                text: error.response?.data?.message
                    ? `Error: ${error.response.data.message}`
                    : 'There was an error with registration, try again!',
                color: 'danger'
            });
            console.error("Registration Error:", error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="login-box">
                <h2>Registration Page</h2>

                {message.text && (
                    <div className={`alert alert-${message.color}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='text-start'>
                    <div className='mb-3'>
                        <label className='form-label'>User name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={loading}
                            required
                        />

                        <label className='form-label mt-2'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />

                        <label className='form-label mt-2'>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />

                        <button
                            type='submit'
                            className='btn btn-primary w-100 mt-4'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Registering...
                                </>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </div>
                </form>

                <Link to='/' className='text-dark'>
                    Already Registered
                </Link>
            </div>
        </div>
    );
};

export default Register;