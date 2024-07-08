import { Star } from "lucide-react";

type Props = {
  rate: number;
  size?: number;
};

const StarDisplay = ({ rate, size = 32 }: Props) => {
  const star = Math.floor(rate) || 5;
  return (
    <div className="flex gap-1">
      {[...Array(star)].map((_, i) => (
        <Star key={i} size={size} fill="#facc15" className="text-yellow-400" />
      ))}
      {[...Array(5 - star)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill="#d3cecf"
          className="text-neutral-content"
        />
      ))}
    </div>
  );
};

export default StarDisplay;
