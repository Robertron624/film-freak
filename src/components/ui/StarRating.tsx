import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface StarRatingProps {
  rating: number; // Rating from 0 to 10
  maxRating?: number; // Maximum rating (stars), default is 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];
  const ratingOutOfFive = rating / 2; // Changed from (rating / 10) * maxRating

  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(ratingOutOfFive)) {
      stars.push(
        <StarIcon key={i} className='text-yellow-500' data-testid='star-full' />
      );
    } else if (
      i === Math.ceil(ratingOutOfFive) &&
      !Number.isInteger(ratingOutOfFive)
    ) {
      stars.push(
        <StarHalfIcon
          key={i}
          className='text-yellow-500'
          data-testid='star-half'
        />
      );
    } else {
      stars.push(
        <StarOutlineIcon
          key={i}
          className='text-yellow-500'
          data-testid='star-empty'
        />
      );
    }
  }

  return <div className='flex'>{stars}</div>;
};

export default StarRating;
