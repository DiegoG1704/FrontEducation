"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Toast } from "primereact/toast";

export interface ToastHandle {
  success: (msg: string) => void;
  error: (msg: string) => void;
  warn: (msg: string) => void;
  info: (msg: string) => void;
}

const AppToast = forwardRef<ToastHandle>((_, ref) => {
  const toast = useRef<Toast>(null);

  useImperativeHandle(ref, () => ({
    success(msg: string) {
      toast.current?.show({
        severity: "success",
        summary: "Exito",
        detail: msg,
        life: 2500,
      });
    },
    error(msg: string) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: msg,
        life: 3000,
      });
    },
    warn(msg: string) {
      toast.current?.show({
        severity: "warn",
        summary: "Atención",
        detail: msg,
        life: 2500,
      });
    },
    info(msg: string) {
      toast.current?.show({
        severity: "info",
        summary: "Info",
        detail: msg,
        life: 2500,
      });
    },
  }));

  return <Toast ref={toast} />;
});

AppToast.displayName = "AppToast";

export default AppToast;