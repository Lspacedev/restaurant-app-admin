import { IoStarSharp } from "react-icons/io5";
function ReviewCard({ review }) {
  let arr = [];
  function printStars(num) {
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
  }
  printStars(Number(review.rating));
  return (
    <div className="ReviewCard">
      <div className="rating">
        <p>
          {arr &&
            arr.map((el, i) => (
              <IoStarSharp
                key={i}
                className="star"
                color="orange"
                size="25px"
              />
            ))}
        </p>
      </div>
      <div className="review-text">
        <p>{review.text}</p>
        <p>{new Date(review.createdAt).toDateString()}</p>
      </div>
    </div>
  );
}
export default ReviewCard;
