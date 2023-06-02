'use client';

import { Button } from '@material-tailwind/react';

interface SubmitProps {
  submitFn: () => void;
}

const Submit: React.FC<SubmitProps> = ({ submitFn }) => {
  return (
    <Button className="mt-5" fullWidth={true} onClick={submitFn}>
      Track
    </Button>
  );
};

export default Submit;
