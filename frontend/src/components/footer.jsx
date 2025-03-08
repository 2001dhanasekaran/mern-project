import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center py-3 mt-auto w-100 d-flex flex-column justify-content-center align-items-center">
            <p className="mb-0">&copy; 2025 Online Stationery Store. All Rights Reserved.</p>
            <div className="mt-2">
                <Link to="/about" className="text-light mx-2">About Us</Link>
                <Link to="/contact" className="text-light mx-2">Contact Us</Link>
            </div>
            <div className="mt-2 d-flex justify-content-center">
                <p className="text-light mx-2"><FontAwesomeIcon icon={faFacebook} size="2x" /></p>
                <p className="text-light mx-2"><FontAwesomeIcon icon={faInstagram} size="2x" /></p>
                <p className="text-light mx-2"><FontAwesomeIcon icon={faGooglePlay} size="2x" /></p>
                <p className="text-light mx-2"><FontAwesomeIcon icon={faApple} size="2x" /></p>
            </div>
            <p>For more Enquiries Call our Customer Care Center: 1800 000 000</p>
        </footer>
      );
};

export default Footer;