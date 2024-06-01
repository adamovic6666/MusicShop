"use client";

// State management
import { useCallback, useState } from "react";

// Other
import { ToastProps, ToastType } from "@/app/_types/Index";

export let createToast: (toast: ToastProps) => void;

const Toast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps>>([]);

  createToast = useCallback(
    (toast: ToastProps) => {
      const newToasts = [toast, ...toasts];
      setToasts(newToasts);

      setTimeout(() => {
        setToasts([]);
      }, 2500);
    },
    [toasts]
  );

  const ToastItem = useCallback(
    ({ message, type }: ToastProps) => (
      <div
        style={{
          background: type === ToastType.Error ? "#C32127" : "#219653",
          position: "fixed",
          bottom: "64px",
          left: "0",
        }}
      >
        {message}
      </div>
    ),
    []
  );

  return (
    <div className="toast">
      {toasts.map((toast, i) => (
        <ToastItem key={`TOAST_ITEM_${toast}_${i}`} {...toast} />
      ))}
    </div>
  );
};

export default Toast;
