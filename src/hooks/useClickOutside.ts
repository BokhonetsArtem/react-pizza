import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    function onOutsideClick(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("click", onOutsideClick);

    return () => document.removeEventListener("click", onOutsideClick);
  }, [ref, callback]);
};

export default useClickOutside;
