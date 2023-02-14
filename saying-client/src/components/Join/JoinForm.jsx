import React, { useMemo, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { debounce } from "underscore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../database";
import { Navigate } from "react-router-dom";

const JoinForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [joinEmail, setJoinEmail] = useState("");
  const [joinPW, setJoinPW] = useState("");
  const [joinError, setJoinError] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeEmail = useMemo(
    () =>
      debounce((e) => {
        setJoinEmail(e.target.value);
      }, 300),
    []
  );

  const onChangePW = useMemo(
    () =>
      debounce((e) => {
        setJoinPW(e.target.value);
      }, 300),
    []
  );

  const onJoinSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(authService, joinEmail, joinPW)
      .then((userCredential) => {
        const newUser = userCredential.user;
        const defaultDisplayName = newUser.email.split("@");
        newUser.displayName = defaultDisplayName[0];
        setJoinSuccess(newUser);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setJoinError("이미 동일한 email이 존재합니다.");
          return;
        } else if (error.message === "Firebase: Error (auth/internal-error).") {
          setJoinError("소셜 계정과 같은 email이 존재합니다.");
          return;
        }
        setJoinError(error.message);
      });
  };
  return (
    <form onSubmit={onJoinSubmit}>
      <p>{joinError}</p>
      {joinSuccess && <Navigate to="/member" replace={true} />}
      <FormControl sx={{ mb: 3, width: "100%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-email">이메일 주소</InputLabel>
        <Input
          sx={{ p: 1 }}
          required
          id="standard-adornment-email"
          onChange={onChangeEmail}
        />
      </FormControl>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
        <Input
          sx={{ p: 1 }}
          required
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={onChangePW}
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

      <button type="submit" className="join-btn">
        가입하기
      </button>
    </form>
  );
};

export default JoinForm;
