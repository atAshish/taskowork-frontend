/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Navbar,
  Typography,
  Input,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function DashNavbar({ userName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItemsRef = useRef([]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // GSAP animation for menu items
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power1.out",
        duration: 0.5
      });
    } else {
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        ease: "power1.in",
        duration: 0.5
      });
    }
  }, [isMenuOpen]);

  return (
    <Navbar color="transparent" className="shadow-sm bg-opacity-10 backdrop-blur-lg">
      <div className="flex items-center justify-between w-full px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center w-[60vw]">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />}
            className="w-full bg-white bg-opacity-20 rounded-full text-sm"
            placeholder="search bar"
          />
        </div>
        <div className="relative ml-4">
          <Menu open={isMenuOpen} handler={toggleMenu}>
            <MenuHandler>
              <Avatar
                variant="circular"
                size="lg"
                alt="User avatar"
                className="cursor-pointer"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWgefHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                onClick={toggleMenu}
              />
            </MenuHandler>
            <MenuList className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <div className="flex flex-col items-center p-4">
                <Avatar
                  variant="circular"
                  size="xl"
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWgefHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
                <Typography className="mt-2 text-sm font-semibold">{userName}</Typography>
              </div>
              {['Upload design work', 'Work preferences', 'Settings', 'Sign out'].map((text, index) => (
                <MenuItem
                  key={text}
                  ref={el => menuItemsRef.current[index] = el}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {text}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}
