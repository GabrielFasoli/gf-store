export function Stars({ rating, reviewsCount }) {
  if (!rating) return null;

  const llenas = Math.round(rating);

  return (
    <div className="estrellas">
      <span className="estrellas-iconos">
        {"★".repeat(llenas)}
        {"☆".repeat(5 - llenas)}
      </span>
      <span className="estrellas-texto">
        {rating} {reviewsCount && `(${reviewsCount})`}
      </span>
    </div>
  );
}
