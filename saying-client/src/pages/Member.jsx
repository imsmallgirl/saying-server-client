import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import EasyLogin from "../components/Login/EasyLogin";
import UserLogin from "../components/Login/UserLogin";
import "../css/member.scss";

const Member = () => {
  return (
    <div className="member-wrap">
      <div className="member-container">
        <h1>YUGYUNG SAYING</h1>

        <EasyLogin />
        <UserLogin />
        <Link to="/join">회원가입하기</Link>
      </div>
    </div>
  );
};

export default Member;
