import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { app, db } from "../../../index.js";
import { collection, query, where } from "firebase/firestore";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
// import { nodeInstance } from "../../../routes/ApiRoutes";
import { login } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const loginBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogingIn, setIsLogingIn] = useState(false);

  useEffect(() => {
    if (loginBtnRef.current) {
      loginBtnRef.current.style.marginLeft = "0vw";
    }
  }, []);
  // const handleOnMouseEnter = () => {
  //   if (email.length < 1 || password.length < 1) {
  //     if (loginBtnRef.current.style.marginLeft === "0vw") {
  //       loginBtnRef.current.style.marginLeft = "-30vw";
  //     } else if (loginBtnRef.current.style.marginLeft === "-30vw") {
  //       loginBtnRef.current.style.marginLeft = "30vw";
  //     } else if (loginBtnRef.current.style.marginLeft === "30vw") {
  //       loginBtnRef.current.style.marginLeft = "-30vw";
  //     }
  //   }
  // };
  const handleOnMouseEnter = () => {
    if (email.length < 1 || password.length < 1) {
      loginBtnRef.current.disabled = true;
    } else {
      loginBtnRef.current.disabled = false;
    }
  };

  async function getDocuments(q) {
    try {
      const querySnapshot = await getDocs(q);
      let data = {};
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data = doc.data();
        console.log(data);
      });
      return data;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  const handleOnSubmit = async (e) => {
    setIsLogingIn(true);
    e.preventDefault();

    if (email.length < 1 || password.length < 1) {
      alert("Please fill in Password");
      setIsLogingIn(false);
    } else {
      // eslint-disable-next-line
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(email)) {
        alert("Enter a valid email");
        setIsLogingIn(false);
      } else {
        if (password.length < 6) {
          alert("That can't be anyone's password");
          setIsLogingIn(false);
        } else {
          // const data = {
          //   email: email.split(" ").join("").toLocaleLowerCase(),
          //   password: password,
          // };
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              const usersRef = collection(db, "users");
              const q = query(usersRef, where("uid", "==", user.uid));
              getDocuments(q).then((data) => {
                console.log(data);
                dispatch(
                  login({
                    uid: data.uid,
                    username: data.username,
                    email: data.email,
                    dob: data.birthDate,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    dateJoined: data.dateJoined,
                  })
                );
                navigate("/");
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(errorCode, errorMessage);
            });
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
