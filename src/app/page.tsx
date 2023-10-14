'use client';

import { useEffect, useReducer, useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { TRACKR_CATS, HAS_CATS } from '@/constants';
import Submit from '@/app/Submit';
import Slider from '@/app/Slider';
import trackrReducer, { initialState } from '@/data/trackrReducer';
import { createTrackrDatapoints } from '@/data/opentsdb';
import PwaUpdater from './PwaUpdater';
import { PRODUCTION } from '@/constants';

export default function Home() {
  const [state, dispatch] = useReducer(trackrReducer, initialState);
  const [resultMessage, setResultMessage] = useState('');
  const { pending } = useFormStatus();

  const submit = async () => {
    const tsdbResult = await createTrackrDatapoints(state);
    dispatch({ type: 'clear' });
    setResultMessage(tsdbResult.error || tsdbResult.response || 'Tracked!');
  };

  return (
    <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between py-3 px-4">
        {PRODUCTION && <PwaUpdater />}
        <form className="w-full mt-3" action={submit}>
          {!HAS_CATS && <p className="w-full mb-5 text-center">Add some stuff to track!</p>}
          {TRACKR_CATS.map(category =>
            category.length ? (
              <Slider
                key={category}
                category={category}
                value={state[category]!}
                setFn={(value: number) => dispatch({ type: 'set', category: category, value })}
              />
            ) : null,
          )}
          <Submit disabled={!HAS_CATS} pending={pending} />
        </form>
        <p className="mt-6">{resultMessage}</p>
      </div>
    </main>
  );
}
