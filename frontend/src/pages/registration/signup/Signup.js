import React, { useEffect, useRef, useState } from "react";
import BirthDatePicker from "../../../components/BirthDatePicker";
import "./Signup.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { nodeInstance } from "../../../routes/ApiRoutes";
import { login } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const submitBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [email, setEmail] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState(null);

  useEffect(() => {
    setBirthDate(
      `${selectedDay?.value}-${selectedMonth?.value}-${selectedYear?.value}`
    );
  }, [selectedDay, selectedMonth, selectedYear]);

  useEffect(() => {
    if (submitBtnRef.current) {
      submitBtnRef.current.style.marginLeft = `0vw`;
    }
  }, []);

  const handleOnMouseEnter = () => {
    if (
      selectedDay === null ||
      selectedMonth === null ||
      selectedDay === null ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      if (submitBtnRef.current.style.marginLeft === "0vw") {
        submitBtnRef.current.style.marginLeft = "-30vw";
      } else if (submitBtnRef.current.style.marginLeft === "-30vw") {
        submitBtnRef.current.style.marginLeft = "30vw";
      } else if (submitBtnRef.current.style.marginLeft === "30vw") {
        submitBtnRef.current.style.marginLeft = "-30vw";
      }
    }
  };
  const handleOnMouseLeave = () => {};

  const handleOnSubmit = (e) => {
    setIsSigningIn(true);
    e.preventDefault();
    if (
      selectedDay === null ||
      selectedMonth === null ||
      selectedDay === null ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      alert("Fill Everything");
      setIsSigningIn(false);
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email)) {
        if (password.length > 6) {
          if (password === confirmPassword) {
            const data = {
              email: email.split(" ").join("").toLocaleLowerCase(),
              birthDate: birthDate,
              password: password,
            };
            sendToServer(data);
          } else {
            alert("Password Doesnt Match!");
            setIsSigningIn(false);
          }
        } else {
          alert("Weak Password");
          setIsSigningIn(false);
        }
      } else {
        alert("Enter a valid email");
        setIsSigningIn(false);
      }
    }
  };

  const sendToServer = async (data) => {
    console.log("uploading");

    await nodeInstance
      .post("/signup", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(async (res) => {
        if (res.status === 201) {
          dispatch(
            login({
              dob: res.data.user.birthDate,
              email: res.data.user.email,
              dateJoined: res.data.user.dateJoined,
            })
          );
          await navigate("/");
          await alert("Successful Registration");
          setIsSigningIn(false);
        } else {
          alert("Registration failed");
          setIsSigningIn(false);
        }
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="content">
          <h3>Sign up To YK TV</h3>
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
            <BirthDatePicker
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />

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
            <div className="password-div">
              <label>Confirm Password</label>
              <div className="password-div-input">
                <input
                  type={isShowPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              ref={submitBtnRef}
              className="submit-btn"
              style={isSigningIn ? { backgroundColor: "black" } : {}}
              type="submit"
              value={isSigningIn ? "Signing up..." : "sign up"}
              onClick={(e) => handleOnSubmit(e)}
              onMouseEnter={() => handleOnMouseEnter()}
              onMouseLeave={() => handleOnMouseLeave()}
              disabled={isSigningIn}
            />
          </form>
          <Link to={"/login"} className="link">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
