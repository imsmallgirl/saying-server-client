import React from "react";
import { Link } from "react-router-dom";
import JoinForm from "../components/Join/JoinForm";
import "../css/join.scss";

const Join = () => {
  return (
    <div className="join-wrap">
      <div className="join-container">
        <h1>YUGYUNG SAYING</h1>
        <div className="join-contents">
          <dl>
            <dt>기본정보입력</dt>
            <dd>회원가입에 필요한 이메일주소와, 비밀번호를 입력해주세요.</dd>
          </dl>
          <JoinForm />
          <p>
            이미 계정이 있으신가요? <Link to="/member">로그인하기</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
