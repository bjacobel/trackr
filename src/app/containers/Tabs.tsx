import { FC } from 'react';

import TabSwitcher from '@/app/components/TabSwitcher';
import Relative from '@/app/containers/Relative';
import Absolute from '@/app/containers/Absolute';
import Annotations from '@/app/containers/Annotations';

interface TabsProps {
  initial?: string;
}

const Tabs: FC<TabsProps> = ({ initial }) => (
  <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between py-3 px-4">
    <TabSwitcher
      initial={initial}
      tabs={[
        {
          name: 'Relative',
          render: () => <Relative />,
        },
        {
          name: 'Absolute',
          render: () => <Absolute />,
        },
        {
          name: 'Annotations',
          render: () => <Annotations />,
        },
      ]}
    />
  </div>
);

export default Tabs;
