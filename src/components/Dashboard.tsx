import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { loginFail, logout } from "../store/userSlice";
import { toast } from "react-toastify";
import axiosClient from "../utils/api";
import { getErrorMessage } from "../utils/helpers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, refresh_token, access_token } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout/", { refresh: refresh_token }, { headers: { Authorization: "Bearer " + access_token, "Content-Type": "application/json" } });

      toast.success("Logout successful");
    } catch (error) {
      dispatch(loginFail(getErrorMessage(error)));
    }
    dispatch(logout());
    navigate("/login");
  };



  return (
    <div>
      <div className="form-wrapper">
        <div className="form-container dashboard-card">
          <h2 className="title">
            Welcome, {user?.first_name} {user?.last_name}
          </h2>
          <p className="subtitle"> Email: {user?.email}</p>
          <button className="form-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
