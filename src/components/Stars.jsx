export function Stars({ rating, reviewsCount }) {
  if (!rating) return null;

  const filled = Math.round(rating);

  return (
    <div className="stars">
      <span className="stars-icons">
        {"★".repeat(filled)}
        {"☆".repeat(5 - filled)}
      </span>
      <span className="stars-text">
        {rating} {reviewsCount && `(${reviewsCount})`}
      </span>
    </div>
  );
}
