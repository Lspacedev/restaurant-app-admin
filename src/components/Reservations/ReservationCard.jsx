import { useNavigate } from "react-router-dom";
import { useState } from "react";
function ReservationCard({ booking }) {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleNavigateSubPage() {
    // navigation(`/home/reservations/${booking.bookingId}`);
  }
  const token = localStorage.getItem("token");

  async function accept() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/restaurants/${
          booking.restaurantId
        }/bookings/${booking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "approved" }),
        }
      );
      const data = await res.json();
      if (res.ok === true) {
      }
      navigation(0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function reject() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/restaurants/${
          booking.restaurantId
        }/bookings/${booking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      const data = await res.json();
      if (res.ok === true) {
      }
      navigation(0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="ReservationCard">
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : (
        <>
          <h6>Booking Id: {booking._id}</h6>
          <p>Name: {booking.name}</p>
          <p>Surname: {booking.surname}</p>
          <p>Email: {booking.email}</p>
          <p>Guest: {booking.guest}</p>

          <div className="checkin-out">
            <div>
              <p>Day</p>
              <p>{booking.day}</p>
            </div>
            <div>
              <p>Hour</p>
              <p>{booking.hour}</p>
            </div>
          </div>
          <div className="status-date">
            <div>
              <p>Status</p>
              <p>{booking.status}</p>
            </div>
          </div>
          <div className="v-btn">
            <button onClick={accept}>Accept</button>
            <button onClick={reject}>Reject</button>
          </div>
        </>
      )}
    </div>
  );
}
export default ReservationCard;
