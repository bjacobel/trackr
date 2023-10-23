'use client';

import { PWALifeCycle } from '@/app/containers/PwaUpdater';
import TabSwitcher from './components/TabSwitcher';
import Relative from './containers/Relative';
import Absolute from './containers/Absolute';

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between py-3 px-4">
        <PWALifeCycle />
        <TabSwitcher>
          <Relative />
          <Absolute />
        </TabSwitcher>
      </div>
    </main>
  );
}
