import { useState, useEffect } from "react";
import ReviewCard from "../components/Reviews/ReviewCard";
function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const resId = localStorage.getItem("resId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReviews();
  }, []);
  async function fetchReviews() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/restaurants/` +
          JSON.parse(resId) +
          "/reviews",
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
        setReviews(data.reviews);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  if (loading)
    return <div style={{ flex: 3, display: "flex" }}>Loading...</div>;

  return (
    <div className="Reviews">
      <h3>Reviews</h3>
      <div className="reviews-div">
        {typeof reviews !== "undefined" && reviews.length > 0 ? (
          reviews.map((review, i) => <ReviewCard key={i} review={review} />)
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              color: "white",
              alignItems: "center",
            }}
          >
            No reviews
          </div>
        )}
      </div>
    </div>
  );
}
export default Reviews;
