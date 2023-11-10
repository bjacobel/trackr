import { Drawer, IconButton, Navbar, Switch, Typography } from '@material-tailwind/react';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

const NOTIFS_ENABLED = 'tracker_notifs_enabled';

const Nav = ({ children }: { children: ReactElement }) => {
  const [openNav, setOpenNav] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(NOTIFS_ENABLED) === String(true)) {
      setNotificationsEnabled(true);
    }
  }, []);

  const toggleNotifications = async (evt: ChangeEvent<HTMLInputElement>) => {
    const desiredState = evt.currentTarget.checked;
    let effectiveState = false;

    if (desiredState === true) {
      try {
        const result = await window.Notification.requestPermission();
        effectiveState = result === 'granted';
      } catch {
        effectiveState = false;
      }
    }

    window.localStorage.setItem(NOTIFS_ENABLED, String(effectiveState));
    setNotificationsEnabled(effectiveState);
  };

  return (
    <div className="h-screen bg-gray-100">
      <Navbar className="w-full rounded-none px-4 py-2">
        <div className="flex items-center justify-between lg:justify-center text-black">
          <Typography as="a" href="#" className="cursor-pointer py-1.5 font-bold">
            Trackr
          </Typography>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
      </Navbar>
      <Drawer placement="right" open={openNav} onClose={() => setOpenNav(false)}>
        <div className="p-5">
          <Switch
            color="blue"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
            label={
              <Typography color="blue-gray" className="font-medium">
                Enable Notifications
              </Typography>
            }
          />
        </div>
      </Drawer>
      <main className="font-sans leading-normal tracking-normal">{children}</main>
    </div>
  );
};

export default Nav;
