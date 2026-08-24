"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";

interface CountdownTimerProps {
  endDate: string;
  onComplete?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function CountdownTimer({
  endDate,
  onComplete,
  size = "md",
}: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endDate);
      setTime(remaining);
      if (remaining.total <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  const isUrgent = time.total < 3600000; // Less than 1 hour
  const isEnded = time.total <= 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  if (isEnded) {
    return (
      <span className={`font-mono font-bold text-red-500 ${sizeClasses[size]}`}>
        Ended
      </span>
    );
  }

  return (
    <div
      className={`font-mono font-bold ${
        isUrgent ? "text-red-500 animate-countdown-pulse" : "text-gray-900"
      } ${sizeClasses[size]}`}
    >
      {time.days > 0 && <span>{time.days}d </span>}
      <span>
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
