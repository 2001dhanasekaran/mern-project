import Footer from "./footer";

const Contact = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
        <div className="container my-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2 className="text-center">Contact Us</h2>
              <form className="mt-4 p-4 border rounded shadow text-start">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows="4" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  
  export default Contact;