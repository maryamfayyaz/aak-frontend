import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { loginBegin, loginFail, loginSuccess } from "../store/userSlice";
import axiosClient from "../utils/api";
import { getErrorMessage } from "../utils/helpers";
import { toast } from "react-toastify";
import { Mail, Lock, EyeIcon, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginBegin());

    try {
      const res = await axiosClient.post("/login/", loginData);
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));

      toast.success("Login successful");
      navigate("dashboard");
    } catch (error: any) {
      dispatch(loginFail(getErrorMessage(error)));
    }

    dispatch({ type: "user/login", payload: loginData });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="title">Login</h2>
        <p className="subtitle"> Please Enter Your Email and Password</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" />
            <input type="email" name="email" id="email" placeholder="Email" value={loginData.email} onChange={handleChange} required className="input-field" />
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" value={loginData.password} onChange={handleChange} required className="input-field" />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeIcon /> : <EyeOff />}
            </button>
          </div>

          <button type="submit" className="form-button">
            Login
          </button>
        </form>

        <p className="bottom-text">
          Don't have an account?{" "}
          <Link to="/signup" className="bottom-link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
