import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { nodeInstance } from "../../../routes/ApiRoutes";
import { login } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const loginBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogingIn, setIsLogingIn] = useState(false);

  useEffect(() => {
    if (loginBtnRef.current) {
      loginBtnRef.current.style.marginLeft = "0vw";
    }
  }, []);
  const handleOnMouseEnter = () => {
    if (email.length < 1 || password.length < 1) {
      if (loginBtnRef.current.style.marginLeft === "0vw") {
        loginBtnRef.current.style.marginLeft = "-30vw";
      } else if (loginBtnRef.current.style.marginLeft === "-30vw") {
        loginBtnRef.current.style.marginLeft = "30vw";
      } else if (loginBtnRef.current.style.marginLeft === "30vw") {
        loginBtnRef.current.style.marginLeft = "-30vw";
      }
    }
  };

  const handleOnSubmit = async (e) => {
    setIsLogingIn(true);
    e.preventDefault();

    if (email.length < 1 || password.length < 1) {
      alert("Fill Everything");
      setIsLogingIn(false);
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(email)) {
        alert("Enter a valid email");
        setIsLogingIn(false);
      } else {
        if (password.length < 6) {
          alert("That can't be anyone's password");
          setIsLogingIn(false);
        } else {
          const data = {
            email: email.split(" ").join("").toLocaleLowerCase(),
            password: password,
          };
          try {
            const response = await nodeInstance.post("/login", data, {
              headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
              dispatch(
                login({
                  email: response.data.user.email,
                  birthDate: response.data.user.birthDate,
                  dateJoined: response.data.user.dateJoined,
                })
              );
              navigate("/");
            }
          } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging in");
            setIsLogingIn(false);
          }
        }
      }
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="content">
          <h3>Log in To YK TV</h3>
          <div className="google-btn">
            <GoogleIcon />
            Continue with Google
          </div>
          <form>
            <div className="email-div">
              <label>Email</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-div">
              <label>Password</label>
              <div className="password-div-input">
                <input
                  type={isShowPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="show-pass">
                  {isShowPassword ? (
                    <VisibilityIcon onClick={() => setIsShowPassword(false)} />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setIsShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </div>
            <input
              ref={loginBtnRef}
              className="submit-btn"
              style={isLogingIn ? { backgroundColor: "black" } : {}}
              type="submit"
              value={isLogingIn ? "Logging in..." : "Log in"}
              onClick={(e) => handleOnSubmit(e)}
              onMouseEnter={() => handleOnMouseEnter()}
            />
          </form>
          <Link className="forgot-password link">Forgot your password?</Link>
          <Link to={"/signup"} className="link">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
