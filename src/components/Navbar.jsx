import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import image from '../../src/assets/img/WhatsApp_Image_2024-05-19_at_3.23.09_PM__1_-removebg-preview.png'
import {
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";

export function StickyNavbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  // const location = useLocation();
  const accessToken = localStorage.getItem('AccessToken'); // Get the access token from local storage

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 p-4">
      <Typography
        as="li"
        variant="h5"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/"
          exact
          className={({ isActive }) =>
            isActive ? "text-gray underline" : "text-gray-900"
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="h5"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/Plans"
          className={({ isActive }) =>
            isActive ? "text-gray underline" : "text-gray-900"
          }
        >
          Plans
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="h5"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            isActive ? "text-gray underline" : "text-gray-900"
          }
        >
          Contact us
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar
        position="sticky"
        className="top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-white"
      >
        <div className="flex items-center justify-around text-blue-gray-900">
         <div className="flex gap-5 items-center logo">
         <img src={image} className=" w-80 h-28" alt="" />
         </div>

          <div className="flex">
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-5">
             {/* Render login and signup buttons if there is no access token */}
             {!accessToken && (
               <>
                 <NavLink to="/Login">
                   <Button
                     variant="outlined"
                     size="lg"
                     className="hidden lg:inline-block"
                   >
                     <span>Log In</span>
                   </Button>
                 </NavLink>
                 <NavLink to="/Signup">
                   <Button variant="gradient" size="lg" className="hidden lg:inline-block">
                     <span>Sign up</span>
                   </Button>
                 </NavLink>
               </>
             )}

             {/* Render dashboard button if there is an access token */}
             {accessToken && (
               <NavLink to="/Login">
                 <Button
                   variant="gradient"
                   size="lg"
                   className="lg:inline-block flex"
                 >
                   <span className=" flex gap-2">Dashboard
                 <ArrowRightEndOnRectangleIcon className=" w-5 h-5" />
                   </span>
                 </Button>
               </NavLink>
             )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={toggleDrawer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </IconButton>
          </div>
        </div>
      </Navbar>
      <Drawer open={openDrawer} onClose={toggleDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between w-screen">
          <Typography variant="h5" color="blue-gray">
            TaskoWork
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={toggleDrawer}
            className="lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div>{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>Sign in</span>
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default StickyNavbar;