import { useState } from "react";

export function ImageGallery({ images, name }) {
  const [showAll, setShowAll] = useState(false);

  const limit = 4;
  const hasMore = images.length > limit;

  return (
    <div className={`image-gallery ${hasMore && !showAll ? "collapsed" : ""}`}>
      {images.map((img, index) => (
        <img key={img} src={img} alt={`${name} - photo ${index + 1}`} />
      ))}

      {hasMore && !showAll && (
        <div className="show-more-wrapper">
          <button className="btn-show-more" onClick={() => setShowAll(true)}>
            Mostrar más{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
