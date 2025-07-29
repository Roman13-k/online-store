import { RefObject, useEffect } from "react";

export default function useCloseModal(ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const handleCLose = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleCLose);

    return () => {
      document.removeEventListener("click", handleCLose);
    };
  });
}
