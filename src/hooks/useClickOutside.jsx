import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    function onOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("click", onOutsideClick);

    return () => document.removeEventListener("click", onOutsideClick);
  }, []);
}
