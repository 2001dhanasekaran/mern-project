import img from './imgs/background1.jpeg';
import Footer from "./footer";

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <div className="row">
          <div className="col-md-6">
            <img src={img} alt="About Us" className="img-fluid rounded w-80 h-80" />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2>About Our Store</h2>
              <p className="text-muted">
                Welcome to our online stationery store! We offer a wide range of office and school supplies, ensuring quality and affordability.
              </p>
              <p>
                Our mission is to provide top-notch products that enhance your productivity and creativity. Shop with confidence at our store!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;