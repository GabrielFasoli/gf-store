import { useState } from "react";
export const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="accordion-icon">
          {open ? (
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          ) : (
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
          )}
        </span>
      </button>

      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
};
