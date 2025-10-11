import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white text-center">
      <h1 className="display-3 fw-bold">🚨 Access Denied! 🚨</h1>
      <p className="lead mb-4">
        Whoops! You’re not supposed to be here...
      </p>
      
      <p className="fs-5">
        Looks like you don’t have permission. <br /> 
        No worries, let’s get you back! 
      </p>
      <button 
        className="btn btn-danger btn-lg mt-3 px-4"
        onClick={() => navigate("/")}
      >
        Take Me Home
      </button>
    </div>
  );
};

export default Unauthorized;
