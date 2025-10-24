import React from 'react';
import { Button } from "@/components/ui/button";

const SliderButtons = ({ slider, isRtl, prevIcon: PrevIcon, nextIcon: NextIcon, prevAriaLabel, nextAriaLabel }) => { // eslint-disable-line no-unused-vars
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        onClick={slider.handlePrev}
        disabled={!slider.hasPrev}
        aria-label={prevAriaLabel}
      >
        {isRtl ? <NextIcon className="h-5 w-5" /> : <PrevIcon className="h-5 w-5" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        onClick={slider.handleNext}
        disabled={!slider.hasNext}
        aria-label={nextAriaLabel}
      >
        {isRtl ? <PrevIcon className="h-5 w-5" /> : <NextIcon className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default React.memo(SliderButtons);
