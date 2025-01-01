import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [userUpdate, setUserUpdate] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [update, setUpdate] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);
  async function handleSubmit() {
    try {
      const res = await fetch(`http://localhost:3000/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc0MjAzMGQ5NzkyY2QxYjA2ODZiOWMiLCJlbWFpbCI6InRzcEBtcGcuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1NzE4ODg4LCJleHAiOjE3MzU3Mjk2ODh9.mNunqhtoiRtWYfCYJZ7dm5bo6RETGLvXeTG069JjE0Q`,
        },
        body: JSON.stringify(userUpdate),
      });
      const data = await res.json();
      if (res.ok === true) {
        setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setUpdate(false);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }
  async function fetchProfile() {
    try {
      const res = await fetch(`http://localhost:3000/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok === true) {
        let obj = { ...userUpdate };
        obj.name = data.name;
        obj.surname = data.surname;
        obj.email = data.email;
        setUserUpdate(obj);
        setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  if (loading)
    return <div style={{ flex: 3, display: "flex" }}>Loading...</div>;
  return (
    <div className="Profile">
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                <div className="form-close" onClick={() => setUpdate(false)}>
                  <CgClose />
                </div>
              </div>
            ) : (
              <div className="profile-pic">
                {<img src={"/images/profile.png"} />}
              </div>
            )}
          </div>
          <div className="profile-content">
            <h2>Account details</h2>
            <div className="name-div content">
              <h4>Name</h4>
              {update ? (
                <div className="name">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.name}
                  />
                </div>
              ) : (
                <div>{user && user.name}</div>
              )}
            </div>

            <div className="surname-div content">
              <h4>Surname</h4>
              {update ? (
                <div className="surname">
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.surname}
                  />
                </div>
              ) : (
                <div>{user && user.surname}</div>
              )}
            </div>

            <div className="email-div content">
              <h4>Email</h4>
              {update ? (
                <div className="email">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.email}
                  />
                </div>
              ) : (
                <div>{user && user.email}</div>
              )}
            </div>

            <div className="account-update">
              <button
                onClick={() => (update ? handleSubmit() : setUpdate(true))}
              >
                {update ? "Submit" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
