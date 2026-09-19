import React from "react";

export interface TradePeWordmarkProps {
  className?: string;
}

export function TradePeWordmark({ className = "" }: TradePeWordmarkProps) {
  return (
    <span className={`inline-block ${className}`.trim()}>
      <span className="text-[#FF4D1C] font-semibold not-italic">Trade</span>
      <span className="font-italic-accent text-[#FF4D1C] font-normal">Pe</span>
    </span>
  );
}

export default TradePeWordmark;
