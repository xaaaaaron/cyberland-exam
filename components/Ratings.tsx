import { View } from 'react-native';
import { Star } from '../icons/EmptyStarRatings';
import { HalfStar } from '../icons/HalfStarRatings';
import { StarFilled } from '../icons/StarFilled';

type Props = {
  value: number; // rating value, e.g., 5
  maxValue?: number; // max value, e.g., 10
  stars?: number; // total stars to display, default 5
  size?: number; // size of each star
};

export const Ratings = ({
  value,
  maxValue = 10,
  stars = 5,
  size = 24,
}: Props) => {
  const ratio = value / maxValue;
  const totalStars = ratio * stars;
  const fullStars = Math.floor(totalStars);
  const hasHalfStar = totalStars - fullStars >= 0.5;

  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: stars }).map((_, i) => {
        if (i < fullStars) return <StarFilled key={i} size={size} />;
        if (i === fullStars && hasHalfStar)
          return <HalfStar key={i} size={size} />;
        return <Star key={i} size={size} />;
      })}
    </View>
  );
};
