import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [index, setIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    if (infinite) {
      setIndex(prev => (prev + step > maxIndex ? 0 : prev + step));
    } else {
      setIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setIndex(prev => (prev - step < 0 ? maxIndex : prev - step));
    } else {
      setIndex(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${index * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, i) => (
          <li key={i}>
            <img
              src={image}
              alt={`Image ${i + 1}`}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        data-cy="prev"
        className={cn('Carousel__button Carousel__button--prev', {
          disabled: !infinite && index <= 0,
        })}
        type="button"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        data-cy="next"
        className={cn('Carousel__button Carousel__button--next', {
          disabled: !infinite && index >= maxIndex,
        })}
        type="button"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
