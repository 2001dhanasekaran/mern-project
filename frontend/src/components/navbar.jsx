import logo from './imgs/logo.jpg';
import { Link } from "react-router-dom";

export default function Navbar() {
    const handleLogout = async () => {
        await fetch(`${process.env.BACKEND_URL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/';
    }

    return (
        <div className="container-fluid mb-2">
            <nav className="navbar bg-light fixed-top shadow">
                <div className='container-fluid d-flex justify-content-center align-items-center'>
                    <img src={logo} alt="Logo" width="80" height="50" className="img-fluid" />
                    <form className="form-inline my-2 my-lg-0 ms-auto pe-3">
                        <div className='d-flex align-items-center'>
                            {/* Search Input - Hidden on small screens, visible on medium and larger screens */}
                            <input className="form-control me-2 d-none d-md-block" 
                                   type="search" 
                                   placeholder="Search products..." 
                                   aria-label="Search" />

                            {/* Search Button - Always visible, even on small screens */}
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
