import { useState } from "react";
import ReservationCard from "../components/Reservations/ReservationCard";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router";

function Reservations() {
  const { reservationId } = useParams();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const resId = localStorage.getItem("resId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);
  async function fetchBookings() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/restaurants/` +
          JSON.parse(resId) +
          "/bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok === true) {
        setBookings(data.bookings);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="Reservations">
      {loading ? (
        <div
          style={{
            flex: 3,
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
        >
          Loading...
        </div>
      ) : (
        <>
          <div className="pending-section reservations-div">
            <h5>Pending</h5>
            {typeof bookings !== "undefined" &&
              bookings.length > 0 &&
              bookings.map(
                (booking, i) =>
                  booking.status === "pending" && (
                    <ReservationCard key={i} booking={booking} />
                  )
              )}
          </div>
          <div className="approved-section reservations-div">
            <h5>Approved</h5>
            {typeof bookings !== "undefined" &&
              bookings.length > 0 &&
              bookings.map(
                (booking, i) =>
                  booking.status === "approved" && (
                    <ReservationCard key={i} booking={booking} />
                  )
              )}
          </div>
          <div className="cancelled-section reservations-div">
            <h5>Rejected</h5>
            {typeof bookings !== "undefined" &&
              bookings.length > 0 &&
              bookings.map(
                (booking, i) =>
                  booking.status === "rejected" && (
                    <ReservationCard key={i} booking={booking} />
                  )
              )}
          </div>
        </>
      )}
    </div>
  );
}

export default Reservations;
