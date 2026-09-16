import { useEffect } from "react";

export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const seHizoClickAfuera =
        ref.current && !ref.current.contains(event.target);

      if (seHizoClickAfuera) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
