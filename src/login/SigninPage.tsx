import React, { useState } from "react";
import LoginHeader from "./LoginHeader";
import InputContainer from "../misc/InputContainer";
import QueryUserLogin from "../resolvers/QueryUserLogin";
import HiddenVisual from "./HiddenVisual";

interface Props {
  loadingUser: () => void;
  passUserAuth: (id: number) => void;
}

const SigninPage: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameOpac, setUsernameOpac] = useState(0);
  const [passwordOpac, setPasswordOpac] = useState(0);

  function passUsername(val: string) {
    setUsername(val);
  }

  function passPassword(val: string) {
    setPassword(val);
  }

  function renderPasswordNull() {
    setPasswordOpac(1);
  }

  function renderUsernameNull() {
    setUsernameOpac(1);
  }

  function loadingUser() {
    props.loadingUser();
  }

  return (
    <div>
      <LoginHeader text="Login" />
      <InputContainer passString={passUsername} placeholder="Username" />
      <InputContainer passString={passPassword} placeholder="Password" />
      <QueryUserLogin
        username={username}
        password={password}
        loadingUser={loadingUser}
        renderUsernameNull={renderUsernameNull}
        renderPasswordNull={renderPasswordNull}
        passUserAuth={props.passUserAuth}
      />
      <HiddenVisual text="You must enter a username" opac={usernameOpac} />
      <HiddenVisual text="You must enter a password" opac={passwordOpac} />
    </div>
  );
};

export default SigninPage;
