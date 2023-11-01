import React, { useEffect, useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../../index.js";
import { addDoc, collection } from "firebase/firestore";

import BirthDatePicker from "../../../components/BirthDatePicker";
import "./Signup.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
// import { nodeInstance } from "../../../routes/ApiRoutes";
import { login } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const submitBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  // useEffect(() => {
  //   if (submitBtnRef.current) {
  //     submitBtnRef.current.style.marginLeft = `0vw`;
  //   }
  // }, []);

  async function addDocument(data) {
    try {
      const docRef = await addDoc(collection(db, "users"), data);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleOnMouseEnter = () => {
    // Check if the form is not filled
    if (
      username === null ||
      selectedYear === null ||
      selectedMonth === null ||
      selectedDay === null ||
      email.length < 1 ||
      phoneNumber.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      setIsSigningIn(false); // Set the state variable to disable the button
      submitBtnRef.current.disabled = true;
    } else {
      setIsSigningIn(true); // Set the state variable to enable the button
      submitBtnRef.current.disabled = false;
    }
  };
  const handleOnMouseLeave = () => {
    setIsSigningIn(false); // Set the state variable to disable the button
    console.log(isSigningIn);
  };

  const handleOnSubmit = (e) => {
    setIsSigningIn(true);
    e.preventDefault();
    if (
      username === null ||
      selectedDay === null ||
      selectedMonth === null ||
      selectedDay === null ||
      email.length < 1 ||
      phoneNumber.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      alert("Please fill in the missing fields.");
      setIsSigningIn(false);
    } else {
      submitBtnRef.current.style.backgroundColor = "black";
      submitBtnRef.current.value = "Signing up...";
      // eslint-disable-next-line
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email)) {
        if (password.length > 7) {
          if (password === confirmPassword) {
            let data = {
              username: username,
              email: email.split(" ").join("").toLocaleLowerCase(),
              birthDate: birthDate,
              password: password,
              phoneNumber: phoneNumber,
              dateJoined: `${new Date().getDate()}-${
                new Date().getMonth() + 1
              }-${new Date().getFullYear()}`,
            };
            console.log(data);
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                // Add a new document in collection
                data.uid = user.uid;
                addDocument(data);
                dispatch(
                  login({
                    uid: user.uid,
                    username: data.username,
                    email: data.email,
                    dob: data.birthDate,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    dateJoined: `${new Date().getDate()}-${
                      new Date().getMonth() + 1
                    }-${new Date().getFullYear()}`,
                  })
                );
                navigate("/");
                alert("Successful Registration");
                setIsSigningIn(false);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/email-already-in-use") {
                  alert("email already in use");
                  submitBtnRef.current.style.backgroundColor = "#007aff";
                  submitBtnRef.current.value = "Sign up";
                }
                console.error(errorCode, errorMessage);
              });
          } else {
            alert("Password Doesnt Match!");
            setIsSigningIn(false);
            submitBtnRef.current.style.backgroundColor = "#007aff";
            submitBtnRef.current.value = "Sign up";
          }
        } else {
          alert("Weak Password");
          setIsSigningIn(false);
          submitBtnRef.current.style.backgroundColor = "#007aff";
          submitBtnRef.current.value = "Sign up";
        }
      } else {
        alert("Enter a valid email");
        setIsSigningIn(false);
        submitBtnRef.current.style.backgroundColor = "#007aff";
        submitBtnRef.current.value = "Sign up";
      }
    }
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
            {/* Email Div */}
            <div className="email-div">
              <label>Email</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* PhoneNumber Div */}
            <div className="phone_number-div">
              <label>Mobile Number</label>
              <br />
              <input
                type="text"
                value={phoneNumber}
                placeholder="+254***"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* Username Div */}
            <div className="username-div">
              <label>Username</label>
              <br />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* BirthDate Picker Component */}
            <BirthDatePicker
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            {/* Password Div */}
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
              type="submit"
              value="Sign up"
              onClick={(e) => handleOnSubmit(e)}
              onMouseEnter={() => handleOnMouseEnter()}
              onMouseLeave={() => handleOnMouseLeave()}
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
