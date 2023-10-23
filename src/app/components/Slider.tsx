import { Slider as MaterialSlider } from '@material-tailwind/react';
import { SyntheticEvent } from 'react';

interface SliderProps {
  category: string;
  value: number;
  setFn: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ category, value, setFn }) => {
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setFn(parseInt(event.currentTarget.value) / 10);
  };

  return (
    <div className="w-full mb-4">
      <p className="mb-2">{category}</p>
      <div className="flex items-center w-full">
        <MaterialSlider className="" size="lg" max={100} step={10} value={String(value * 10)} onChange={handleChange} />
        <p className="block w-8 text-right text-xl">{value}</p>
      </div>
    </div>
  );
};

export default Slider;
