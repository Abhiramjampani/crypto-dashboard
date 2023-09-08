import React, { useState } from "react";
import person_icon from "../Asserts/person.png";
import email_icon from "../Asserts/email.png";
import password_icon from "../Asserts/password.png";
import { AuthenticateSignin, AuthenticateSignup } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [action, setAction] = useState("Login");
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const handleLoginChange = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="abhi">
            <div className="input">
              <img src={person_icon} alt="" />
              <input
                type="text"
                onChange={handleSignupChange}
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="input">
              <img src={person_icon} alt="" />
              <input
                type="number"
                onChange={handleSignupChange}
                name="phone"
                placeholder="Phone-number"
                required
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                onChange={handleSignupChange}
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                onChange={handleSignupChange}
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
        )}
        {action !== "Login" ? (
          <div></div>
        ) : (
          <>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                onChange={handleLoginChange}
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                onChange={handleLoginChange}
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here?</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit-gray" : "submit"}
          onClick={async() => {
            setAction("Sign Up");
            if (action === "Sign Up") {
              let res = await AuthenticateSignup(signupData);
              console.log(res)
              if(res.status===200)
              console.log("Hello")
              setAction("Login")
            }
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit-gray" : "submit"}
          onClick={async() => {
            setAction("Login");
            if (action === "Login") {
              await AuthenticateSignin(LoginData);
              navigate("/home");
            }
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
