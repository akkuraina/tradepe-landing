"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or if reduced motion is preferred
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "button, a, input, select, textarea, [role='button'], [data-cursor-interactive]"
      );
      const customCursorData = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      if (customCursorData) {
        setIsHovered(true);
        setHoverText(customCursorData);
        setIsPointer(true);
      } else if (interactiveEl) {
        setIsHovered(true);
        setHoverText("");
        setIsPointer(true);
      } else {
        setIsHovered(false);
        setHoverText("");
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Outer follow ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center justify-center rounded-full border border-[#FF4D1C]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverText ? 80 : isHovered ? 48 : 28,
          height: hoverText ? 80 : isHovered ? 48 : 28,
          backgroundColor: hoverText
            ? "rgba(255, 77, 28, 0.95)"
            : isHovered
            ? "rgba(255, 77, 28, 0.15)"
            : "rgba(10, 10, 10, 0.05)",
          borderColor: hoverText ? "transparent" : "#FF4D1C",
          backdropFilter: isHovered ? "blur(2px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {hoverText && (
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-white select-none">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden md:block rounded-full bg-[#FF4D1C]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverText ? 0 : isPointer ? 1.5 : 1,
          opacity: hoverText ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-1.5 w-1.5 rounded-full" />
      </motion.div>
    </>
  );
}
