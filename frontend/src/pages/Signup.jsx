// src/pages/Signup.jsx

import { useState } from "react";
import API from "../api/axios";

function Signup() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/signup/",
        form
      );

      alert("Account Created");

    } catch {

      alert("Error");
    }
  };

  return (
    <div className="auth-container">

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value
            })
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <br /><br />

        <button>
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;