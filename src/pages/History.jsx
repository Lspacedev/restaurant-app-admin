import { useState } from "react";
import ReservationCard from "../components/Reservations/ReservationCard";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router";

function History() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);
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
      console.log({ data });
      if (res.ok === true) {
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
    <div className="History">
      <div className="notifications">
        <div className="notifs-nav">
          <div style={{ color: "white", fontSize: "20px" }}>History</div>
        </div>
        {user.notifications.length > 0 ? (
          user.notifications.map((notification, i) => (
            <div key={i} className="notification">
              {notification}
            </div>
          ))
        ) : (
          <div style={{ display: "flex", color: "white" }}>
            No history found
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
