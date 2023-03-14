import React, { useState } from "react";
import { fetchLogin } from "../apiFrontend/api";


const Login = (props) => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await fetchLogin(username, password);
      if (login) {
        props.setIsLoggedIn(true);
      }
      localStorage.setItem("token", login.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <h1 className="header">Log In</h1>
          <label>
            <input
              className="input"
              type="text"
              placeholder="Username*"
              maxLength="30"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </label>

          <label>
            <input
              className="input"
              type="password"
              placeholder="Password*"
              maxLength="30"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>

          <button className="button">
            Submit
          </button>
        </div>
        {/* <div className=" absolute top-0 left-0 w-full bg-[#0000003a]"></div>
        <img src={gym} alt="gymimage" className="w-full h-full object-cover" /> */}
      </form>
    </>
  );
}

export default Login;