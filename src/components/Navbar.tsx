import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { loginFail } from "../store/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(loginFail(""));
    }
  }, [error]);

  return (
    <nav>
      <div>
        <Link to={"/"}>
          <img
            src="data:image/webp;base64,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"
            alt="Nav Logo"
          />
        </Link>
      </div>
      <div className="right">
        {isAuthenticated ? (
          <Link to="#" className="primary">
            {user?.first_name} {user?.last_name}
          </Link>
        ) : (
          <>
            <Link to="/login" className="primary">
              Login
            </Link>
            <Link to="/signup" className="secondary">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
