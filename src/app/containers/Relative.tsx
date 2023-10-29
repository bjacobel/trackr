import { useReducer, useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { TRACKR_RELATIVE_CATS, HAS_RELATIVE_CATS } from '@/constants';
import Submit from '@/app/components/Submit';
import Slider from '@/app/components/Slider';
import trackrRelativeReducer, { initialState } from '@/data/trackrRelativeReducer';
import { createTrackrDatapoints } from '@/data/opentsdb';

const Relative = () => {
  const [state, dispatch] = useReducer(trackrRelativeReducer, initialState);
  const [resultMessage, setResultMessage] = useState('');
  const { pending } = useFormStatus();

  const submit = async () => {
    const tsdbResponse = await createTrackrDatapoints(state);
    dispatch({ type: 'clear' });
    setResultMessage(tsdbResponse.error || tsdbResponse.response || 'Tracked!');
  };
  return (
    <>
      <form className="w-full mt-3 font-medium text-black" action={submit}>
        {!HAS_RELATIVE_CATS && <p className="w-full mb-5 text-center">Add some stuff to track!</p>}
        {TRACKR_RELATIVE_CATS.map(category =>
          category.length ? (
            <Slider
              key={category}
              category={category}
              value={state[category]!}
              setFn={(value: number) => dispatch({ type: 'set', category: category, value })}
            />
          ) : null,
        )}
        <Submit className="mt-7" disabled={!HAS_RELATIVE_CATS} pending={pending} />
      </form>
      <p className="mt-6">{resultMessage}</p>
    </>
  );
};

export default Relative;
