import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

function Rating(props: {
  rating: number;
  numReviews?: number;
  caption?: string;
}) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="text-warning">
      <span>
        {rating >= 1 ? <BsStarFill /> : rating >= 0.5 ? <BsStarHalf /> : <BsStar />}
      </span>
      <span>
        {rating >= 2 ? <BsStarFill /> : rating >= 1.5 ? <BsStarHalf /> : <BsStar />}
      </span>
      <span>
        {rating >= 3 ? <BsStarFill /> : rating >= 2.5 ? <BsStarHalf /> : <BsStar />}
      </span>
      <span>
        {rating >= 4 ? <BsStarFill /> : rating >= 3.5 ? <BsStarHalf /> : <BsStar />}
      </span>
      <span>
        {rating >= 5 ? <BsStarFill /> : rating >= 4.5 ? <BsStarHalf /> : <BsStar />}
      </span>
      {caption ? (
        <span className="text-muted">{caption}</span>
      ) : numReviews != 0 ? (
        <span className="text-muted">{" "}({numReviews + " Bewertungen"})</span>
      ) : (
        ""
      )}
    </div>
  );
}
export default Rating;
