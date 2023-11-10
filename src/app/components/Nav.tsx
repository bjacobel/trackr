import { IconButton, Navbar, Typography } from '@material-tailwind/react';
import { ReactElement, useState } from 'react';

import NavDrawer from '@/app/components/NavDrawer';

const Nav = ({ children }: { children: ReactElement }) => {
  const [openNav, setOpenNav] = useState(false);

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
      <NavDrawer openNav={openNav} setOpenNav={setOpenNav} />
      <main className="font-sans leading-normal tracking-normal">{children}</main>
    </div>
  );
};

export default Nav;
