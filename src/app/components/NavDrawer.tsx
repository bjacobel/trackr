import { Drawer, Switch, Typography } from '@material-tailwind/react';
import { ChangeEvent, useEffect, useState } from 'react';

interface NavDrawerProps {
  openNav: boolean;
  setOpenNav: (state: boolean) => void;
}

const NOTIFS_ENABLED = 'tracker_notifs_enabled';

const NavDrawer = ({ openNav, setOpenNav }: NavDrawerProps) => {
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
  );
};

export default NavDrawer;
