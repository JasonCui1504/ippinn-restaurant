"use client";

import { useState } from "react";
import OrderModal from "./OrderModal";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function OrderButton({ className, style, children = "Order Online" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className={className} style={style}>
        {children}
      </button>
      {open && <OrderModal onClose={() => setOpen(false)} />}
    </>
  );
}
