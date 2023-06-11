'use client';

import { Button, Spinner } from '@material-tailwind/react';

interface SubmitProps {
  pending: boolean;
  disabled: boolean;
}

const Submit: React.FC<SubmitProps> = ({ pending, disabled }) => {
  return (
    <Button className="h-12" disabled={pending || disabled} type="submit" fullWidth={true}>
      {pending ? <Spinner className="w-full" /> : <p>Track</p>}
    </Button>
  );
};

export default Submit;
