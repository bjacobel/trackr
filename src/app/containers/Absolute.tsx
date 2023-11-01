'use client';

import { useState, ChangeEvent, useReducer, useRef, useMemo } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Input } from '@material-tailwind/react';

import Submit from '@/app/components/Submit';
import trackrAbsoluteReducer, { initialState } from '@/data/trackrAbsoluteReducer';

import { createTrackrDatapoints } from '@/data/opentsdb';
import { HAS_ABSOLUTE_CATS, TRACKR_ABSOLUTE_CATS, TRACKR_ABSOLUTE_METRIC } from '@/constants';

const isValid = (value: unknown) => {
  if (typeof value !== 'string') return false;

  try {
    return !Number.isNaN(parseFloat(value));
  } catch {
    return false;
  }
};

const Absolute = () => {
  const [state, dispatch] = useReducer(trackrAbsoluteReducer, initialState);
  const [resultMessage, setResultMessage] = useState('');
  const ref = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const updateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    if (isValid(value)) {
      dispatch({ type: 'set', category: name, value: parseFloat(value) });
    }
  };

  const submit = async () => {
    const tsdbResponse = await createTrackrDatapoints(state, TRACKR_ABSOLUTE_METRIC);
    dispatch({ type: 'clear' });
    setResultMessage(tsdbResponse.error || tsdbResponse.response || 'Tracked!');
  };

  return (
    <>
      <form className="w-full mt-3 font-medium text-black" ref={ref} action={submit}>
        {!HAS_ABSOLUTE_CATS && <p className="w-full mb-5 text-center">Add some stuff to track!</p>}
        {TRACKR_ABSOLUTE_CATS.map(cat => (
          <Input
            type="text"
            pattern="[0-9]*"
            label={cat}
            name={cat}
            key={cat}
            onChange={updateInput}
            variant="outlined"
            className="pr-20 bg-white"
            containerProps={{
              className: 'min-w-0 mb-5',
            }}
          />
        ))}
        <Submit className="mt-7" disabled={false} pending={pending} />
      </form>
      <p className="mt-6">{resultMessage}</p>
    </>
  );
};

export default Absolute;
