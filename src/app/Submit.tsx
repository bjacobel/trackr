'use client';

import clsx from 'clsx';
import { Button, Spinner } from '@material-tailwind/react';

interface SubmitProps {
  pending: boolean;
  disabled: boolean;
  className: string;
}

const Submit: React.FC<SubmitProps> = ({ pending, disabled, className }) => {
  return (
    <Button className={clsx(['h-12', className])} disabled={pending || disabled} type="submit" fullWidth={true}>
      {pending ? <Spinner className="w-full" /> : <p>Track</p>}
    </Button>
  );
};

export default Submit;
