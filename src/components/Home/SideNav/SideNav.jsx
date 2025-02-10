import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MdHomeFilled } from "react-icons/md";
import { MdPermIdentity } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { LuReceiptText } from "react-icons/lu";
function SideNav() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();
  useEffect(() => {
    fetchProfile();
  }, []);
  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("token");
  async function fetchProfile() {
    try {
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok === true) {
        setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  function goToHome() {
    navigation("/home");
  }
  function goToReservations() {
    navigation("/home/reservations");
  }
  function goToReviews() {
    navigation("/home/reviews");
  }
  function goToHistory() {
    navigation("/home/history");
  }
  function goToProfile() {
    navigation(`/home/users/2`);
  }

  function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("resId");

    navigation("/");
  }

  return (
    <div className="SideNav">
      <div className="profile-pic" onClick={goToProfile}>
        <img src="/images/profile.png" alt="profile" />
        <div className="text">
          <p>{user && user.name}</p>
          <p>{user && user.surname}</p>
        </div>
      </div>
      <div className="sideNavLink" onClick={goToHome}>
        <MdHomeFilled color="#e6e8e6" size="2.5rem" className="icon" />
        <div>Home</div>
      </div>
      <div className="sideNavLink" onClick={goToReservations}>
        <LuReceiptText color="#e6e8e6" size="2.5rem" className="icon" />

        <div>Reservations</div>
      </div>
      <div className="sideNavLink" onClick={goToReviews}>
        <GoChecklist color="#e6e8e6" size="2.5rem" className="icon" />

        <div>Reviews</div>
      </div>
      <div className="sideNavLink" onClick={goToHistory}>
        <FaHistory color="#e6e8e6" size="2.5rem" className="icon" />
        <div>History</div>
      </div>

      <div className="sideNavLink logout" onClick={logout}>
        <MdPermIdentity color="#e6e8e6" size="2.5rem" className="icon" />
        <div>Logout</div>
      </div>
    </div>
  );
}

export default SideNav;
