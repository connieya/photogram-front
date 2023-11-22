import React, { useEffect, useState } from "react";
import "./Progressbar.css";

interface ProgressProsType {
  index: number;
  activeIndex: number;
  duration: number;
}

const Progressbar = ({ index, activeIndex, duration }: ProgressProsType) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, duration / 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration, activeIndex]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const isActive = index === activeIndex;

  return (
    <div className={`progress-bar-container ${isActive} ? active : "" `}>
      <div
        className={`${isActive ? "progress-bar" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progressbar;
