import { useState, useEffect } from "react";
import Chart from "./Chart";

function Stats() {
  const [bookings, setBookings] = useState([]);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchRestaurant();
  }, []);
  async function fetchRestaurant() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/restaurant`,
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
        if (data.length > 0) {
          fetchBookings(data[0]._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchBookings(resId) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/restaurants/` +
          resId +
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
        if (data.bookings.length > 0) {
          let arr = [
            { name: "Pending", value: 0 },
            { name: "Approved", value: 0 },
            { name: "Rejected", value: 0 },
          ];
          data.bookings.map((booking) => {
            if (booking.status === "pending") {
              arr[0].value++;
            }
            if (booking.status === "approved") {
              arr[1].value++;
            }
            if (booking.status === "rejected") {
              arr[2].value++;
            }
          });
          setData(arr);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  if (loading)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  return (
    <div className="Stats">
      {data && data.length > 0 ? (
        <Chart data={data} />
      ) : (
        <div style={{ fontSize: "2rem", color: "white", margin: "25px 0px" }}>
          No data to display
        </div>
      )}
      {/* <div className="reservs">{data.length}</div> */}

      <div className="stats-info">
        <div className="pending">Pending</div>
        <div className="approved">Approved</div>
        <div className="rejected">Rejected</div>
      </div>
    </div>
  );
}

export default Stats;
