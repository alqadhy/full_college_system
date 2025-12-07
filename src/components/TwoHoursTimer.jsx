// HOOKS
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function TwoHourTimer({ setNumOfAttemptions }) {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const TWO_HOURS = 2 * 60 * 60; // 7200 seconds

  const [timeLeft, setTimeLeft] = useState(() => {
    // If there is saved start time, use it
    const savedStart = getItem("timer_start");
    if (savedStart) {
      const secondsPassed = Math.floor((Date.now() - Number(savedStart)) / 1000);
      return Math.max(TWO_HOURS - secondsPassed, 0);
    }

    // First time => save new timer start
    setItem("timer_start", Date.now());
    return TWO_HOURS;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setNumOfAttemptions(3);
      setItem("num_of_attemptions", 3);
      removeItem("timer_start");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format time (HH:MM:SS)
  const format = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return <div className="timer">{format(timeLeft)}</div>;
}

export default TwoHourTimer;