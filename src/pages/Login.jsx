import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CgClose } from "react-icons/cg";

function Login() {
  const [obj, setObj] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigation = useNavigate();
  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      if (typeof data.errors !== "undefined") {
        setErrors(data.errors);
      } else {
        alert(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      }

      setLoading(false);
      navigation("/home");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="Login">
      <div className="login-form-container">
        {!loading ? (
          <>
            <div className="form">
              <h3>Log in to your account</h3>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleInputChange(e)}
              />
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
              />
              <br />

              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        ) : (
          <div style={{ color: "#e6e8e6" }}>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Login;
