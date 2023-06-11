'use client';

import { useReducer } from 'react';

import { TRACKR_CATS, HAS_CATS } from '@/constants';
import Submit from '@/app/Submit';
import Slider from '@/app/Slider';
import trackrReducer, { initialState } from '@/data/trackrReducer';
import { createTrackrDatapoints } from '@/data/opentsdb';

export default function Home() {
  const [state, dispatch] = useReducer(trackrReducer, initialState);

  return (
    <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between py-3 px-4">
        <div className="w-full mt-3">
          {!HAS_CATS && <p className="w-full mb-auto text-center">Add some stuff to track!</p>}
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
          <Submit submitFn={() => createTrackrDatapoints(state)} />
        </div>
      </div>
    </main>
  );
}
