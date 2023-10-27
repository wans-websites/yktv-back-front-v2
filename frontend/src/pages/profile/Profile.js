import React, { useState } from "react";
import "./Profile.css";
import profile_img from "../../assets/img/profile-dp.png";
import StopIcon from "@mui/icons-material/Stop";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/userSlice";

export default function Profile() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const WarningModal = () => (
    <div className="warning-modal">
      <h3>Are you sure you want to ditch us ?</h3>
      <div
        onClick={() => {
          setIsModal(false);
        }}
      >
        No! Just kidding
      </div>

      <div
        onClick={() => {
          setIsModal(false);
          navigate("/");
          dispatch(logout());
        }}
      >
        Yes! But i'll be back
      </div>
    </div>
  );
  const handleLogout = () => {
    setIsModal(true);
  };
  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="profile-portfolio">
            <div
              className="profile-cover"
              style={{ backgroundImage: `url(${profile_img})` }}
            ></div>
            <div className="profile-details">
              {/* <div>
              <p>Name: </p>
              <p>{user.name}</p>
              <EditIcon />
            </div> */}

              <div>
                <p>Email:</p>
                <p>{user ? user?.email : "user@email.com"}</p>
                <StopIcon />
              </div>
              <div>
                <p>Joined:</p>
                <p>{user ? user?.dateJoined : "dd/mm/yyyy"}</p>
                <StopIcon />
              </div>
              <div className="logout-btn" onClick={() => handleLogout()}>
                Logout
              </div>
            </div>
          </div>
          {isModal && WarningModal()}

          <div className="account-details">
            <div className="account-plan">
              {/* <h4>Subscription Plan</h4> */}
              <div className="subscription-plan">
                <p>Weekly</p>
                <p>75 KES</p>
                <AccountBalanceIcon />
              </div>
              <div className="subscription-plan">
                <p>Monthly</p>
                <p>275 KES</p>
                <AccountBalanceIcon />
              </div>
              <div className="subscription-plan">
                <p>Daily</p>
                <p>15 KES</p>
                <AccountBalanceIcon />
              </div>
            </div>
            <div className="account-overview">
              <div>
                <p>My Favorites:</p>
                <Link to={"/show-content"} className="link">
                  <KeyboardDoubleArrowRightIcon />
                </Link>
              </div>
              <div>
                <p>My Playlist:</p>
                <Link to={"/show-content"} className="link">
                  <KeyboardDoubleArrowRightIcon />
                </Link>
              </div>
              <div>
                <p>Most Watched:</p>
                <Link to={"/show-content"} className="link">
                  <KeyboardDoubleArrowRightIcon />
                </Link>
              </div>
              <div>
                <p>Liked:</p>
                <Link to={"/show-content"} className="link">
                  <KeyboardDoubleArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
