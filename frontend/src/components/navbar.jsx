import logo from './imgs/logo.jpg';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/session`, {
                    withCredentials: true
                });
                setUserName(response.data.userName);
            } catch (error) {
                console.error("Error fetching user session:", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`, {}, { withCredentials: true });
        window.location.href = '/';
    }

    return (
        <div className="container-fluid mb-2">
            <nav className="navbar bg-light fixed-top shadow">
                <div className='container-fluid d-flex justify-content-between align-items-center'>

                    {/* Logo & Username */}
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Logo" width="80" height="50" className="img-fluid" />
                        {userName && (
                            <span className="ms-3 fw-bold text-dark">
                                Welcome, {userName}
                            </span>
                        )}
                    </div>

                    {/* Search + Icons */}
                    <form className="form-inline my-2 my-lg-0 pe-3">
                        <div className='d-flex align-items-center'>
                            <input
                                className="form-control me-2 d-none d-md-block"
                                type="search"
                                placeholder="Search products..."
                                aria-label="Search"
                            />
                            <button className="btn my-2 my-sm-0" type="submit">
                                <i className="bi bi-search"></i>
                            </button>

                            <div className='d-flex justify-content-center align-items-center'>
                                <Link to='/cart' className="btn text-success" title='Go to Cart'>
                                    <i className="bi bi-cart"></i>
                                </Link>
                                <Link to='/wishList' className="btn">
                                    <i className="bi bi-heart-fill text-danger" title='Go to Wishlist'></i>
                                </Link>
                                <button className="btn btn-outline-danger" title='Logout' onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    );
}
