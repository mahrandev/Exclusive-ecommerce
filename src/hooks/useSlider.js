
import { useState } from "react";

/**
 * A custom hook for managing slider/carousel logic.
 * @param {{totalItems: number, visibleItems: number}} config - The configuration for the slider.
 * @returns {{currentIndex: number, handleNext: () => void, handlePrev: () => void, hasNext: boolean, hasPrev: boolean}}
 */
export const useSlider = ({ totalItems, visibleItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalItems - visibleItems;

  const handleNext = () => {
    if (hasNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return { currentIndex, handleNext, handlePrev, hasNext, hasPrev };
};
