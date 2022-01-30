import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const toggleValue = value => {
    setIsOpen(prev => (typeof value === "boolean" ? value : !prev));
  };
  return { isOpen, toggleValue };
};

export default useToggle;
