'use client';

import { useReducer } from 'react';

import { TRACKR_CATS } from '@/constants';
import Submit from '@/app/Submit';
import Slider from '@/app/Slider';
import trackrReducer, { initialState } from '@/data/trackrReducer';
import { createTrackrDatapoints } from '@/data/opentsdb';

export default function Home() {
  const [state, dispatch] = useReducer(trackrReducer, initialState);

  return (
    <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal ">
      <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between mt-0 py-3 px-4">
        {TRACKR_CATS.map(category => (
          <Slider
            key={category}
            category={category}
            value={state[category]!}
            setFn={(value: number) => dispatch({ type: 'set', category: category, value })}
          />
        ))}
        <Submit submitFn={() => createTrackrDatapoints(state)} />
      </div>
    </main>
  );
}
