import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ResetPassword() {

  const { uid , token} =
    useParams();

  const [password,
    setPassword] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const submit = async () => {

    try {

      const res =
        await API.post(

  `/reset-password/${uid}/${token}/`,

  {
    new_password:
      password
  }

);

      setMessage(
        res.data.message
      );

    } catch(error){

      console.log(error);

    }

  };

  return (

    <div className="auth-container">

      <h1>
        Reset Password
      </h1>

      {
        message &&
        <p>
          {message}
        </p>
      }

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e)=>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={submit}
      >
        Reset Password
      </button>

    </div>

  );

}

export default ResetPassword;