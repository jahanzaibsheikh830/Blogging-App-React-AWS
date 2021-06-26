import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "../style.css";
import { useDispatch } from "react-redux";
import { user } from "../../redux/action/reduxaction";
function Login() {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
    confirmSignIn: false,
  });
  const dispatch = useDispatch();
  function setInput(key, value) {
    setSignInData({ ...signInData, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = signInData;
    try {
      const User = await Auth.signIn(username, password);
      console.log("successfully signed in", User);
      dispatch(
        user({
          loginStatus: true,
          //   loginUser:
        })
      );
      setSignInData({
        username: "",
        password: "",
        confirmSignin: true,
      });
      console.log(signInData);
    } catch (error) {
      console.log("error signing in", error);
    }
  }
  return (
    <div>
      <div className='container'>
        <div className='login-form'>
          <div className='formdiv'>
            <h3 style={{ textAlign: "center" }}>Admin login</h3>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                value={signInData.username}
                placeholder='User Name'
                onChange={(event) => setInput("username", event.target.value)}
              />
              <input
                type='password'
                value={signInData.password}
                placeholder='Password'
                onChange={(event) => setInput("password", event.target.value)}
              />
              <button type='submit'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
