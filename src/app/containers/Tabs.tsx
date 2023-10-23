import { FC } from 'react';

import TabSwitcher from '@/app/components/TabSwitcher';
import Relative from '@/app/containers/Relative';
import Absolute from '@/app/containers/Absolute';

interface TabsProps {
  initial?: string;
}

const Tabs: FC<TabsProps> = ({ initial }) => (
  <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal">
    <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between py-3 px-4">
      <TabSwitcher initial={initial}>
        <Relative />
        <Absolute />
      </TabSwitcher>
    </div>
  </main>
);

export default Tabs;
