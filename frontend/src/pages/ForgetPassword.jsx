import { useState } from "react";
import API from "../api/axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await API.post(
      "/forgot-password/",
      {
        email
      }
    );

    setMessage(
      res.data.message
    );

    setEmail("");

    setTimeout(() => {

      setMessage("");

    }, 3000);

  } catch (error) {

    setMessage(
      error.response?.data?.message ||
      "Something went wrong"
    );

  }

};

  return (

    <div className="auth-container">

      {
        message && (

          <p className="success-message">
            {message}
          </p>

        )
      }

      <h1>
        Forgot Password
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button type="submit">
          Send
        </button>

      </form>

    </div>

  );
}

export default ForgotPassword;