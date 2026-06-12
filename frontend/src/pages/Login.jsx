// src/pages/Login.jsx

import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/login/", {
  username_or_email: username,
  password,
});

      login(res.data.access);
      navigate("dashboard");
      //alert("Login Successful");

    } catch (error) {

      alert("Invalid Credentials");

    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

       <input
  placeholder="Username or Email"
  onChange={(e) =>
    setUsername(e.target.value)
  }
/>

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button>
          Login
        </button>
        <br /><br />

<Link to="/forgot-password">
  Forgot Password?
</Link>

<br /><br />

<Link to="/signup">
  Create Account
</Link>
      </form>
    </div>
  );
}

export default Login;