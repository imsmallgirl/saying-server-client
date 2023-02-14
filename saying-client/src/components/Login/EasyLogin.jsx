import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { AiFillGoogleSquare, AiOutlineGithub } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import { authService, githubProvider, googleProvider } from "../../database";

const EasyLogin = () => {
  const [googleError, setGoogleError] = useState([]);
  const [githubError, setGithubError] = useState([]);
  const [googleLogin, setGoogleLogin] = useState(null);
  const [githubLogin, setGithubLogin] = useState(null);

  const onGoogleLogin = async () => {
    await signInWithPopup(authService, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setGoogleLogin(user);
      })
      .catch((error) => {
        setGoogleError(
          [error.message, error.customData.email],
          GoogleAuthProvider.credentialFromError(error)
        );
      });
  };

  const onGithubLogin = async () => {
    await signInWithPopup(authService, githubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setGithubLogin(user);
      })
      .catch((error) => {
        setGithubError(
          [error.message, error.customData.email],
          GithubAuthProvider.credentialFromError(error)
        );
      });
  };

  return (
    <div className="easy-container">
      {(googleLogin || githubLogin) && <Navigate to="/" replace={false} />}
      <p>간편 로그인</p>
      {googleError || githubError}
      <ul>
        <li className="google-login" onClick={onGoogleLogin}>
          <span>
            <AiFillGoogleSquare />
          </span>
          Google로 로그인
        </li>
        <li className="github-login" onClick={onGithubLogin}>
          <span>
            <AiOutlineGithub />
          </span>
          Github로 로그인
        </li>
      </ul>
      <div className="or">OR</div>
    </div>
  );
};

export default EasyLogin;
