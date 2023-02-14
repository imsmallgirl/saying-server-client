import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/header.scss";
import { authService } from "../../database";
import { SayingContext } from "../../store/SayingProvider";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userObj } = useContext(SayingContext);
  const [onUserInfo, setOnUserInfo] = useState(false);
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut();
    navigate("/", { replace: true });
    setIsLoggedIn(false);
  };
  const onClickUserInfo = () => {
    setOnUserInfo((prev) => !prev);
  };
  return (
    <header>
      <ul>
        <li>
          <Link style={{ textDecoration: "none", color: "#333" }} to="/">
            홈
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none", color: "#333" }} to="/search">
            검색
          </Link>
        </li>
        {isLoggedIn ? (
          <li className="user-info">
            <p onClick={onClickUserInfo}>
              {userObj.displayName}님{" "}
              <span>{onUserInfo ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </p>
            {onUserInfo && (
              <div className="user-menus">
                <Link
                  style={{ textDecoration: "none", color: "#333" }}
                  to="/mySaying"
                >
                  나의 명언
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "#333" }}
                  to="/"
                  onClick={onLogoutClick}
                >
                  로그아웃
                </Link>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link
              style={{ textDecoration: "none", color: "#333" }}
              to="/member"
            >
              로그인
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
