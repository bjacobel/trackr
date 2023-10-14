'use client';

import { useState, useEffect, useMemo } from 'react';
import { Workbox } from 'workbox-window';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

const PwaUpdater = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wb = useMemo(() => new Workbox('/sw.js'), []);
  const onConfirmActivate = () => wb.messageSkipWaiting();

  useEffect(() => {
    wb.addEventListener('controlling', () => {
      window.location.reload();
    });

    wb.addEventListener('waiting', () => setIsOpen(true));
    wb.register();
  }, [wb]);

  const handler = () => setIsOpen(!isOpen);

  return (
    <Dialog open={isOpen} handler={handler}>
      <DialogHeader>Update required</DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <div>A new version is available. Please click below to update.</div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button onClick={onConfirmActivate}>Reload and update</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PwaUpdater;
