import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CgClose } from "react-icons/cg";

function Register() {
  const [obj, setObj] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
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
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/register`, {
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
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <div className="Register">
      <div className="register-form-container">
        {!loading ? (
          <>
            <div className="form">
              <h3>Create your account</h3>
              {errors &&
                errors.length > 0 &&
                errors.map((err, i) => (
                  <span key={i} className="err">
                    {err.msg}
                  </span>
                ))}
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Name"
                onChange={(e) => handleInputChange(e)}
              />
              <br />
              <input
                type="surname"
                id="surname"
                name="surname"
                placeholder="Surname"
                onChange={(e) => handleInputChange(e)}
              />
              <br />
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
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
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

export default Register;
