import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    function onOutsideClick(event: MouseEvent) {
      const target = event.target as Node | null;
      if (ref && ref.current && !ref.current.contains(target)) {
        callback();
      }
    }

    document.addEventListener("click", onOutsideClick);

    return () => document.removeEventListener("click", onOutsideClick);
  }, [ref, callback]);
};

export default useClickOutside;
