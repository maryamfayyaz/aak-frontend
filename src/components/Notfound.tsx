import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="form-wrapper">
        <div className="form-container dashboard-card">
          <h2 className="title">404 - Page Not Found</h2>
          <p className="subtitle">The Page you are looking for does not exist </p>
          <button className="form-button" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
