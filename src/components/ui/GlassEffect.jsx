import React from "react";
import { classNames } from "@/utils";

export const GlassEffect = ({ children, className = "", backgroundColor = "bg-white/[0.02]" }) => {
  return (
    <div
      className={classNames(
        backgroundColor,
        "rounded-lg backdrop-blur-sm transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};