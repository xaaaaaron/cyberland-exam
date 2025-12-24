import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const ChevronLeft: React.FC<IconProps> = ({
  size = 16,
  color = '#000', // 👈 important fix
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
};
