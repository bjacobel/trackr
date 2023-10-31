import { FC, ReactElement, useMemo } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';

interface TabSwitcherProps {
  initial?: string;
  tabs: {
    name: string;
    render: () => ReactElement;
  }[];
}

const TabSwitcher: FC<TabSwitcherProps> = ({ initial, tabs }) => {
  if (!Array.isArray(tabs) || !tabs.length) {
    throw new Error('TabSwitcher tabs prop must be a populated array');
  }

  return (
    <Tabs value={initial || tabs[0].name} className="w-full mt-3">
      <TabsHeader
        className="bg-gray-300"
        indicatorProps={{
          className: '!bg-slate-300',
        }}
      >
        {tabs.map(({ name }) => (
          <Tab key={name} value={name}>
            <div className="flex items-center gap-2">{name}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tabs.map(({ name, render }) => (
          <TabPanel key={name} value={name}>
            {render()}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default TabSwitcher;
