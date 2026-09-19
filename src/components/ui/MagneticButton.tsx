"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  magneticPull?: number; // 0 to 1, default 0.35
  dataCursorText?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  href,
  type = "button",
  disabled = false,
  magneticPull = 0.35,
  dataCursorText,
  ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || disabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magneticPull;
    const distanceY = (e.clientY - centerY) * magneticPull;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    primary:
      "bg-[#FF4D1C] text-white hover:bg-[#ff3b05] border border-[#FF4D1C] shadow-[0_0_30px_-5px_rgba(255,77,28,0.4)] hover:shadow-[0_0_40px_0px_rgba(255,77,28,0.6)]",
    secondary:
      "bg-white text-[#0A0A0A] hover:bg-[#FAFAFA] border border-white/20 hover:border-white",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-[#FF4D1C] hover:text-[#FF4D1C] hover:bg-[#FF4D1C]/5",
    ghost:
      "bg-transparent text-white/80 hover:text-white hover:bg-white/5 border border-transparent",
    dark: "bg-[#0A0A0A] text-white border border-white/15 hover:border-[#FF4D1C] hover:bg-white/5",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-medium tracking-wide",
    md: "px-6 py-3 text-sm font-semibold tracking-wide",
    lg: "px-8 py-4 text-base font-semibold tracking-wide",
    xl: "px-10 py-5 text-lg font-bold tracking-tight",
  };

  const baseContent = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: prefersReducedMotion ? 0 : smoothX,
        y: prefersReducedMotion ? 0 : smoothY,
      }}
      className="inline-block"
      data-cursor-text={dataCursorText}
    >
      <div
        className={cn(
          "relative inline-flex items-center justify-center gap-2.5 rounded-full transition-colors duration-200 cursor-pointer select-none overflow-hidden group",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
      >
        {/* Subtle hover gleam */}
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="inline-block no-underline"
      >
        {baseContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-block bg-transparent p-0 border-0 outline-none"
    >
      {baseContent}
    </button>
  );
}
