'use client';

import { Button, Spinner } from '@material-tailwind/react';

interface SubmitProps {
  pending: boolean;
}

const Submit: React.FC<SubmitProps> = ({ pending }) => {
  return (
    <Button className="h-12" disabled={pending} type="submit" fullWidth={true}>
      {pending ? <Spinner className="w-full" /> : <p>Track</p>}
    </Button>
  );
};

export default Submit;
