import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <nav>
        <div className="logo-land">Reservations</div>
        <div className="login-register">
          <Link to="login">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>
      <div className="landing-content">
        <div className="landing-info">
          <div className="landing-title">
            Manage your restaurant reservations, all in one place.
          </div>
          <div className="landing-subtitle">Trusted by many.</div>
          <Link to="/registration">
            <button className="register-btn2">Register Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
