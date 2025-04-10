
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

interface Props {
  rating: number;
}

const Stars: React.FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalf key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
    } else {
      stars.push(<StarOutline key={i} size={16} className="text-gray-300" />);
    }
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
};

export default Stars;
