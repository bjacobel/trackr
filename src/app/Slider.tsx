import { Slider as MaterialSlider } from '@material-tailwind/react';
import clsx from 'clsx';

interface SliderProps {
  category: string;
  value: number;
  setFn: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ category, value, setFn }) => {
  return (
    <div className="w-full mb-8">
      <p className="mb-3">{category}</p>
      <MaterialSlider
        size="lg"
        max={100}
        step={10}
        value={String(value * 10)}
        onChange={event => setFn(parseInt(event.target.value) / 10)}
      />
    </div>
  );
};

export default Slider;
