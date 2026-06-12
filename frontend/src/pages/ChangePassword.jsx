import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ChangePassword() {

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {

      setMessage(
        "❌ Passwords do not match"
      );

      return;
    }

    try {

      const token =
        localStorage.getItem("access");

      const res = await API.put(
        "/change-password/",
        {
          old_password:
            oldPassword,

          new_password:
            newPassword
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setMessage(
        res.data.message
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {

        navigate("/profile");

      }, 2000);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="profile-card">

      <h1>
        🔒 Change Password
      </h1>

      {
        message && (

          <p className="success-message">
            {message}
          </p>

        )
      }

      <form
        onSubmit={handleSubmit}
      >

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) =>
            setOldPassword(
              e.target.value
            )
          }
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          required
        />

        <br /><br />

        <button type="submit">
          Change Password
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/profile")
          }
        >
          Cancel
        </button>

      </form>

    </div>

  );
}

export default ChangePassword;