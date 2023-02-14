import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { debounce } from "underscore";
import { authService } from "../../database";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPW, setLoginPW] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeLoginEmail = useMemo(
    () =>
      debounce((e) => {
        setLoginEmail(e.target.value);
      }, 300),
    []
  );

  const onChangeLoginPW = useMemo(
    () =>
      debounce((e) => {
        setLoginPW(e.target.value);
      }, 300),
    []
  );

  const onLoginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(authService, loginEmail, loginPW)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoginSuccess(user);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/internal-error).") {
          setLoginError("소셜 계정을 확인해주세요.");
        }
        setLoginError(error.message);
      });
  };
  return (
    <div className="email-container">
      {loginSuccess && <Navigate to="/" replace={true} />}
      <p>이메일 로그인</p>
      <form onSubmit={onLoginSubmit}>
        <FormControl sx={{ mb: 3, width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-email">
            이메일 주소
          </InputLabel>
          <Input
            sx={{ p: 1 }}
            required
            id="standard-adornment-email"
            onChange={onChangeLoginEmail}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            비밀번호
          </InputLabel>
          <Input
            sx={{ p: 1 }}
            required
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={onChangeLoginPW}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <p className="login-error">{loginError}</p>
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
