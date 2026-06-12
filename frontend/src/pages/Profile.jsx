import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [profilePicture,
    setProfilePicture] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem("access");

      const res = await API.get(
        "/profile/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      console.log(
        "PROFILE DATA:",
        res.data
      );

      setUser(res.data);

      setUsername(
        res.data.username
      );

      setEmail(
        res.data.email
      );

    } catch (error) {

      console.log(error);

    }

  };

  const updateProfile = async () => {

    try {

      const token =
        localStorage.getItem("access");

      const formData =
        new FormData();

      formData.append(
        "username",
        username
      );

      formData.append(
        "email",
        email
      );

      if (profilePicture) {

        formData.append(
          "profile_picture",
          profilePicture
        );

      }

      await API.put(
        "/profile/",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setMessage(
        "✅ Profile Updated Successfully"
      );

      setIsEditing(false);

      fetchProfile();

      setTimeout(() => {

        setMessage("");

      }, 3000);

    } catch (error) {

      console.log(error);

    }

  };

  const completionRate =
    user.total_tasks
      ? Math.round(
          (
            user.completed_tasks /
            user.total_tasks
          ) * 100
        )
      : 0;

  return (

    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-header">

          {
            user.profile_picture ? (

              <img
                src={
                  `http://127.0.0.1:8000${user.profile_picture}`
                }
                alt="Profile"
                className="profile-image"
              />

            ) : (

              <div className="avatar">
                👤
              </div>

            )
          }

          <h1>
            Profile
          </h1>

        </div>

        {
          message && (

            <p className="success-message">
              {message}
            </p>

          )
        }

        {
          !isEditing ? (

            <>

              <h2>
                {user.username}
              </h2>

              <p className="email">
                📧 {user.email}
              </p>

              <div className="profile-actions">

                <button
                  onClick={() =>
                    setIsEditing(true)
                  }
                >
                  ✏️ Edit Profile
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/change-password"
                    )
                  }
                >
                  🔒 Change Password
                </button>

              </div>

            </>

          ) : (

            <>

              <h3>
                Edit Profile
              </h3><br/>
              <h4>Username</h4>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

              <br /><br />
              <h4>Email</h4>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <br /><br />
              <h4>Profile Picture</h4>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfilePicture(
                    e.target.files[0]
                  )
                }
              />

              <br /><br />

              <button
                onClick={updateProfile}
              >
                Save
              </button>

              <button
                onClick={() =>
                  setIsEditing(false)
                }
              >
                Cancel
              </button>

            </>

          )
        }

        <hr />

        <div className="stats">

          <div className="stat-card">

            <h3>
              📋 Total
            </h3>

            <p>
              {user.total_tasks || 0}
            </p>

          </div>

          <div className="stat-card">

            <h3>
              ✅ Completed
            </h3>

            <p>
              {user.completed_tasks || 0}
            </p>

          </div>

          <div className="stat-card">

            <h3>
              ⏳ Pending
            </h3>

            <p>
              {user.pending_tasks || 0}
            </p>

          </div>

        </div>

        <h3>

          📈 Completion Rate:
          {" "}
          {completionRate}%

        </h3>

        <div className="progress-container">

          <div
            className="progress-bar"
            style={{
              width:
                `${completionRate}%`
            }}
          />

        </div>

      </div>

    </div>

  );
}

export default Profile;