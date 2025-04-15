import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = ({ title, description, variant = "info" }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
}
