import { FC, ReactElement, useMemo } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { usePathname } from 'next/navigation';

interface TabSwitcherProps {
  initial?: string;
  children: ReactElement[];
}

export const TabSwitcher: FC<TabSwitcherProps> = ({ initial, children }) => {
  if (!Array.isArray(children) || !children.length) {
    throw new Error('TabSwitcher children must be a populated array');
  }

  // @ts-expect-error 2339
  const tabs = useMemo(() => children.map(child => ({ name: child.type.name, component: child })), [children]);

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
        {tabs.map(({ name, component }) => (
          <TabPanel key={name} value={name}>
            {component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default TabSwitcher;
