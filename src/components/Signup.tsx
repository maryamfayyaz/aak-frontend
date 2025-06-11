import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { loginBegin, loginFail, loginSuccess } from "../store/userSlice";
import axiosClient from "../utils/api";
import { getErrorMessage } from "../utils/helpers";
import { toast } from "react-toastify";
import { Mail, Lock, Pencil, User } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({ email: "", password: "", first_name: "", last_name: "", username: "", confirm_password: "" });
  const { error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirm_password, ...submitData } = signupData;

    if (submitData.password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    if (submitData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    dispatch(loginBegin());

    try {
      const res = await axiosClient.post("/signup/", submitData);
      dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));

      toast.success("Signup successful");
      navigate("/dashboard");
    } catch (error: any) {
      dispatch(loginFail(getErrorMessage(error)));
    }

    dispatch({ type: "user/login", payload: signupData });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="title">Create an Account</h2>
        <p className="subtitle"> Please Enter Your Email and Password</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Pencil className="input-icon" />
            <input type="text" name="first_name" id="first_name" placeholder="First Name" value={signupData.first_name} onChange={handleChange} required className="input-field" />
          </div>

          <div className="input-group">
            <Pencil className="input-icon" />
            <input type="text" name="last_name" id="last_name" placeholder="Last Name" value={signupData.last_name} onChange={handleChange} required className="input-field" />
          </div>

          <div className="input-group">
            <User className="input-icon" />
            <input type="text" name="username" id="username" placeholder="Username" value={signupData.username} onChange={handleChange} required className="input-field" />
          </div>

          <div className="input-group">
            <Mail className="input-icon" />
            <input type="email" name="email" id="email" placeholder="Email" value={signupData.email} onChange={handleChange} required className="input-field" />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input type={"password"} name="password" id="password" placeholder="Password" value={signupData.password} onChange={handleChange} required className="input-field" />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={"password"}
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={signupData.confirm_password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="form-button">
            Signup
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login" className="bottom-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
